
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Github, Twitter, Facebook, Settings2 } from 'lucide-react';

    export function Footer() {
      const currentYear = new Date().getFullYear();

      const footerLinks = [
        {
          title: 'Quick Links',
          links: [
            { label: 'Home', to: '/' },
            { label: 'All Tools', to: '/tools' },
            { label: 'Features', to: '/features' },
            { label: 'Blog', to: '/blog' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About Us', to: '/about' },
            { label: 'Contact Us', to: '/contact' },
            { label: 'Privacy Policy', to: '/privacy' },
            { label: 'Terms of Service', to: '/terms' },
          ],
        },
      ];

      const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Github, href: '#', label: 'GitHub' },
      ];

      return (
        <footer className="bg-muted/50 border-t">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div className="mb-6 md:mb-0 lg:col-span-1">
                <Link to="/" className="flex items-center space-x-2 mb-4">
                  <Settings2 className="h-8 w-8 text-primary" />
                  <span className="font-bold text-2xl font-heading">Toolzenix</span>
                </Link>
                <p className="text-muted-foreground text-sm">
                  Your one-stop solution for all online file conversion needs. Fast, secure, and easy to use.
                </p>
              </div>
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
               <div className="lg:col-span-1">
                <h3 className="font-semibold text-foreground mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
              <p>&copy; {currentYear} Toolzenix. All rights reserved.</p>
              <p>Designed with <span role="img" aria-label="love">❤️</span> by Hostinger Horizons</p>
            </div>
          </div>
        </footer>
      );
    }
  