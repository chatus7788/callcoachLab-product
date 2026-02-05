import { useAuthStore } from '../store/authStore';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';

export function DashboardPage() {
  const { user, workspace } = useAuthStore();

  const stats = [
    { label: 'Total Users', value: '0', icon: '👥', color: 'bg-blue-500' },
    { label: 'Active Teams', value: '0', icon: '🎯', color: 'bg-green-500' },
    { label: 'Total Calls', value: '0', icon: '📞', color: 'bg-purple-500' },
    { label: 'Avg Score', value: 'N/A', icon: '⭐', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h2>
        <p className="text-gray-600 mt-1">Here's what's happening in your workspace today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} padding={false}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-lg text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Workspace Info */}
      <Card>
        <CardHeader>
          <CardTitle>Workspace Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Workspace Name:</span>
              <span className="font-medium">{workspace?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Industry Type:</span>
              <span className="font-medium">{workspace?.industryType || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Timezone:</span>
              <span className="font-medium">{workspace?.timezone || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Your Role:</span>
              <span className="font-medium">{user?.role || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {user?.status || 'ACTIVE'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-blue-500 text-xl">1️⃣</span>
              <div>
                <h4 className="font-medium text-gray-900">Create Teams</h4>
                <p className="text-sm text-gray-600">Organize your agents into teams for better management.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 text-xl">2️⃣</span>
              <div>
                <h4 className="font-medium text-gray-900">Invite Users</h4>
                <p className="text-sm text-gray-600">Add managers and agents to your workspace.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-500 text-xl">3️⃣</span>
              <div>
                <h4 className="font-medium text-gray-900">Configure Settings</h4>
                <p className="text-sm text-gray-600">Customize workspace permissions and preferences.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
