import { createFileRoute } from "@tanstack/react-router";
import Quiz from "@/components/Quiz";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Perca até 8kg em 21 dias | Quiz Calistenia" },
      { name: "description", content: "Descubra seu plano personalizado de calistenia de 10 minutos por dia." },
      { property: "og:title", content: "Perca até 8kg em 21 dias | Quiz Calistenia" },
      { property: "og:description", content: "Descubra seu plano personalizado de calistenia de 10 minutos por dia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Quiz,
});
