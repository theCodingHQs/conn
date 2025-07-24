import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient } from '@tanstack/react-query';
import { Home, Users, Settings, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Button } from '../components/ui/button';

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
      <div className="min-h-screen">
        {/* Navigation Header */}
        <nav className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">R</span>
                  </div>
                  <span className="ml-2 text-xl font-semibold">React App</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-8">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  activeProps={{
                    className: "text-primary bg-accent"
                  }}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
                
                <Link
                  to="/users"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  activeProps={{
                    className: "text-primary bg-accent"
                  }}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Users
                </Link>
                
                <Link
                  to="/posts"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  activeProps={{
                    className: "text-primary bg-accent"
                  }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Posts
                </Link>
                
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  activeProps={{
                    className: "text-primary bg-accent"
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
                
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user?.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        {/* Development Tools */}
        <TanStackRouterDevtools />
      </div>
    </ProtectedRoute>
  );
}