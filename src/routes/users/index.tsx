import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Mail, Calendar } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

export const Route = createFileRoute('/users/')({
  component: Users,
});

interface User {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  avatar: string;
}

// Mock API function
const fetchUsers = async (): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2024-01-15', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2024-02-20', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', joinDate: '2024-03-10', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', joinDate: '2024-03-25', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: 5, name: 'Alex Brown', email: 'alex@example.com', joinDate: '2024-04-05', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', joinDate: '2024-04-18', avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop' },
  ];
};

function Users() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg">Error loading users</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <div className="text-sm text-gray-600">
          {users ? `${users.length} users` : '...'}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-lg text-gray-600">Loading users...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Mail className="w-4 h-4 mr-1" />
              {user.email}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              Joined {new Date(user.joinDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}