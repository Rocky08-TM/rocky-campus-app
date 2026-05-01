"use client";
import { useState } from "react";
import itemsData from "@/data/lostandfound.json";

export default function LostAndFound() {
  const [filter, setFilter] = useState<"All" | "Unclaimed" | "Claimed">("All");

  const filtered = filter === "All" ? itemsData : itemsData.filter((i) => i.status === filter);

  return (
    <div className="page">
      <h1>Lost &amp; Found</h1>
      <p style={{ color: "#555", fontSize: "13px", marginBottom: "8px" }}>
        Items handed in to campus security. To claim an item, bring your student ID to the security desk and quote the reference number.
      </p>
      <p style={{ fontSize: "12px", color: "#8B0000", marginBottom: "20px" }}>
        Security desk: Block A, Ground Floor &mdash; Open Mon–Fri 08:00–18:00
      </p>

      {/* Filter controls */}
      <div role="group" aria-label="Filter items by status" style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {(["All", "Unclaimed", "Claimed"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            style={{
              background: filter === option ? "#8B4513" : "#556B2F",
              color: "#FFD700",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Items table */}
      <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "16px" }}>
        <table>
          <caption style={{ fontFamily: "Courier New", fontSize: "11px", color: "#555", textAlign: "left", paddingBottom: "6px" }}>
            Items currently held at the Rocky College security desk
          </caption>
          <thead>
            <tr>
              <th scope="col">Ref</th>
              <th scope="col">Item</th>
              <th scope="col">Description</th>
              <th scope="col">Found at</th>
              <th scope="col">Date found</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#666" }}>
                  No items found for this filter.
                </td>
              </tr>
            )}
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.contactRef}</td>
                <td style={{ fontWeight: "bold" }}>{item.item}</td>
                <td>{item.description}</td>
                <td>{item.foundLocation}</td>
                <td>{item.dateFound}</td>
                <td
                  style={{
                    color: item.status === "Unclaimed" ? "#8B0000" : "#2E5B1E",
                    fontWeight: "bold",
                  }}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "14px", marginTop: "16px", maxWidth: "420px" }}>
        <h2>Found something on campus?</h2>
        <p style={{ fontSize: "13px", marginTop: "8px" }}>
          Please hand all found items to the security desk in Block A with a note of where you found it. Do not post about found items on social media.
        </p>
      </div>
    </div>
  );
}
