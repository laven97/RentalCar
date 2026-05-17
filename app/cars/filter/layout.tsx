import React from "react";

import css from "./layout.module.css";

interface FilterLayoutProps {
  children: React.ReactNode;
}

export default function FilterLayout({ children }: FilterLayoutProps) {
  return (
    <div className={css.container}>
      <main className={css.main}>{children}</main>
    </div>
  );
}
