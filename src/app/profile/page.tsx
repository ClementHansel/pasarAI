"use client";

import React, { useState } from "react";

export default function UserProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "081234567890",
    address: "Jl. Mawar No. 123, Jakarta",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    console.log("Profile updated:", form);
    // Connect to API for saving changes
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-medium mb-1">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block font-medium mb-1">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={form.address}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex justify-between mt-6">
          {editing ? (
            <>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-red-600 hover:underline"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
