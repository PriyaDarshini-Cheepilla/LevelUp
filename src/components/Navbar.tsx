import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function Navbar({ currentPage = 'landing', onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a preference saved
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'career', label: 'Career' },
    { id: 'tests', label: 'Tests' },
    { id: 'courses', label: 'Courses' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'chatbot', label: 'AI Mentor' }
  ];

  const handleNavigate = (page: string) => {
    onNavigate?.(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Name & Dark Mode Toggle */}
          <div className="flex items-center gap-4">
            <span 
              className="text-[var(--text-primary)] tracking-tight cursor-pointer" 
              style={{ fontWeight: 600, fontSize: '18px' }}
              onClick={() => handleNavigate('landing')}
            >
              LevelUp
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-lg"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'secondary' : 'ghost'}
                className="rounded-lg"
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* User Profile & Progress */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-[var(--text-muted)]">Skills Progress</span>
              <div className="w-24">
                <Progress value={68} className="h-1.5" />
              </div>
            </div>
            <Avatar className="cursor-pointer" onClick={() => handleNavigate('dashboard')}>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-background">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'secondary' : 'ghost'}
                className="w-full justify-start rounded-lg"
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </Button>
            ))}
            <div className="pt-4 border-t border-border flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-muted)]">Skills Progress</p>
                <Progress value={68} className="h-1.5 mt-1" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
