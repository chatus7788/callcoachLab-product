import { useState, useEffect } from 'react';
import { workspaceService } from '../services/workspaceService';
import { Button } from '../components/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Input } from '../components/Input';
import { useToast } from '../components/Toast';
import { Spinner } from '../components/Spinner';
import { useAuthStore } from '../store/authStore';

export function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [workspace, setWorkspace] = useState(null);
  
  const { user } = useAuthStore();
  const toast = useToast();

  const canEditSettings = user?.role === 'ADMIN';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [workspaceData, settingsData] = await Promise.all([
        workspaceService.getMyWorkspace(),
        workspaceService.getSettings(),
      ]);
      setWorkspace(workspaceData.workspace);
      setSettings(settingsData.settings);
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePermission = (key) => {
    if (!canEditSettings) return;
    
    setSettings({
      ...settings,
      permissions: {
        ...settings.permissions,
        [key]: !settings.permissions[key],
      },
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await workspaceService.updateSettings(settings);
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" className="text-blue-600" />
      </div>
    );
  }

  const permissions = [
    { key: 'managersCanEditScorecards', label: 'Managers can edit scorecards', description: 'Allow managers to create and modify scorecards' },
    { key: 'managersCanEditOutcomes', label: 'Managers can edit outcomes', description: 'Allow managers to create and modify call outcomes' },
    { key: 'managersCanExportData', label: 'Managers can export data', description: 'Allow managers to export reports and data' },
    { key: 'agentsCanViewOwnCallScores', label: 'Agents can view their own scores', description: 'Allow agents to see their individual call scores' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage workspace settings and permissions</p>
      </div>

      {/* Workspace Info */}
      <Card>
        <CardHeader>
          <CardTitle>Workspace Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Workspace Name"
              value={workspace?.name || ''}
              disabled
              fullWidth
            />
            <Input
              label="Industry Type"
              value={workspace?.industryType || ''}
              disabled
              fullWidth
            />
            <Input
              label="Timezone"
              value={workspace?.timezone || ''}
              disabled
              fullWidth
            />
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {permissions.map((permission) => (
              <div key={permission.key} className="flex items-start justify-between py-3 border-b last:border-b-0">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{permission.label}</h4>
                  <p className="text-sm text-gray-500 mt-1">{permission.description}</p>
                </div>
                <button
                  onClick={() => handleTogglePermission(permission.key)}
                  disabled={!canEditSettings}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings?.permissions?.[permission.key] ? 'bg-blue-600' : 'bg-gray-200'
                  } ${!canEditSettings ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings?.permissions?.[permission.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {canEditSettings && (
            <div className="mt-6">
              <Button onClick={handleSave} loading={isSaving} disabled={isSaving}>
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
