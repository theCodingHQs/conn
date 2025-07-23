import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient } from '@tanstack/react-query';
import { Home, Users, Settings, FileText } from 'lucide-react';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">React App</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                activeProps={{
                  className: "text-blue-600 bg-blue-50"
                }}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
              
              <Link
                to="/users"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                activeProps={{
                  className: "text-blue-600 bg-blue-50"
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Users
              </Link>
              
              <Link
                to="/posts"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                activeProps={{
                  className: "text-blue-600 bg-blue-50"
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                Posts
              </Link>
              
              <Link
                to="/settings"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                activeProps={{
                  className: "text-blue-600 bg-blue-50"
                }}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
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
  ),
});