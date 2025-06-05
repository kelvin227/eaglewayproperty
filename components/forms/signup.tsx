"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { SignUp } from "@/action/authaction"

const formData = [
  {
    name: "email",
    type: "email",
    placeHolder: "jondoe1982@gmail.com",
    label: "email",
  },
  {
    name: "username",
    type: "text",
    placeHolder: "johndoe1982",
    label: "Username",
  },
  {
    name: "password",
    type: "password",
    placeHolder: "*****",
    label: "Password",
  },
]

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().regex(/^\S+$/, "Spaces are not allowed"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must not exceed 32 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
})

export default function SignUpPage() {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const handleSubmitForm = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    const response = await SignUp(data.email, data.password, data.username as string)

    setIsSubmitting(false)
    if (response.success) {
      toast.success(response.message)

      router.replace("/redirect")
    } else {
      toast.error(response.message)
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })
  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => setIsPageLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div>
      {isPageLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <div className="flex flex-col items-center mb-6">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <path d="M12 2L3.09 8.26L4 9L12 4L20 9L20.91 8.26L12 2ZM12 6L6.5 9.5L12 13L17.5 9.5L12 6ZM6 10.5L12 14L18 10.5V16.5L12 20L6 16.5V10.5Z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-blue-800">Eagleway Property</h1>
              <p className="text-gray-500 text-sm mt-1">Sign up for your account</p>
            </div>
            <Form {...form}>
              <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmitForm)}>
                <div>
                  {formData.map((formField, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={formField.name as "password" | "username" | "email"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs block text-gray-700 mb-1">
                            {formField.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                              id={formField.name}
                              type={formField.type}
                              placeholder={formField.placeHolder}
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
            </Form>
            <p className="text-center text-gray-500 text-sm mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
