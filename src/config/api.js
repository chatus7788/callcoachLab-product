export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'CoachLab';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  ACCEPT_INVITE: '/auth/accept-invite',
  
  // Workspace
  CREATE_WORKSPACE: '/workspaces',
  GET_MY_WORKSPACE: '/workspaces/me',
  
  // User
  GET_ME: '/me',
  GET_USERS: '/users',
  UPDATE_USER: '/users',
  DELETE_USER: '/users',
  
  // Teams
  CREATE_TEAM: '/teams',
  GET_TEAMS: '/teams',
  UPDATE_TEAM: '/teams',
  DELETE_TEAM: '/teams',
  
  // Invites
  CREATE_INVITE: '/invites',
  GET_INVITES: '/invites',
  RESEND_INVITE: '/invites',
  REVOKE_INVITE: '/invites',
  
  // Settings
  GET_SETTINGS: '/settings',
  UPDATE_SETTINGS: '/settings',
  
  // Audit Logs
  GET_AUDIT_LOGS: '/audit-logs',
  
  // CSRF
  GET_CSRF_TOKEN: '/csrf-token',
};
