import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Solution from "./pages/Solution";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import MentionsLegales from "./pages/MentionsLegales";
import CGV from "./pages/CGV";
import Confidentialite from "./pages/Confidentialite";
import NotFound from "./pages/NotFound";

// Variant pages
import IndexVariant from "./pages/variants/IndexVariant";
import SolutionVariant from "./pages/variants/SolutionVariant";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Main routes */}
              <Route path="/" element={<Index />} />
              <Route path="/solution" element={<Solution />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/devis" element={<Quote />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/cgv" element={<CGV />} />
              <Route path="/confidentialite" element={<Confidentialite />} />
              
              {/* Variant routes - Accueil */}
              <Route path="/accueil-noir" element={<IndexVariant variant="noir" />} />
              <Route path="/accueil-bleu-clair" element={<IndexVariant variant="bleu-clair" />} />
              <Route path="/accueil-bleu-fonce" element={<IndexVariant variant="bleu-fonce" />} />
              <Route path="/accueil-gradient-clair-fonce" element={<IndexVariant variant="gradient-clair-fonce" />} />
              <Route path="/accueil-gradient-fonce-clair" element={<IndexVariant variant="gradient-fonce-clair" />} />
              
              {/* Variant routes - Solution */}
              <Route path="/solution-noir" element={<SolutionVariant variant="noir" />} />
              <Route path="/solution-bleu-clair" element={<SolutionVariant variant="bleu-clair" />} />
              <Route path="/solution-bleu-fonce" element={<SolutionVariant variant="bleu-fonce" />} />
              <Route path="/solution-gradient-clair-fonce" element={<SolutionVariant variant="gradient-clair-fonce" />} />
              <Route path="/solution-gradient-fonce-clair" element={<SolutionVariant variant="gradient-fonce-clair" />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
