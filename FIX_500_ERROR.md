# Fixing 500 Error When Creating Posts

## Changes Made

1. ✅ **Fixed slug generation** - Now handles edge cases and empty titles
2. ✅ **Improved category handling** - Properly converts empty strings to null
3. ✅ **Enhanced error handling** - Better error messages and logging
4. ✅ **Fixed validation errors** - Better handling of Mongoose validation errors

## Common Causes of 500 Errors

### 1. Missing Environment Variables
Check your `server/.env` file has:
```
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Without JWT_SECRET**, authentication will fail and cause 500 errors.

### 2. MongoDB Not Connected
Check your server terminal for:
- "Connected to MongoDB" message
- Any MongoDB connection errors

### 3. Check Server Logs
When you try to create a post, check your **server terminal** for the actual error message. The error will show:
- What went wrong
- Which line caused the error
- The error stack trace

### 4. Authentication Issues
Make sure you're logged in before creating a post. The post creation requires authentication.

## How to Debug

1. **Check Server Terminal**
   - Look for error messages when you submit the form
   - The error will show the actual problem

2. **Check Browser Console (F12)**
   - Network tab: Look at the POST request to `/api/posts`
   - Check the response body for error details
   - Console tab: Look for any JavaScript errors

3. **Verify Environment Variables**
   ```bash
   cd server
   # Check if .env file exists
   # Make sure JWT_SECRET is set
   ```

4. **Test Authentication**
   - Try logging in first
   - Make sure you get a token
   - Check if token is stored in localStorage

## Next Steps

1. **Restart your server** after these changes:
   ```bash
   cd server
   npm run dev
   ```

2. **Try creating a post again**

3. **If it still fails**, check the server terminal for the exact error message and share it

## Expected Behavior

After these fixes:
- Posts should create successfully
- Slug will be auto-generated from title
- Empty categories will be handled properly
- Better error messages if something goes wrong

