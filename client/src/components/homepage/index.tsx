import React from "react";

import styles from "./index.module.css";

export default function Homepage(): React.ReactElement {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to the homepage</h1>
      <p>This is the homepage component.</p>
    </div>
  );
}
