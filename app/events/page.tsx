"use client";
import { useState } from "react";
import eventsData from "@/data/events.json";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  // Build category list dynamically from the data
  const categories = ["All categories", ...Array.from(new Set(eventsData.map((e) => e.category)))];

  // Filter events – show all if "All categories" is selected, otherwise filter by match
  const events = selectedCategory === "All categories"
    ? eventsData
    : eventsData.filter((e) => e.category === selectedCategory);

  return (
    <div className="page">
      <h1>Campus Events</h1>
      <p style={{ color: "#555", fontSize: "13px", marginBottom: "25px" }}>
        Upcoming events at Rocky College. Use the filter below to browse by category.
      </p>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="category-filter" style={{ marginRight: "8px" }}>
          Filter by category:
        </label>
        <select
          id="category-filter"
          style={{ width: "auto", padding: "4px 8px" }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {events.length === 0 && (
          <p style={{ fontSize: "13px", color: "#666" }}>No events found for this category.</p>
        )}
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              background: "#FFFFF0",
              border: "2px solid #8B4513",
              padding: "14px 18px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <p style={{ fontWeight: "bold", fontSize: "16px", fontFamily: "Georgia", marginBottom: "4px", color: "#8B0000" }}>
                  {event.title}
                </p>
                <p style={{ fontSize: "12px", color: "#555", marginBottom: "6px" }}>
                  {event.date} at {event.time} &mdash; {event.location}
                </p>
                <p style={{ fontSize: "13px", marginBottom: "8px" }}>{event.description}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "#556B2F",
                        color: "#FFD700",
                        fontSize: "10px",
                        padding: "2px 6px",
                        fontFamily: "Courier New",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "right", minWidth: "120px" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: "#FFFFF0",
                    border: "1px solid #8B4513",
                    color: "#333",
                    fontSize: "11px",
                    padding: "3px 8px",
                    fontFamily: "Courier New",
                    marginBottom: "6px",
                  }}
                >
                  {event.category}
                </span>
                <p style={{ fontSize: "11px", color: "#666" }}>
                  {event.attendees} / {event.capacity} attending
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
