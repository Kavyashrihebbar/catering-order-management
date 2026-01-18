import { useEffect, useState } from "react";

function App() {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");

  const fetchOrders = async () => {
    const res = await fetch("http://127.0.0.1:8000/orders");
    setOrders(await res.json());
  };

  const addOrder = async () => {
    await fetch("http://127.0.0.1:8000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: customerName,
        event_type: "Wedding",
        event_date: "2026-01-20",
        guests_count: 200,
        menu_type: "Veg",
        contact_number: "9876543210",
        status: "Booked",
      }),
    });
    setCustomerName("");
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await fetch(`http://127.0.0.1:8000/orders/${id}`, { method: "DELETE" });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Catering Order Management</h2>

      <input
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <button onClick={addOrder}>Add Order</button>

      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            {o.customer_name}
            <button onClick={() => deleteOrder(o.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
