import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // If it's a hash link on the homepage
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home first, then scroll
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
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ? 'py-4' : 'py-6'
        )}
      >
        <div className="container-custom">
          <div
            className={cn(
              'flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500',
              isScrolled
                ? 'glass-strong shadow-lg'
                : 'bg-transparent'
            )}
          >
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/" className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Astute Computer"
                  className="h-8 w-auto invert"
                />
                <span className="hidden sm:block text-lg font-semibold tracking-tight text-foreground">
                  Astute Computer
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
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
                          isActiveLink(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {link.name}
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      <AnimatePresence>
                        {openSubmenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 pt-2"
                          >
                            <div className="bg-card border border-border rounded-lg shadow-lg py-2 min-w-[220px]">
                              {link.submenu.map((sublink) => (
                                <Link
                                  key={sublink.name}
                                  to={sublink.href}
                                  className={cn(
                                    "block px-4 py-2 text-sm transition-colors",
                                    isActiveLink(sublink.href)
                                      ? "text-foreground bg-foreground/5"
                                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                                  )}
                                >
                                  {sublink.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : link.href.startsWith('/#') ? (
                    <motion.button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline py-1"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      {link.name}
                    </motion.button>
                  ) : (
                    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                      <Link
                        to={link.href}
                        className={cn(
                          "text-sm font-medium transition-colors link-underline py-1",
                          isActiveLink(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-all button-glow"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="relative flex flex-col items-center justify-center h-full gap-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                  className="flex flex-col items-center"
                >
                  {link.submenu ? (
                    <>
                      <button
                        onClick={() => setOpenSubmenu(openSubmenu === link.name ? null : link.name)}
                        className="text-2xl font-light text-foreground flex items-center gap-2"
                      >
                        {link.name}
                        <ChevronDown className={cn("h-5 w-5 transition-transform", openSubmenu === link.name && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {openSubmenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col items-center gap-2 mt-2"
                          >
                            {link.submenu.map((sublink) => (
                              <Link
                                key={sublink.name}
                                to={sublink.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
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
                      className="text-2xl font-light text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-light text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 px-8 py-4 bg-foreground text-background text-lg font-medium rounded-full"
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
