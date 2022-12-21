import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Playground from "@site/src/components/Playground";
import cx from "classnames";
import CodeBlock from "@theme/CodeBlock";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <div className={cx("container", styles.container)}>
          <p>
            Build your scene declaratively with re-usable, self-contained
            components and render them in a WebGL canvas. The renderer is mainly
            focused on TV's, set-top boxes and a variety of other low memory
            devices.
          </p>
          <h3>Installation</h3>
          <CodeBlock>npm install react-luma</CodeBlock>
          <p>
            React Luma's API is very familiar to anyone who has worked with
            React DOM. The main difference is that you can no longer rely on DOM
            elements such as a div or span, but you'd be building your UI
            composition with the built-in base components.
          </p>
          <h3>Playground</h3>
          <p>
            Feel free to make changes to the code below and the compiler will
            render an immediate result.
          </p>
          <Playground />
        </div>
      </main>
    </Layout>
  );
}
