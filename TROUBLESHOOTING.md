# Troubleshooting Guide - Registration Issues

## Fixed Issues

1. ✅ **Registration endpoint now returns user data** - Updated to match login endpoint format
2. ✅ **Registration component properly handles response** - No longer calls login after registration
3. ✅ **Improved error handling** - Shows actual error messages instead of generic "Registration failed"
4. ✅ **CORS configuration** - Properly configured to allow requests from client
5. ✅ **API base URL** - Fixed to use relative URL `/api` for Vite proxy

## Common Issues to Check

### 1. Server Not Running
Make sure your server is running:
```bash
cd server
npm run dev
```
You should see: "Server running on port 5000" and "Connected to MongoDB"

### 2. MongoDB Not Connected
Check if MongoDB is running:
- Local MongoDB: Make sure MongoDB service is running
- MongoDB Atlas: Check your connection string in `.env` file

Create `server/.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Client Not Running
Make sure your client is running:
```bash
cd client/blog
npm run dev
```
You should see: "Local: http://localhost:5173"

### 4. Check Browser Console
Open browser DevTools (F12) and check:
- **Console tab**: Look for any JavaScript errors
- **Network tab**: 
  - Check if requests to `/api/auth/register` are being made
  - Check the response status and error messages
  - Verify the request URL is correct

### 5. Check Server Logs
Look at your server terminal for:
- Any error messages
- Request logs showing the registration attempt
- MongoDB connection errors

### 6. Verify Environment Variables
Make sure `JWT_SECRET` is set in `server/.env`. Without it, token generation will fail.

### 7. Test API Directly
You can test the API directly using curl or Postman:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

## Expected Behavior

When registration succeeds:
- Server returns: `{ token: "...", user: { id: "...", username: "..." } }`
- Client stores token and user in localStorage
- User is redirected to home page
- Auth context is updated

When registration fails:
- Alert shows the actual error message (e.g., "User exists", validation errors)
- Console shows detailed error information

## Next Steps

1. Check browser console for errors
2. Check server terminal for errors
3. Verify both servers are running
4. Check MongoDB connection
5. Try the registration again and check the error message

