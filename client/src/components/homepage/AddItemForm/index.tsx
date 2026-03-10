"use client";

import React, { useState } from "react";

import { addItem, type Item } from "@/api/items";
import styles from "./index.module.css";

type AddItemFormProps = {
  onItemCreated: (item: Item) => void;
};

export default function AddItemForm({
  onItemCreated,
}: AddItemFormProps): React.ReactElement {
  const [name, setName] = useState<string>("");

  const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    try {
      const createdItem = await addItem(trimmedName);
      onItemCreated(createdItem);
      setName("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
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
  );
}
