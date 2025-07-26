import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient } from '@tanstack/react-query';
import { Home, Users, Settings, FileText, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <RootComponent />
  ),
});

function RootComponent() {
  const { user, logout } = useAuth();
  const currentPath = window.location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Show auth pages without navigation
  if (currentPath === '/login' || currentPath === '/register') {
    return (
      <div>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative">
        {/* Full Screen Responsive Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo Section */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2 group">
                  <div className="relative">
                    <div className="h-10 w-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                      <span className="text-primary-foreground font-bold text-lg">R</span>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      React App
                    </span>
                    <div className="text-xs text-muted-foreground font-medium">Dashboard</div>
                  </div>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-1">
                <NavLink to="/" icon={Home} label="Home" />
                <NavLink to="/users" icon={Users} label="Users" />
                <NavLink to="/posts" icon={FileText} label="Posts" />
                <NavLink to="/settings" icon={Settings} label="Settings" />
              </div>

              {/* Desktop User Menu */}
              <div className="hidden lg:flex lg:items-center lg:space-x-4">
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-accent/50 transition-all duration-200"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden xl:block text-left">
                      <div className="text-sm font-medium">{user?.name}</div>
                      <div className="text-xs text-muted-foreground">{user?.email}</div>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-background border rounded-lg shadow-lg py-1 z-[60]">
                      <div className="px-4 py-3 border-b">
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2 text-left hover:bg-accent"
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Menu className={`h-5 w-5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                    <X className={`h-5 w-5 absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`lg:hidden fixed left-0 right-0 top-16 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="px-4 pt-2 pb-6 space-y-1 bg-background/95 backdrop-blur border-t">
              {/* Mobile Navigation Links */}
              <MobileNavLink to="/" icon={Home} label="Home" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/users" icon={Users} label="Users" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/posts" icon={FileText} label="Posts" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/settings" icon={Settings} label="Settings" onClick={() => setIsMobileMenuOpen(false)} />
              
              {/* Mobile User Section */}
              <div className="pt-4 mt-4 border-t">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-sm text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start mt-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-16 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen">
          <Outlet />
        </main>

        {/* Development Tools */}
        <TanStackRouterDevtools />
      </div>
    </ProtectedRoute>
  );
}

// Desktop Navigation Link Component
function NavLink({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  return (
    <Link
      to={to}
      className="group relative flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent/50"
      activeProps={{
        className: "text-primary bg-accent/80 shadow-sm"
      }}
    >
      <Icon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110" />
      {label}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ to, icon: Icon, label, onClick }: { to: string; icon: any; label: string; onClick: () => void }) {
  return (
    <Link
      to={to}
      className="group flex items-center px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-accent/50"
      activeProps={{
        className: "text-primary bg-accent/80 shadow-sm"
      }}
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/30 mr-3 group-hover:bg-accent/50 transition-colors duration-200">
        <Icon className="w-5 h-5" />
      </div>
      <span className="flex-1">{label}</span>
    </Link>
  );
}