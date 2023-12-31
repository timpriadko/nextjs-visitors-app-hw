"use client";

import Link from "next/link";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <div className={styles.links}>
        <Link
          href={`/`}
          className='text-white hover:text-slate-300 ease-in duration-100'
        >
          Home
        </Link>
        <Link
          href={`/board`}
          className='text-white hover:text-slate-300 ease-in duration-100'
        >
          Visitors board
        </Link>
        <Link
          href={`/events`}
          className='text-white hover:text-slate-300 ease-in duration-100'
        >
          Events
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
