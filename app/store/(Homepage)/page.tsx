import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Clock, Home, Shield, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { number: "500+", label: "Properties Sold" },
  { number: "15+", label: "Years Experience" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "$2.5B+", label: "Sales Volume" },
]
const services = [
  {
    icon: Home,
    title: "Residential Sales",
    description: "Expert guidance for buying and selling residential properties",
  },
  {
    icon: TrendingUp,
    title: "Investment Properties",
    description: "Strategic investment opportunities and portfolio management",
  },
  {
    icon: Users,
    title: "Property Management",
    description: "Comprehensive property management and rental services",
  },
  {
    icon: Award,
    title: "Luxury Estates",
    description: "Specialized service for high-end and luxury properties",
  },
]
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
<Image
          width={24}
          height={24}
          src="https://qsohd7f0aqhsgruh.public.blob.vercel-storage.com/eagleway-logo%28edited%29-51rEs4QpKTWxZeZQeROwgaMdIaBV1X.png"
          alt="Hero Background"
          className="h-8 w-10"
        />
                  <span className="text-xl font-bold text-blue-900">Eagleway Property</span>
        </div>
        <div className="space-x-6">
          <Link href="/" className="text-blue-900 hover:text-blue-700 font-medium">Home</Link>
          <Link href="/properties" className="text-blue-900 hover:text-blue-700 font-medium">Properties</Link>
          <Link href="/about" className="text-blue-900 hover:text-blue-700 font-medium">About Us</Link>
          <Link href="/contact" className="text-blue-900 hover:text-blue-700 font-medium">Contact</Link>
          <Link href="http://app.eaglewayproperty.com/login" className="text-blue-900 hover:text-blue-700 font-medium">
          Live chat
            {/* <button className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition">
              Live Chat
            </button> */}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">Find Your Dream Home</h1>
          <p className="text-lg text-gray-700 mb-6">
            Discover the best properties in Lagos and beyond. Buy, rent, or invest with confidence.
          </p>
          <Link href="/properties">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition">
              Browse Properties
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
          width={24}
          height={24}
          src="https://qsohd7f0aqhsgruh.public.blob.vercel-storage.com/1700222-yKkltISoa79lCbHhIMriqwSXbU5tmE.jpg"
          alt="Hero Background"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
                </div>
      </section>
        {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Soaring Above the Rest Since 2008</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Eagleway Property, we combine the precision of an eagle&apos;s vision with deep market knowledge to
                deliver exceptional real estate experiences. Our commitment to excellence has made us the trusted choice
                for discerning buyers and sellers throughout the Pacific Northwest.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-amber-500 mr-3" />
                  <span className="text-gray-700">Licensed & Insured Professionals</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-amber-500 mr-3" />
                  <span className="text-gray-700">Award-Winning Service Excellence</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-amber-500 mr-3" />
                  <span className="text-gray-700">24/7 Client Support & Communication</span>
                </div>
              </div>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Image
                height={500}
                width={600}
                src="https://qsohd7f0aqhsgruh.public.blob.vercel-storage.com/1126754-GAawWEPh9OvkRNlAzjyjj40JVUy9Ry.jpg"
                alt="Eagleway Property Team"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From first-time homebuyers to luxury estate investors, we provide comprehensive real estate services
              tailored to your unique needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Featured Listings */}
      <section className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8 mt-12 mb-8">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example property cards */}
          <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <Image
          width={24}
          height={24}
          src="https://qsohd7f0aqhsgruh.public.blob.vercel-storage.com/1126760-tCgi3XJ42GnByBngvpZGpf4YpdWZrY.jpg"
          alt="House 1"
          className="rounded mb-3 w-full h-40 object-cover"
        />
            <h3 className="font-bold text-lg">Modern Family Home</h3>
            <Link href="/properties/1" className="text-blue-700 hover:underline text-sm mt-2 inline-block">View Details</Link>
          </div>
          <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
         <Image
          width={24}
          height={24}
          src="https://qsohd7f0aqhsgruh.public.blob.vercel-storage.com/81314-b580-tMkOCs0JoxWqovzJrE89HPtyy7YFI1.jpg"
          alt="House 2"
          className="rounded mb-3 w-full h-40 object-cover"
        />           
         <h3 className="font-bold text-lg">Luxury Apartment</h3>
            <Link href="/properties/2" className="text-blue-700 hover:underline text-sm mt-2 inline-block">View Details</Link>
          </div>
          <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
         <Image
          width={24}
          height={24}
          src="https://qsohd7f0aqhsgruh.public.blob.vercel-storage.com/Property-5fc3a17712b856c419f533d30045b9d1-116820225-llFXlqypL34B34YMpVxsxZW9MX3GJl.jpg"
          alt="House 3"
          className="rounded mb-3 w-full h-40 object-cover"
        />
                    <h3 className="font-bold text-lg">Cozy Studio</h3>
            <Link href="/properties/3" className="text-blue-700 hover:underline text-sm mt-2 inline-block">View Details</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
        <Image
          width={24}
          height={24}
          src="https://qsohd7f0aqhsgruh.public.blob.vercel-storage.com/Property-5fc3a17712b856c419f533d30045b9d1-116820225-llFXlqypL34B34YMpVxsxZW9MX3GJl.jpg"
          alt="House 3"
          className="rounded-lg shadow-lg w-full"
        />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Why Choose Eagleway?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Trusted by thousands of happy clients</li>
            <li>Wide range of properties for every budget</li>
            <li>Expert agents to guide you every step</li>
            <li>Fast, secure, and transparent process</li>
          </ul>
          <Link href="/about">
            <button className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition">
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-700 py-12 mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-blue-100 mb-6">
            Contact us today or chat live with our support team for any inquiries.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/contact">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-100 transition">
                Contact Us
              </button>
            </Link>
            <Link href="http://app.eaglewayproperty.com/login">
              <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition">
                Live Chat Support
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white py-6 mt-12 shadow-inner text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Eagleway Property. All rights reserved.
      </footer>
    </div>
  );
}