
    import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
    import { ThemeToggle } from '@/components/ThemeToggle';
    import { Menu, Search, X, Settings2 } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';

    const NavLink = ({ to, children, onClick }) => (
      <Link
        to={to}
        onClick={onClick}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {children}
      </Link>
    );

    export function Header() {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [searchQuery, setSearchQuery] = useState('');
      const navigate = useNavigate();

      const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
          navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
          setSearchQuery(''); 
        }
      };

      const navItems = [
        { to: '/', label: 'Home' },
        { to: '/tools', label: 'All Tools' },
        { to: '/features', label: 'Features' },
        { to: '/blog', label: 'Blog' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact' },
      ];

      return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Settings2 className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl font-heading tracking-tight">Toolzenix</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-sm">
              {navItems.map(item => (
                <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
              ))}
            </nav>

            <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
              <form onSubmit={handleSearch} className="hidden sm:flex items-center relative">
                <Input
                  type="search"
                  placeholder="Search tools..."
                  className="h-9 md:w-[150px] lg:w-[250px] pr-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </Button>
              </form>
              <ThemeToggle />
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
                  <div className="flex justify-between items-center mb-6">
                    <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                      <Settings2 className="h-6 w-6 text-primary" />
                      <span className="font-bold">Toolzenix</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative">
                      <Input
                        type="search"
                        placeholder="Search tools..."
                        className="w-full pr-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button type="submit" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3">
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </form>
                  <nav className="grid gap-4">
                    {navItems.map(item => (
                      <NavLink key={item.to} to={item.to} onClick={() => setMobileMenuOpen(false)}>{item.label}</NavLink>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
      );
    }
  