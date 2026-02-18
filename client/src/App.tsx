import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import Comparison from "@/pages/Comparison";
import Categories from "@/pages/Categories";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Disclosure from "@/pages/Disclosure";
import ScrollToTop from "@/components/layout/ScrollToTop";

import Resources from "@/pages/Resources";
import ResourceDetail from "@/pages/ResourceDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import UltimateGeoSeoGuide from "@/pages/blog/ultimate-geo-seo-guide";
import GoRedirect from "@/pages/GoRedirect";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/go/:id" component={GoRedirect} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/compare" component={Comparison} />
        <Route path="/categories" component={Categories} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/ultimate-geo-seo-guide" component={UltimateGeoSeoGuide} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/resources" component={Resources} />
        <Route path="/resources/:slug" component={ResourceDetail} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/disclosure" component={Disclosure} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Growth Stack",
    url: "https://aigrowthstack.com",
    logo: "https://aigrowthstack.com/favicon.ico",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
