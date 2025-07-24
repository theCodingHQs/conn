import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Activity, Users, FileText, Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export const Route = createFileRoute('/')({
  component: Index,
});

// Mock API function
const fetchDashboardStats = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    totalUsers: 1250,
    totalPosts: 847,
    activeUsers: 89,
    systemHealth: 'healthy'
  };
};

function Index() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg">Error loading dashboard data</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to React Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A modern React application built with Vite, TanStack Router, and TanStack Query
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={isLoading ? '...' : stats?.totalUsers.toLocaleString()}
          icon={<Users className="w-8 h-8 text-blue-600" />}
          isLoading={isLoading}
        />
        
        <StatCard
          title="Total Posts"
          value={isLoading ? '...' : stats?.totalPosts.toLocaleString()}
          icon={<FileText className="w-8 h-8 text-green-600" />}
          isLoading={isLoading}
        />
        
        <StatCard
          title="Active Users"
          value={isLoading ? '...' : stats?.activeUsers.toString()}
          icon={<Activity className="w-8 h-8 text-orange-600" />}
          isLoading={isLoading}
        />
        
        <StatCard
          title="System Health"
          value={isLoading ? '...' : stats?.systemHealth || 'unknown'}
          icon={<SettingsIcon className="w-8 h-8 text-purple-600" />}
          isLoading={isLoading}
        />
      </div>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="React 19.1.0"
              description="Latest version of React with improved performance and new features"
            />
            <FeatureCard
              title="TanStack Router"
              description="Type-safe routing with powerful navigation and data loading capabilities"
            />
            <FeatureCard
              title="TanStack Query"
              description="Powerful data synchronization for React with caching and background updates"
            />
            <FeatureCard
              title="Tailwind CSS"
              description="Utility-first CSS framework for rapid UI development"
            />
            <FeatureCard
              title="TypeScript"
              description="Full type safety throughout the application"
            />
            <FeatureCard
              title="Vite"
              description="Lightning fast build tool with hot module replacement"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon, isLoading }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center mt-2">
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              ) : (
                <p className="text-3xl font-bold">{value}</p>
              )}
            </div>
          </div>
          <div className="flex-shrink-0">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureCard({ title, description }: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}