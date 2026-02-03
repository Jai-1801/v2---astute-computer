import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50"
      >
        <div className="container-custom px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img
                src={logo}
                alt="Astute Computer"
                className="h-7 sm:h-8 w-auto dark:invert"
              />
              <span className="hidden sm:block text-base sm:text-lg font-semibold tracking-tight text-foreground">
                Astute Computer
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 lg:gap-8">
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
                          "flex items-center gap-1 text-sm font-medium transition-colors link-underline py-1",
                          isActiveLink(link.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {link.name}
                        <ChevronDown className={cn(
                          "h-3 w-3 transition-transform duration-200",
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
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline py-1"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className={cn(
                        "text-sm font-medium transition-colors link-underline py-1",
                        isActiveLink(link.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"
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
              <ThemeToggle />
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:opacity-90 transition-all button-glow"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <button
                className="p-2 text-foreground"
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
              className="absolute inset-0 bg-background/98 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="relative flex flex-col items-center justify-center h-full gap-6 sm:gap-8"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 16 },
                  }}
                  className="flex flex-col items-center"
                >
                  {link.submenu ? (
                    <>
                      <button
                        onClick={() => setOpenSubmenu(openSubmenu === link.name ? null : link.name)}
                        className="text-2xl sm:text-3xl font-light text-foreground flex items-center gap-2"
                      >
                        {link.name}
                        <ChevronDown className={cn("h-5 w-5 sm:h-6 sm:w-6 transition-transform", openSubmenu === link.name && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {openSubmenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col items-center gap-3 mt-4"
                          >
                            {link.submenu.map((sublink) => (
                              <Link
                                key={sublink.name}
                                to={sublink.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-base sm:text-lg text-muted-foreground hover:text-primary transition-colors"
                              >
                                {sublink.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : link.href.startsWith('/#') ? (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-2xl sm:text-3xl font-light text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl sm:text-3xl font-light text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 16 },
                }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground text-base sm:text-lg font-medium rounded-full button-glow"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
