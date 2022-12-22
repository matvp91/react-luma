import React from "react";
import Layout from "@theme/Layout";
import Hero from "@site/src/components/Hero";
import IndexContent from "@site/src/pages/_index.mdx";

export default function Index(): JSX.Element {
  return (
    <Layout title="Welcome">
      <Hero />
      <main className="container padding-bottom--lg">
        <IndexContent />
      </main>
    </Layout>
  );
}
