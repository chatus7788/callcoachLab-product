# CoachLab Frontend

Production-level React frontend application for CoachLab - a call coaching and quality assurance platform.

## 🚀 Features

- **Authentication System**
  - Login/Logout with JWT token management
  - Workspace creation (Sign up)
  - Automatic token refresh
  - Protected routes
  
- **Dashboard**
  - Overview of workspace statistics
  - Quick access to key features
  - User and workspace information

- **Team Management**
  - Create, edit, and delete teams
  - View team members and managers
  - Role-based access control

- **User Management**
  - View all workspace users
  - User role and status indicators
  - Activity tracking

- **Settings**
  - Workspace configuration
  - Permission management
  - Granular access controls

## 🛠️ Tech Stack

- **React 19** - UI framework
- **React Router DOM** - Navigation and routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Update .env with your backend API URL
VITE_API_BASE_URL=http://localhost:3000
```

## 🏃 Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will run on `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   ├── Spinner.jsx
│   ├── Toast.jsx
│   ├── ProtectedRoute.jsx
│   └── DashboardLayout.jsx
├── pages/              # Page components
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── DashboardPage.jsx
│   ├── TeamsPage.jsx
│   ├── UsersPage.jsx
│   └── SettingsPage.jsx
├── services/           # API service layer
│   ├── api.js          # Axios instance with interceptors
│   ├── authService.js
│   ├── workspaceService.js
│   ├── teamService.js
│   └── userService.js
├── store/              # State management
│   └── authStore.js    # Zustand auth store
├── config/             # Configuration
│   └── api.js          # API endpoints and constants
├── App.jsx             # Main app component with routing
└── main.jsx            # Entry point
```

## 🔐 Authentication Flow

1. User logs in with email/password
2. Backend returns access token (stored in localStorage) and refresh token (httpOnly cookie)
3. Access token is included in all API requests via Authorization header
4. When access token expires (401), axios interceptor automatically:
   - Calls refresh endpoint with httpOnly cookie
   - Gets new access token
   - Retries original request
5. If refresh fails, user is redirected to login

## 🎨 UI Components

### Button
```jsx
<Button variant="primary" size="md" loading={false}>
  Click Me
</Button>
```
Variants: primary, secondary, danger, ghost, outline
Sizes: sm, md, lg

### Input
```jsx
<Input 
  label="Email" 
  type="email" 
  required 
  error="Error message"
  fullWidth
/>
```

### Card
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Toast Notifications
```jsx
import { useToast } from './components/Toast';

const toast = useToast();
toast.success('Success message');
toast.error('Error message');
toast.info('Info message');
toast.warning('Warning message');
```

## 🔒 Role-Based Access Control

- **ADMIN**: Full access to all features
- **MANAGER**: Can manage teams, view users, limited settings access
- **AGENT**: Basic access, can view own data

## 🌐 API Integration

All API calls go through the centralized axios instance in `services/api.js`:

- Automatic token attachment
- Token refresh on 401
- Error handling
- Request/response interceptors

## 🎯 Best Practices

1. **State Management**: Use Zustand for global state, local state for component-specific data
2. **Error Handling**: All API calls wrapped in try-catch with toast notifications
3. **Loading States**: Show loading indicators during async operations
4. **Validation**: Client-side validation before API calls
5. **Security**: Tokens in localStorage, sensitive refresh token in httpOnly cookie
6. **Responsive Design**: Mobile-first approach with Tailwind CSS
7. **Code Organization**: Separation of concerns (components, services, pages, store)

## 🔧 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=CoachLab
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. The `dist` folder contains the production build

3. Deploy to your preferred hosting (Vercel, Netlify, AWS S3, etc.)

4. Update environment variables in your hosting platform

## 🔄 API Endpoints Used

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh access token
- `POST /workspaces` - Create workspace
- `GET /workspaces/me` - Get current workspace
- `GET /me` - Get current user
- `GET /teams` - Get teams
- `POST /teams` - Create team
- `PATCH /teams/:id` - Update team
- `DELETE /teams/:id` - Delete team
- `GET /users` - Get users
- `GET /settings` - Get workspace settings
- `PATCH /settings` - Update workspace settings

## 🐛 Troubleshooting

### CORS Issues
Ensure backend CORS_ORIGIN includes your frontend URL

### Token Refresh Loop
Check that refresh token cookie is being sent (withCredentials: true)

### Build Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

Private - All rights reserved

## 👥 Support

For support, contact your system administrator.
