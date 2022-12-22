import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Logo from "./Logo";
import styles from "./Hero.module.css";

export default function Hero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="hero hero--primary margin-bottom--lg">
      <div className={clsx("container", styles.container)}>
        <Logo />
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started"
          >
            Getting Started
          </Link>
        </div>
      </div>
    </header>
  );
}
