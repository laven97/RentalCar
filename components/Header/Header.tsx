import Link from "next/link";

import css from "./Header.module.css"

export default function Header() {
  return (
    <header className={css.header}>
      <h1 className={css.headerline}>
        Rental<span className={css.carSpan}>Car</span>
      </h1>

      <ul className={css.nav}>
        <li className={css.navList}>
          <Link href="/" className={css.link}>
            <p className={css.linkText}> Home</p>
          </Link>
        </li>
        <li className={css.navList}>
          <Link href="/cars/filter/all" className={css.link}>
            <p className={css.linkText}>Catalog</p>
          </Link>
        </li>
      </ul>
    </header>
  );
}
