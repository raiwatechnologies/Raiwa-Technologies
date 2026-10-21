import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ErrorBoundary from '@/components/ErrorBoundary.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HomePage from '@/pages/HomePage.jsx';
import ServicesPage from '@/pages/ServicesPage.jsx';
import ServiceDetailPage from '@/pages/ServiceDetailPage.jsx';
import PortfolioPage from '@/pages/PortfolioPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage.jsx';
import TermsPage from '@/pages/TermsPage.jsx';
import WhatsAppButton from '@/components/WhatsAppButton.jsx';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="*" element={
                <div className="min-h-[70vh] flex items-center justify-center bg-background flex-col gap-6 text-center px-4">
                  <h1 className="text-5xl font-extrabold text-foreground font-heading">404</h1>
                  <p className="text-xl text-muted-foreground max-w-md">We couldn't find the page you were looking for.</p>
                  <a href="/" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg shadow-md hover:bg-primary/90 transition-all">
                    Return Home
                  </a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
        <WhatsAppButton variant="floating" />
        <Toaster position="bottom-right" richColors closeButton />
      </Router>
    </ErrorBoundary>
  );
}

export default App;