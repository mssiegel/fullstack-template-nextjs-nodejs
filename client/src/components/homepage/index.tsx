"use client";

import React, { useEffect, useState } from "react";

import { getItems, type Item } from "@/api/items";
import AddItemForm from "./AddItemForm";
import styles from "./index.module.css";

export default function Homepage(): React.ReactElement {
  const [items, setItems] = useState<Item[]>([]);

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

  console.log("rendering");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the Homepage</h1>
      <p>Your list of items:</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ol>
      <AddItemForm
        onItemCreated={(createdItem) => {
          setItems((currentItems) => [...currentItems, createdItem]);
        }}
      />
    </div>
  );
}
