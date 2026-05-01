export default function Canteen() {
  return (
    <div className="page">
      <h1>Rocky Campus Canteen</h1>
      <p style={{ fontSize: "11px", color: "#666", marginBottom: "20px" }}>
        Today's available menu items.
      </p>

      <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "16px", marginBottom: "16px" }}>
        <h2>Today's Menu</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Dietary</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Grilled Salmon</td><td>Main</td><td>€12.50</td><td>Gluten Free</td></tr>
            <tr style={{ background: "#f5f5dc" }}><td>Margherita Pizza</td><td>Main</td><td>€8.25</td><td>Vegetarian</td></tr>
            <tr><td>Coffee</td><td>Drink</td><td>€2.50</td><td>Vegetarian</td></tr>
            <tr style={{ background: "#f5f5dc" }}><td>Chicken Caesar Salad</td><td>Main</td><td>€9.50</td><td>Contains Meat</td></tr>
          </tbody>
        </table>
      </div>

      <div style={{ background: "#FFFFF0", border: "2px solid #8B4513", padding: "16px" }}>
        <h2>Opening Hours</h2>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Monday - Friday</td><td>08:00 - 17:00</td><td>Open</td></tr>
            <tr style={{ background: "#f5f5dc" }}><td>Saturday</td><td>N/A</td><td>Closed</td></tr>
            <tr><td>Sunday</td><td>N/A</td><td>Closed</td></tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
