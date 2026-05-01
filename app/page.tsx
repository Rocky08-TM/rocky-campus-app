export default function Home() {
  return (
    <div className="page">
      <h1>Rocky Campus App</h1>
      <p style={{ color: "#555", fontSize: "10px", marginBottom: "25px" }}>
        Rocky Campus App - Student Portal v1.0
      </p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>

        <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "14px", width: "160px" }}>
          <p style={{ fontSize: "28px", marginBottom: "2px" }}>📅</p>
          <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "2px", fontFamily: "Georgia" }}>Events</p>
          <p style={{ fontSize: "10px", color: "#666", marginBottom: "10px" }}>View campus events</p>
          <a href="/events" style={{ background: "#556B2F", color: "#FFD700", padding: "4px 8px", textDecoration: "none", fontSize: "10px", fontFamily: "Courier New", border: "1px solid #8B4513" }}>
            Click here
          </a>
        </div>

        <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "14px", width: "160px" }}>
          <p style={{ fontSize: "28px", marginBottom: "2px" }}>❓</p>
          <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "2px", fontFamily: "Georgia" }}>Helpdesk</p>
          <p style={{ fontSize: "10px", color: "#666", marginBottom: "10px" }}>Submit support requests</p>
          <a href="/helpdesk" style={{ background: "#556B2F", color: "#FFD700", padding: "4px 8px", textDecoration: "none", fontSize: "10px", fontFamily: "Courier New", border: "1px solid #8B4513" }}>
            Click here
          </a>
        </div>

        <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "14px", width: "160px" }}>
          <p style={{ fontSize: "28px", marginBottom: "2px" }}>🍽️</p>
          <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "2px", fontFamily: "Georgia" }}>Canteen</p>
          <p style={{ fontSize: "10px", color: "#666", marginBottom: "10px" }}>View food menu</p>
          <a href="/canteen" style={{ background: "#556B2F", color: "#FFD700", padding: "4px 8px", textDecoration: "none", fontSize: "10px", fontFamily: "Courier New", border: "1px solid #8B4513" }}>
            Click here
          </a>
        </div>

        <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "14px", width: "160px" }}>
          <p style={{ fontSize: "28px", marginBottom: "2px" }}>⚙️</p>
          <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "2px", fontFamily: "Georgia" }}>Settings</p>
          <p style={{ fontSize: "10px", color: "#666", marginBottom: "10px" }}>Update preferences</p>
          <a href="/settings" style={{ background: "#556B2F", color: "#FFD700", padding: "4px 8px", textDecoration: "none", fontSize: "10px", fontFamily: "Courier New", border: "1px solid #8B4513" }}>
            Click here
          </a>
        </div>

      </div>

      <br /><br />

      <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "20px", width: "400px" }}>
        <h2>Announcements</h2>
        <br />
        <p style={{ fontSize: "12px", borderBottom: "1px solid #ccc", paddingBottom: "8px" }}>Library hours extended during exam period.</p>
        <br />
        <p style={{ fontSize: "12px", borderBottom: "1px solid #ccc", paddingBottom: "8px" }}>Car park near Block C is currently closed.</p>
        <br />
        <p style={{ fontSize: "12px" }}>Free coffee available at SU cafe Monday to Friday.</p>
      </div>

    </div>
  );
}
