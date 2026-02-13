import { useRoute } from "wouter";
import { getBlueprintBySlug } from "@/lib/blueprints";
import BlueprintDetail from "./BlueprintDetail";
import ArticleDetail from "./ArticleDetail";

export default function ResourceDetail() {
  const [match, params] = useRoute("/resources/:slug");

  if (!match || !params?.slug) return null;

  const blueprint = getBlueprintBySlug(params.slug);
  if (blueprint) return <BlueprintDetail />;
  return <ArticleDetail />;
}
