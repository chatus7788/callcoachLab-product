import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { useToast } from '../components/Toast';

export function SignupPage() {
  const [formData, setFormData] = useState({
    workspaceName: '',
    adminEmail: '',
    adminPassword: '',
    confirmPassword: '',
    industryType: 'INSURANCE',
    timezone: 'America/New_York',
  });
  const [errors, setErrors] = useState({});
  
  const { createWorkspace, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  const validate = () => {
    const newErrors = {};
    
    if (!formData.workspaceName) {
      newErrors.workspaceName = 'Workspace name is required';
    }
    
    if (!formData.adminEmail) {
      newErrors.adminEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
      newErrors.adminEmail = 'Email is invalid';
    }
    
    if (!formData.adminPassword) {
      newErrors.adminPassword = 'Password is required';
    } else if (formData.adminPassword.length < 8) {
      newErrors.adminPassword = 'Password must be at least 8 characters';
    }
    
    if (formData.adminPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      const { confirmPassword, ...dataToSend } = formData;
      await createWorkspace(dataToSend);
      toast.success('Workspace created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Workspace creation failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CoachLab</h1>
          <p className="text-gray-600">Create your workspace</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Workspace Name"
              name="workspaceName"
              fullWidth
              required
              value={formData.workspaceName}
              onChange={handleChange}
              error={errors.workspaceName}
              placeholder="My Company"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry Type <span className="text-red-500">*</span>
              </label>
              <select
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Dental">Dental</option>
                <option value="Skin">Skin</option>
                <option value="Hair">Hair</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone <span className="text-red-500">*</span>
              </label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Admin Account</h3>
              
              <Input
                label="Email"
                type="email"
                name="adminEmail"
                fullWidth
                required
                value={formData.adminEmail}
                onChange={handleChange}
                error={errors.adminEmail}
                placeholder="admin@example.com"
              />
            </div>

            <Input
              label="Password"
              type="password"
              name="adminPassword"
              fullWidth
              required
              value={formData.adminPassword}
              onChange={handleChange}
              error={errors.adminPassword}
              placeholder="••••••••"
              helperText="At least 8 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              Create Workspace
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
