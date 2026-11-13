import CakeShowcase from "@/components/cake-showcase/CakeShowcase";

export default function Home() {
  return (
    <main>
      <section style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}><h1>Your existing home page content</h1></section>
      <CakeShowcase orderHref="/order" />
      <section style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}><h2>More of your home page</h2></section>
    </main>
  );
}
