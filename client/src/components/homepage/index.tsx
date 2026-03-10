"use client";

import React, { useEffect, useState } from "react";

import { addItem, getItems, type Item } from "@/api/items";
import styles from "./index.module.css";

export default function Homepage(): React.ReactElement {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchItems = async (): Promise<void> => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    void fetchItems();
  }, []);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    try {
      const createdItem = await addItem(trimmedName);
      setItems((currentItems) => [...currentItems, createdItem]);
      setName("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Homepage</h1>
      <p>Your list of items:</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ol>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Add a new item"
          aria-label="Item name"
        />
        <button className={styles.button} type="submit">
          Add item
        </button>
      </form>
    </div>
  );
}
