"use client";
import React from "react";

export default function AdminMainPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      {/* <header className="bg-blue-800 text-white px-8 py-6 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <span className="material-icons text-3xl">dashboard</span>
          <span className="text-2xl font-bold tracking-wide">Admin Dashboard</span>
        </div>
        <span className="text-blue-200 text-sm">Eagleway Property</span>
      </header> */}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-4">
        {/* Dashboard Widgets */}
        <section className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {/* Stats */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="material-icons text-blue-700 text-4xl mb-2">people</span>
            <h3 className="text-xl font-bold text-blue-800">Registered Users</h3>
            <p className="text-3xl font-extrabold text-gray-800 mt-2">542</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="material-icons text-blue-700 text-4xl mb-2">message</span>
            <h3 className="text-xl font-bold text-blue-800">New Messages</h3>
            <p className="text-3xl font-extrabold text-gray-800 mt-2">7</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 text-center text-gray-400 text-xs border-t">
        &copy; {new Date().getFullYear()} Eagleway Property Admin Panel
      </footer>
    </div>
  );
}