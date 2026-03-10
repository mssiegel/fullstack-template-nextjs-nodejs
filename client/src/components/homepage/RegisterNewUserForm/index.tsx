"use client";

import React, { useState } from "react";

import { registerUser } from "@/api/users";
import styles from "./index.module.css";

export default function RegisterNewUserForm(): React.ReactElement {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) return;

    try {
      setIsSubmitting(true);
      setStatusMessage("");

      const response = await registerUser(trimmedEmail, password);
      setStatusMessage(response.message || "User registered successfully.");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
      setStatusMessage("Unable to register user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Register New User</h2>
      <div className={styles.fields}>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          aria-label="Email"
          required
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          aria-label="Password"
          required
          minLength={6}
        />
      </div>
      <button className={styles.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register user"}
      </button>
      {statusMessage ? <p className={styles.status}>{statusMessage}</p> : null}
    </form>
  );
}
