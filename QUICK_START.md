# CoachLab - Quick Start Guide

## 🎯 Overview

This is a full-stack application with:
- **Backend**: Node.js + Express + MongoDB (coachLab folder)
- **Frontend**: React + Vite + Tailwind CSS (coachLabFrontend folder)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or accessible remotely
- Git (optional)

### Backend Setup (CoachLab API)

1. **Navigate to backend folder:**
   ```bash
   cd coachLab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your settings:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_ACCESS_SECRET` - Random secure string for access tokens
   - `JWT_REFRESH_SECRET` - Random secure string for refresh tokens
   - `CORS_ORIGIN` - Include your frontend URL (http://localhost:5173)

4. **Start the backend:**
   ```bash
   npm run dev
   ```
   
   Backend will run on `http://localhost:3000`

### Frontend Setup (CoachLab Frontend)

1. **Navigate to frontend folder:**
   ```bash
   cd coachLabFrontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   The `.env` file is already created with:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   VITE_APP_NAME=CoachLab
   ```

4. **Start the frontend:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

## 📱 First Time Usage

1. **Open your browser** and go to `http://localhost:5173`

2. **Create a workspace:**
   - Click "Create one" on the login page
   - Fill in workspace details:
     - Workspace Name: Your company name
     - Industry Type: Choose your industry
     - Timezone: Select your timezone
     - Admin Email: Your email address
     - Password: Secure password (min 8 characters)
   - Click "Create Workspace"

3. **You're automatically logged in!**
   - You'll see the dashboard
   - Your role is ADMIN with full access

## 🎨 Features Available

### For All Users:
- ✅ Dashboard overview
- ✅ View teams
- ✅ View users

### For Managers & Admins:
- ✅ Create/Edit/Delete teams
- ✅ Manage team members

### For Admins Only:
- ✅ Invite users
- ✅ Manage workspace settings
- ✅ Configure permissions
- ✅ Delete teams

## 🔑 Testing the Application

### Test Login
Use the credentials you created during workspace setup.

### Test Creating a Team
1. Go to Teams page
2. Click "Create Team"
3. Enter team name and description
4. Click "Create"

### Test Settings (Admin only)
1. Go to Settings page
2. Toggle various permissions
3. Click "Save Changes"

## 🏗️ Project Structure

### Backend (coachLab/)
```
src/
├── controllers/     # Request handlers
├── models/          # MongoDB schemas
├── routes/          # API routes
├── middleware/      # Auth, validation, error handling
├── services/        # Business logic
├── utils/           # Helper functions
└── validators/      # Request validation schemas
```

### Frontend (coachLabFrontend/)
```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── services/       # API calls
├── store/          # State management
├── config/         # Configuration
└── App.jsx         # Main app with routing
```

## 🔧 Common Issues & Solutions

### Backend won't start
- Check MongoDB is running
- Verify `.env` file exists and has correct values
- Make sure port 3000 is not in use

### Frontend won't start
- Check if dependencies are installed (`npm install`)
- Verify `.env` file has correct backend URL
- Make sure port 5173 is not in use

### CORS errors
- Add frontend URL to backend's `CORS_ORIGIN` in `.env`
- Restart backend after changing `.env`

### Login fails
- Check backend is running on port 3000
- Check browser console for errors
- Verify MongoDB is running and accessible

### "Cannot refresh token" error
- Clear browser cookies and localStorage
- Try logging in again
- Check backend logs for errors

## 📚 API Documentation

### Authentication
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/refresh` - Refresh token
- `POST /workspaces` - Create workspace

### Teams
- `GET /teams` - Get all teams
- `POST /teams` - Create team
- `PATCH /teams/:id` - Update team
- `DELETE /teams/:id` - Delete team

### Users
- `GET /users` - Get all users
- `GET /me` - Get current user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Settings
- `GET /settings` - Get settings
- `PATCH /settings` - Update settings

### Workspace
- `GET /workspaces/me` - Get current workspace

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use production MongoDB URI
3. Set strong JWT secrets
4. Deploy to Node.js hosting (Heroku, Railway, AWS, etc.)
5. Set up environment variables

### Frontend
1. Update `VITE_API_BASE_URL` to production backend URL
2. Run `npm run build`
3. Deploy `dist` folder to static hosting (Vercel, Netlify, Cloudflare Pages)
4. Configure environment variables in hosting platform

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs
3. Check browser console for frontend errors
4. Review the comprehensive README files in each folder

## 🎓 Next Steps

1. **Invite Users**: Use the invite system to add team members
2. **Create Teams**: Organize your users into teams
3. **Configure Permissions**: Customize workspace access controls
4. **Explore API**: Use Postman collection in backend folder
5. **Customize**: Modify components and add features as needed

## 🛠️ Development Tips

- Backend auto-restarts on file changes (nodemon)
- Frontend has hot module replacement (HMR)
- Check browser DevTools Network tab for API calls
- Use React DevTools for component debugging
- MongoDB Compass for database inspection

---

**Congratulations! 🎉** Your production-level CoachLab application is ready to use!
