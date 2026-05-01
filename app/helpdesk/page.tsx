"use client";
import { useState } from "react";
import ticketsData from "@/data/helpdesk.json";

type Ticket = {
  id: number;
  studentName: string;
  studentId: string;
  category: string;
  subject: string;
  description: string;
  status: string;
  submitted: string;
  resolved: string | null;
};

export default function Helpdesk() {
  const [tickets, setTickets] = useState<Ticket[]>(ticketsData);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    studentName: "",
    studentId: "",
    category: "IT Support",
    subject: "",
    description: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    const newTicket: Ticket = {
      id: tickets.length + 1,
      ...form,
      status: "Open",
      submitted: today,
      resolved: null,
    };
    setTickets([newTicket, ...tickets]);
    setSubmitted(true);
    setForm({ studentName: "", studentId: "", category: "IT Support", subject: "", description: "" });
  }

  const statusColour: Record<string, string> = {
    Open: "#8B0000",
    "In Progress": "#8B6914",
    Resolved: "#2E5B1E",
  };

  return (
    <div className="page">
      <h1>Helpdesk</h1>
      <p style={{ color: "#555", fontSize: "13px", marginBottom: "25px" }}>
        Submit a support request and track your tickets below.
      </p>

      {/* Submission form */}
      <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "18px", maxWidth: "520px", marginBottom: "30px" }}>
        <h2>Submit a new request</h2>

        {submitted && (
          <p role="alert" style={{ color: "#2E5B1E", fontFamily: "Courier New", fontSize: "12px", marginBottom: "12px" }}>
            ✓ Your ticket has been submitted successfully.
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: "12px" }}>
            <label htmlFor="studentName">Full name</label>
            <input
              id="studentName"
              name="studentName"
              type="text"
              value={form.studentName}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label htmlFor="studentId">Student ID</label>
            <input
              id="studentId"
              name="studentId"
              type="text"
              value={form.studentId}
              onChange={handleChange}
              required
              placeholder="e.g. C00123456"
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              <option>IT Support</option>
              <option>Accommodation</option>
              <option>Finance</option>
              <option>Academic</option>
              <option>Other</option>
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <button type="submit">Submit ticket</button>
        </form>
      </div>

      {/* Existing tickets */}
      <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "18px" }}>
        <h2>Recent tickets</h2>
        <table>
          <caption style={{ fontFamily: "Courier New", fontSize: "11px", color: "#555", textAlign: "left", paddingBottom: "6px" }}>
            List of helpdesk tickets submitted by students
          </caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Student</th>
              <th scope="col">Category</th>
              <th scope="col">Subject</th>
              <th scope="col">Status</th>
              <th scope="col">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>#{ticket.id}</td>
                <td>{ticket.studentName}</td>
                <td>{ticket.category}</td>
                <td>{ticket.subject}</td>
                <td style={{ color: statusColour[ticket.status] ?? "#333", fontWeight: "bold" }}>
                  {ticket.status}
                </td>
                <td>{ticket.submitted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
