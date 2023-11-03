"use client";

import Link from "next/link";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={`${styles.footer} container`}>
      <div className={styles.links}>
        <Link href={`/`}>Home</Link>
        <Link href={`/events`}>Events</Link>
        <Link href={`/board`}>Visitors board</Link>
      </div>
    </footer>
  );
};

export default Footer;
