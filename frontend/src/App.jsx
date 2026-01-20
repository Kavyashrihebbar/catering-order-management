import { useEffect, useState } from "react";
import "./App.css";

const MENU_PRICES = {
  "Veg Meals": 150,
  "Non-Veg Meals": 250,
  "Starters": 120,
  "Desserts": 100,
  "Soft Drinks": 50
};

function App() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    customer_name: "",
    event_date: "",
    guests_count: "",
    menu_items: [],
    contact_number: ""
  });

  // Fetch orders
  const fetchOrders = async () => {
    const res = await fetch("http://127.0.0.1:8000/orders");
    setOrders(await res.json());
  };

  const toggleMenuItem = (item) => {
    setForm(prev => ({
      ...prev,
      menu_items: prev.menu_items.includes(item)
        ? prev.menu_items.filter(i => i !== item)
        : [...prev.menu_items, item]
    }));
  };

  const calculateAmount = () => {
    const totalPerGuest = form.menu_items.reduce(
      (sum, item) => sum + MENU_PRICES[item],
      0
    );
    return totalPerGuest * Number(form.guests_count || 0);
  };

  // Add new order with validation
  const addOrder = async () => {
    if (
      !form.customer_name ||
      !form.event_date ||
      !form.guests_count ||
      !form.menu_items.length ||
      !form.contact_number
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(form.customer_name)) {
      alert("Customer name should contain only letters and spaces");
      return;
    }

    if (Number(form.guests_count) < 1) {
      alert("Guests count must be at least 1");
      return;
    }

    if (!/^\d{10}$/.test(form.contact_number)) {
      alert("Contact number must be exactly 10 digits");
      return;
    }

    const selectedDate = new Date(form.event_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Event date cannot be in the past");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: form.customer_name,
        event_date: form.event_date,
        guests_count: Number(form.guests_count),
        menu_items: form.menu_items.join(", "),
        amount: calculateAmount(),
        contact_number: form.contact_number,
        status: "Booked"
      })
    });

    if (!res.ok) {
      alert("Error adding order");
      return;
    }

    setForm({
      customer_name: "",
      event_date: "",
      guests_count: "",
      menu_items: [],
      contact_number: ""
    });

    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await fetch(`http://127.0.0.1:8000/orders/${id}`, { method: "DELETE" });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Sort orders by event date (earliest first)
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(a.event_date) - new Date(b.event_date)
  );

  return (
    <div className="container">
      <header>
        <h1>Catering Order Management</h1>
        <p className="subtitle">Good food, good mood</p>
      </header>

      <div className="card form-card">
        <h2>Add New Order</h2>

        <div className="form-grid">
          <input
            className="full-input"
            placeholder="Customer Name"
            value={form.customer_name}
            onChange={e => setForm({ ...form, customer_name: e.target.value })}
          />
          <input
            className="full-input"
            type="date"
            value={form.event_date}
            onChange={e => setForm({ ...form, event_date: e.target.value })}
          />
          <input
            className="full-input"
            type="number"
            placeholder="Number of Guests"
            value={form.guests_count}
            onChange={e => setForm({ ...form, guests_count: e.target.value })}
          />
          <input
            className="full-input"
            placeholder="Contact Number"
            value={form.contact_number}
            onChange={e => setForm({ ...form, contact_number: e.target.value })}
          />
        </div>

        <div className="menu-box">
          <h3>Select Menu Items</h3>
          <div className="menu-grid">
            {Object.keys(MENU_PRICES).map(item => (
              <label key={item} className="menu-item">
                <input
                  type="checkbox"
                  checked={form.menu_items.includes(item)}
                  onChange={() => toggleMenuItem(item)}
                />
                {item} (₹{MENU_PRICES[item]} per guest)
              </label>
            ))}
          </div>
        </div>

        <p className="amount">Total Amount: ₹{calculateAmount()}</p>
        <button className="btn add-btn" onClick={addOrder}>
          Add Order
        </button>
      </div>

      <div className="card orders-card">
        <h2>All Orders</h2>

        {sortedOrders.length === 0 && <p className="no-orders">No orders yet</p>}

        <div className="orders-list">
          {sortedOrders.map((o, index) => (
            <div className="order-item" key={o.id}>
              <div className="order-info">
                <h3>Order #{index + 1}</h3>
                <p><strong>Customer:</strong> {o.customer_name}</p>
                <p><strong>Event Date:</strong> {o.event_date}</p>
                <p><strong>Guests:</strong> {o.guests_count}</p>
                <p><strong>Menu:</strong> {o.menu_items}</p>
                <p className="price"><strong>Total:</strong> ₹{o.amount}</p>
                <p><strong>Status:</strong> {o.status}</p>
              </div>
              <button className="delete-btn" onClick={() => deleteOrder(o.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
