import Link from "next/link";
import css from "./HeroBaner.module.css";

export default function HeroBaner() {
  return (
    <section className={css.heroSection}>
      <div className={css.heroContainer}>
        <div className={css.heroContainerDescription}>
          <h1 className={css.headerline}>Find your perfect rental car</h1>
          <p className={css.text}>
            Reliable and budget-friendly rentals for any journey
          </p>
        </div>
        <Link href="/cars/filter/all" className={`${css.link} ${css.button}`}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
