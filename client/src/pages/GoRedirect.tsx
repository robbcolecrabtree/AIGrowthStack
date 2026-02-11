import { useEffect } from "react";
import { useRoute } from "wouter";
import { mockSoftware } from "@/lib/mockData";
import NotFound from "./not-found";

export default function GoRedirect() {
  const [match, params] = useRoute("/go/:id");

  const tool = match && params?.id ? mockSoftware.find((s) => s.id === params.id) : null;
  const redirectUrl = tool && (tool.affiliateLink?.trim() || tool.websiteUrl);

  useEffect(() => {
    if (!redirectUrl) return;
    window.location.replace(redirectUrl);
  }, [redirectUrl]);

  if (!match) return <NotFound />;
  if (!tool) return <NotFound />;
  if (!redirectUrl) return <NotFound />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <p className="text-muted-foreground">Redirecting to {tool.name}…</p>
      <p className="text-sm mt-2">
        <a href={redirectUrl} rel="noopener noreferrer" className="text-primary underline">
          Click here if you are not redirected
        </a>
      </p>
    </div>
  );
}
