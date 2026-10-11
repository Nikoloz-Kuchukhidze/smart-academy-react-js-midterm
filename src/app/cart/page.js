"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./cart.module.css";

const initialCart = [
  {
    id: 1,
    name: "Hoodie With Hood",
    color: "Yellow",
    colorCode: "#f6d854",
    price: 29.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Fleece Jacket",
    color: "Green",
    colorCode: "#4ebf5c",
    price: 51.98,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Water Bottle 0.5",
    color: "Pink",
    colorCode: "#fa9ac2",
    price: 7.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80",
  },
];

const formatCurrency = (value) => `$${value.toFixed(2)}`;

export default function CartPage() {
  const [items, setItems] = useState(initialCart);

  useEffect(() => {
    document.title = "Shopping Cart";
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const updateQuantity = (id, delta) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) return item;
        return { ...item, quantity: Math.min(10, Math.max(1, item.quantity + delta)) };
      })
    );
  };

  const removeItem = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Shopping Cart</h1>

      <div className={styles.tableHeader}>
        <span>Product</span>
        <span>Quantity</span>
        <span>Price</span>
      </div>

      {items.map((item) => (
        <div key={item.id} className={styles.row}>
          <div className={styles.productCell}>
            <div className={styles.imageWrap}>
              <img src={item.image} alt={item.name} className={styles.image} />
            </div>
            <div className={styles.productInfo}>
              <h2>{item.name}</h2>
              <div className={styles.colorLine}>
                <span className={styles.swatch} style={{ background: item.colorCode }} />
                <span>{item.color}</span>
              </div>
            </div>
          </div>

          <div className={styles.quantityCell}>
            <button
              type="button"
              className={styles.qtyButton}
              onClick={() => updateQuantity(item.id, -1)}
              aria-label={`Decrease quantity for ${item.name}`}
            >
              −
            </button>
            <span className={styles.quantityValue}>{item.quantity}</span>
            <button
              type="button"
              className={styles.qtyButton}
              onClick={() => updateQuantity(item.id, 1)}
              aria-label={`Increase quantity for ${item.name}`}
            >
              +
            </button>
          </div>

          <div className={styles.priceCell}>
            <span>{formatCurrency(item.price * item.quantity)}</span>
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name}`}
            >
              🗑
            </button>
          </div>
        </div>
      ))}

      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <strong>{formatCurrency(subtotal)}</strong>
      </div>
    </main>
  );
}
