import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.svg';

const navLinks = [
  {
    name: 'Services',
    href: '/#services',
    submenu: [
      { name: 'Document Digitization', href: '/services/document-digitization' },
      { name: 'AI Automation', href: '/services/ai-automation' },
      { name: 'Custom Software', href: '/services/custom-software-development' },
      { name: 'Digital Transformation', href: '/services/digital-transformation' },
    ],
  },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 50;
        // Only update state if it actually changed
        if (scrolled !== isScrolled) {
          setIsScrolled(scrolled);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = href;
      }
    }
  };

  const isActiveLink = (href: string) => {
    if (href.startsWith('/#')) return false;
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]"
      >
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between py-4 sm:py-5 md:py-6 lg:py-7 xl:py-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img
                src={logo}
                alt="Astute Computer"
                className="h-7 sm:h-8 w-auto invert"
              />
              <span className="hidden sm:block text-base sm:text-lg font-semibold tracking-tight text-white">
                Astute Computer
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.submenu && setOpenSubmenu(link.name)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  {link.submenu ? (
                    <>
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className={cn(
                          "flex items-center gap-1.5 text-[15px] font-normal tracking-wide transition-colors py-1",
                          isActiveLink(link.href) ? "text-white" : "text-white/80 hover:text-white"
                        )}
                      >
                        {link.name}
                        <ChevronDown className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          openSubmenu === link.name && "rotate-180"
                        )} />
                      </button>
                      <AnimatePresence>
                        {openSubmenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 pt-3"
                          >
                            <div className="bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-lg py-2 min-w-[200px]">
                              {link.submenu.map((sublink) => (
                                <Link
                                  key={sublink.name}
                                  to={sublink.href}
                                  className={cn(
                                    "flex items-center justify-between px-4 py-2.5 text-sm transition-colors group",
                                    isActiveLink(sublink.href)
                                      ? "text-primary bg-primary/5"
                                      : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                                  )}
                                >
                                  {sublink.name}
                                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : link.href.startsWith('/#') ? (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-[15px] font-normal tracking-wide text-white/80 hover:text-white transition-colors py-1"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={cn(
                        "text-[15px] font-normal tracking-wide transition-colors py-1",
                        isActiveLink(link.href) ? "text-white" : "text-white/80 hover:text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#1a1a1a] border border-white/10 text-white/90 text-[15px] font-normal tracking-wide rounded-full hover:bg-[#252525] transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                Contact us
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              <button
                className="p-2 text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[#0a0a0a]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="relative flex flex-col h-full px-6 pt-24 pb-8"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
            >
              {/* Navigation Links */}
              <div className="flex-1 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 },
                    }}
                    className="border-b border-white/10"
                  >
                    {link.submenu ? (
                      <>
                        <button
                          onClick={() => setOpenSubmenu(openSubmenu === link.name ? null : link.name)}
                          className="w-full flex items-center justify-between py-4 text-xl font-medium text-white"
                        >
                          {link.name}
                          <ChevronDown className={cn("h-5 w-5 text-white/60 transition-transform duration-300", openSubmenu === link.name && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {openSubmenu === link.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-4 pl-4 flex flex-col gap-3">
                                {link.submenu.map((sublink) => (
                                  <Link
                                    key={sublink.name}
                                    to={sublink.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-base text-white/70 hover:text-primary transition-colors"
                                  >
                                    <ArrowRight className="h-4 w-4 text-primary" />
                                    {sublink.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : link.href.startsWith('/#') ? (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="w-full text-left py-4 text-xl font-medium text-white hover:text-primary transition-colors"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-4 text-xl font-medium text-white hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom Section */}
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
                className="mt-auto pt-6 border-t border-white/10"
              >
                {/* Contact Info */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Get in touch</p>
                  <a href="mailto:hello@astutecomputer.com" className="block text-white/80 hover:text-primary transition-colors mb-2">
                    hello@astutecomputer.com
                  </a>
                  <a href="tel:+919876543210" className="block text-white/80 hover:text-primary transition-colors">
                    +91 98765 43210
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 mb-6">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                </div>

                {/* CTA Button */}
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground text-base font-medium rounded-full"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
