import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/lib/theme";

// Pages
import Index from "./pages/Index";
import Solution from "./pages/Solution";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import MentionsLegales from "./pages/MentionsLegales";
import CGV from "./pages/CGV";
import Confidentialite from "./pages/Confidentialite";
import NotFound from "./pages/NotFound";

// Preview pages with theme
import PreviewPage from "./pages/preview/PreviewPage";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="noir">
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
                
                {/* Preview routes - for theme comparison */}
                <Route path="/preview/noir" element={<PreviewPage theme="noir" />} />
                <Route path="/preview/bleu-clair" element={<PreviewPage theme="bleu-clair" />} />
                <Route path="/preview/bleu-fonce" element={<PreviewPage theme="bleu-fonce" />} />
                <Route path="/preview/degrade" element={<PreviewPage theme="degrade" />} />
                
                {/* Legacy variant routes - redirect to preview */}
                <Route path="/accueil-noir" element={<PreviewPage theme="noir" page="accueil" />} />
                <Route path="/accueil-bleu-clair" element={<PreviewPage theme="bleu-clair" page="accueil" />} />
                <Route path="/accueil-bleu-fonce" element={<PreviewPage theme="bleu-fonce" page="accueil" />} />
                <Route path="/accueil-degrade" element={<PreviewPage theme="degrade" page="accueil" />} />
                
                <Route path="/solution-noir" element={<PreviewPage theme="noir" page="solution" />} />
                <Route path="/solution-bleu-clair" element={<PreviewPage theme="bleu-clair" page="solution" />} />
                <Route path="/solution-bleu-fonce" element={<PreviewPage theme="bleu-fonce" page="solution" />} />
                <Route path="/solution-degrade" element={<PreviewPage theme="degrade" page="solution" />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
