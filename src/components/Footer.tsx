import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import logo from '@/assets/logo.svg';
import { BlurFade } from '@/components/ui/BlurFade';

const footerLinks = {
  services: [
    { name: 'Document Digitization', href: '/services/document-digitization' },
    { name: 'AI Automation', href: '/services/ai-automation' },
    { name: 'Custom Software', href: '/services/custom-software-development' },
    { name: 'Digital Transformation', href: '/services/digital-transformation' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Contact', href: '/contact' },
  ],
  serviceAreas: [
    { name: 'Chennai', href: '/chennai' },
    { name: 'Anna Nagar', href: '/chennai/anna-nagar' },
    { name: 'Ambattur', href: '/chennai/ambattur' },
    { name: 'Velachery', href: '/chennai/velachery' },
    { name: 'T. Nagar', href: '/chennai/t-nagar' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const handleHashNavigation = (hash: string) => {
    if (location.pathname === '/') {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/${hash}`;
    }
  };

  return (
    <footer className="relative border-t border-border/50 bg-background">
      <div className="container-custom px-6 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2">
            <BlurFade>
              <Link to="/" className="inline-flex items-center gap-3 mb-5 sm:mb-6">
                <img
                  src={logo}
                  alt="Astute Computer"
                  className="h-7 sm:h-8 w-auto dark:invert"
                />
                <span className="text-base sm:text-lg font-semibold text-foreground">
                  Astute Computer
                </span>
              </Link>
            </BlurFade>
            <BlurFade delay={0.1}>
              <p className="text-sm sm:text-base text-muted-foreground max-w-sm mb-5 sm:mb-6 leading-relaxed">
                Transforming businesses through innovative digital solutions. From branding to AI-powered systems, we build software that powers your success.
              </p>
            </BlurFade>
            
            {/* Social Icons */}
            <BlurFade delay={0.2}>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </BlurFade>
          </div>

          {/* Services */}
          <div>
            <BlurFade delay={0.1}>
              <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 sm:mb-4">
                Services
              </h4>
            </BlurFade>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link, index) => (
                <BlurFade key={link.name} delay={0.15 + index * 0.05}>
                  <li>
                    <Link
                      to={link.href}
                      className="group text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-1"
                    >
                      {link.name}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <BlurFade delay={0.1}>
              <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 sm:mb-4">
                Company
              </h4>
            </BlurFade>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link, index) => (
                <BlurFade key={link.name} delay={0.15 + index * 0.05}>
                  <li>
                    <Link
                      to={link.href}
                      className="group text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-1"
                    >
                      {link.name}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <BlurFade delay={0.1}>
              <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 sm:mb-4">
                Service Areas
              </h4>
            </BlurFade>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.serviceAreas.map((link, index) => (
                <BlurFade key={link.name} delay={0.15 + index * 0.05}>
                  <li>
                    <Link
                      to={link.href}
                      className="group text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-1"
                    >
                      {link.name}
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <BlurFade delay={0.3}>
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © {currentYear} Astute Computer. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <button className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </button>
              <button className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </BlurFade>
      </div>
    </footer>
  );
}
