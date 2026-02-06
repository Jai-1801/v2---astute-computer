import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { ScrollToTop } from "./components/ScrollToTop";
import { SmoothScroll } from "./components/SmoothScroll";
import { PerformanceProvider } from "./hooks/usePerformance";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudy from "./pages/CaseStudy";
import CaseStudiesHub from "./pages/CaseStudiesHub";
import ServicePage from "./pages/ServicePage";
import IndustryPage from "./pages/IndustryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CaseStudies from "./pages/admin/CaseStudies";
import CaseStudyEdit from "./pages/admin/CaseStudyEdit";
import ContactMessages from "./pages/admin/ContactMessages";
import NewsletterSubscribers from "./pages/admin/NewsletterSubscribers";
import ChennaiPage from "./pages/ChennaiPage";
import NeighborhoodPage from "./pages/NeighborhoodPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <QueryClientProvider client={queryClient}>
        <PerformanceProvider>
          <TooltipProvider>
            <SmoothScroll>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/case-studies" element={<CaseStudiesHub />} />
                  <Route path="/case-studies/:slug" element={<CaseStudy />} />
                  <Route path="/services/:slug" element={<ServicePage />} />
                  <Route path="/industries/:slug" element={<IndustryPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Location Pages - Local SEO */}
                  <Route path="/chennai" element={<ChennaiPage />} />
                  <Route path="/chennai/:neighborhood" element={<NeighborhoodPage />} />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/messages" element={<ContactMessages />} />
                  <Route path="/admin/subscribers" element={<NewsletterSubscribers />} />
                  <Route path="/admin/case-studies" element={<CaseStudies />} />
                  <Route path="/admin/case-studies/:id" element={<CaseStudyEdit />} />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SmoothScroll>
          </TooltipProvider>
        </PerformanceProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
