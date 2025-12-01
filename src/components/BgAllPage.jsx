import React from 'react';
import styles from '../styles/BgAllPage.module.css';

export default function BgAllPage({ title, parent }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroText}>
          <h2>{title}</h2>
          <p>
            <span>{parent}</span> &gt; {title}
          </p>
        </div>
      </div>
    </section>
  );
}
