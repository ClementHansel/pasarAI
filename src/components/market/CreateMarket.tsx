// src/components/CreateMarket.tsx
import { useState } from "react";

export default function CreateMarket() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [revenue, setRevenue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/markets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, location, revenue: parseInt(revenue) }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Market created successfully");
    } else {
      alert(data.message || "Error creating market");
    }
  };

  return (
    <div>
      <h2>Create New Market</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Market Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Revenue"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          required
        />
        <button type="submit">Create Market</button>
      </form>
    </div>
  );
}
