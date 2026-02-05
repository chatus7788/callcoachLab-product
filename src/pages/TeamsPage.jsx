import { useState, useEffect } from 'react';
import { teamService } from '../services/teamService';
import { Button } from '../components/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { useToast } from '../components/Toast';
import { Spinner } from '../components/Spinner';
import { useAuthStore } from '../store/authStore';

export function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState({});
  
  const { user } = useAuthStore();
  const toast = useToast();

  const canManageTeams = ['ADMIN', 'MANAGER'].includes(user?.role);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const data = await teamService.getTeams();
      setTeams(data.teams || []);
    } catch (error) {
      toast.error('Failed to load teams');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (team = null) => {
    if (team) {
      setEditingTeam(team);
      setFormData({ name: team.name, description: team.description || '' });
    } else {
      setEditingTeam(null);
      setFormData({ name: '', description: '' });
    }
    setIsModalOpen(true);
    setErrors({});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTeam(null);
    setFormData({ name: '', description: '' });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Team name is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editingTeam) {
        await teamService.updateTeam(editingTeam._id, formData);
        toast.success('Team updated successfully');
      } else {
        await teamService.createTeam(formData);
        toast.success('Team created successfully');
      }
      
      fetchTeams();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Operation failed');
    }
  };

  const handleDelete = async (teamId) => {
    if (!confirm('Are you sure you want to delete this team?')) return;

    try {
      await teamService.deleteTeam(teamId);
      toast.success('Team deleted successfully');
      fetchTeams();
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Delete failed');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" className="text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Teams</h2>
          <p className="text-gray-600 mt-1">Manage your workspace teams</p>
        </div>
        {canManageTeams && (
          <Button onClick={() => handleOpenModal()}>
            + Create Team
          </Button>
        )}
      </div>

      {teams.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No teams yet</p>
            {canManageTeams && (
              <Button onClick={() => handleOpenModal()}>
                Create Your First Team
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Card key={team._id}>
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {team.description || 'No description'}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Members:</span>
                    <span className="font-medium">{team.memberCount || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Manager:</span>
                    <span className="font-medium">{team.managerName || 'N/A'}</span>
                  </div>
                </div>
                
                {canManageTeams && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenModal(team)}
                      fullWidth
                    >
                      Edit
                    </Button>
                    {user?.role === 'ADMIN' && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(team._id)}
                        fullWidth
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTeam ? 'Edit Team' : 'Create Team'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Team Name"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="Sales Team"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Optional team description"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">
              {editingTeam ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
