import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Roger Vandawalker",
    description: "UI Engineer living in Northern Virginia",
  };
};

export default function Index() {
  return (
    <section className="container mx-auto px-8 md:px-0 mt-8">
      <h2 className="text-2xl font-light text-center">
        I'm <strong className="font-medium">Roger V</strong>. I live in Northern
        Virginia and build software for the web.
      </h2>
    </section>
  );
}
