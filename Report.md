# MERN Stack Blog Application - Project Report

## 🌐 Live Demo

**Live Application**: [https://plp-mern-stack-development.github.io/mern-stack-integration-J-Njoroge/](https://plp-mern-stack-development.github.io/mern-stack-integration-J-Njoroge/)

The application is deployed on GitHub Pages and accessible via the link above.

## Project Overview

This is a full-stack blog application built using the MERN (MongoDB, Express.js, React.js, Node.js) technology stack. The application provides a complete blogging platform where users can create, read, update, and delete blog posts, manage categories, add comments, and handle user authentication.

### Key Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Blog Post Management**: Full CRUD operations for blog posts
- **Category System**: Organize posts by categories
- **Comments**: Users can add comments to blog posts
- **Image Uploads**: Support for featured images on blog posts
- **Search & Filter**: Search posts by title and filter by category
- **Pagination**: Efficient post listing with pagination support
- **Responsive Design**: Modern, user-friendly interface

## Technology Stack

### Frontend
- **React 19.1.1**: Modern UI library for building user interfaces
- **React Router DOM 7.9.4**: Client-side routing
- **Vite 7.1.7**: Fast build tool and development server
- **Axios 1.13.0**: HTTP client for API requests
- **React Hook Form 7.65.0**: Form handling and validation
- **JWT Decode 4.0.0**: Decode JWT tokens

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js 5.1.0**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose 8.19.2**: MongoDB object modeling
- **JWT (jsonwebtoken) 9.0.2**: Authentication tokens
- **Bcryptjs 3.0.2**: Password hashing
- **Multer 2.0.2**: File upload handling
- **Express Validator 7.3.0**: Input validation
- **CORS 2.8.5**: Cross-origin resource sharing
- **Dotenv 17.2.3**: Environment variable management

## Project Structure

```
mern-stack-integration-J-Njoroge/
├── client/                          # Frontend React application
│   └── blog/
│       ├── public/                  # Static assets
│       │   └── vite.svg
│       ├── src/
│       │   ├── assets/             # Images and static files
│       │   │   └── react.svg
│       │   ├── components/         # Reusable React components
│       │   │   └── Nav.jsx         # Navigation bar component
│       │   ├── context/            # React Context providers
│       │   │   ├── AuthContext.jsx # Authentication state management
│       │   │   └── PostContext.jsx # Post state management
│       │   ├── hooks/              # Custom React hooks (empty)
│       │   ├── pages/              # Page components
│       │   │   ├── Login.jsx      # User login page
│       │   │   ├── Register.jsx   # User registration page
│       │   │   ├── PostList.jsx   # Blog post listing page
│       │   │   ├── PostForm.jsx   # Create/Edit post form
│       │   │   └── SinglePost.jsx # Individual post view
│       │   ├── services/          # API service layer
│       │   │   └── api.js         # Axios configuration and API calls
│       │   ├── App.jsx            # Main application component
│       │   ├── main.jsx           # Application entry point
│       │   └── index.css          # Global styles
│       ├── dist/                   # Production build output
│       ├── index.html              # HTML template
│       ├── package.json            # Frontend dependencies
│       ├── vite.config.js          # Vite configuration
│       └── eslint.config.js        # ESLint configuration
│
├── server/                          # Backend Express application
│   ├── config/                     # Configuration files (empty)
│   ├── controllers/                # Route controllers (empty)
│   ├── middleware/                 # Custom middleware
│   │   └── auth.js                # JWT authentication middleware
│   ├── models/                     # Mongoose data models
│   │   ├── User.js                # User model
│   │   ├── Post.js                # Blog post model
│   │   ├── Category.js           # Category model
│   │   └── Comment.js             # Comment model
│   ├── routes/                     # API route handlers
│   │   ├── auth.js                # Authentication routes
│   │   ├── posts.js               # Blog post routes
│   │   ├── categories.js          # Category routes
│   │   └── comments.js            # Comment routes
│   ├── uploads/                    # Uploaded image files
│   ├── utils/                      # Utility functions (empty)
│   ├── server.js                   # Main server file
│   └── package.json                # Backend dependencies
│
├── README.md                        # Project documentation
├── Report.md                        # This file
└── Week4-Assignment.md             # Assignment instructions
```

## File Structure Details

### Frontend Structure (`client/blog/src/`)

- **App.jsx**: Main application component that sets up routing and context providers
- **main.jsx**: Application entry point that renders the React app
- **components/Nav.jsx**: Navigation bar with login/logout and new post links
- **context/AuthContext.jsx**: Manages user authentication state globally
- **context/PostContext.jsx**: Manages blog post state globally
- **pages/Login.jsx**: User login form
- **pages/Register.jsx**: User registration form
- **pages/PostList.jsx**: Displays list of blog posts with search and filter
- **pages/PostForm.jsx**: Form for creating and editing blog posts
- **pages/SinglePost.jsx**: Displays individual post with comments
- **services/api.js**: Centralized API service with axios configuration and interceptors

### Backend Structure (`server/`)

- **server.js**: Main server file that sets up Express, MongoDB connection, middleware, and routes
- **models/User.js**: User schema with username and password
- **models/Post.js**: Blog post schema with title, content, author, category, images, and slug
- **models/Category.js**: Category schema for organizing posts
- **models/Comment.js**: Comment schema linked to posts and users
- **routes/auth.js**: Handles user registration, login, and authentication
- **routes/posts.js**: Handles CRUD operations for blog posts
- **routes/categories.js**: Handles category management
- **routes/comments.js**: Handles comment creation and retrieval
- **middleware/auth.js**: JWT token verification middleware for protected routes

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token
- `GET /api/auth/me` - Get current user (protected)

### Posts (`/api/posts`)
- `GET /api/posts` - Get all posts (with pagination, search, filter)
- `GET /api/posts/:id` - Get single post by ID
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected, author only)
- `DELETE /api/posts/:id` - Delete post (protected, author only)

### Categories (`/api/categories`)
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Comments (`/api/comments`)
- `GET /api/comments/:postId` - Get all comments for a post
- `POST /api/comments` - Add comment to a post (protected)

## How to Run the Project

### Prerequisites

Before running the project, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd mern-stack-integration-J-Njoroge
```

### Step 2: Install Dependencies

#### Install Backend Dependencies
```bash
cd server
npm install
```

#### Install Frontend Dependencies
```bash
cd ../client/blog
npm install
```

### Step 3: Configure Environment Variables

#### Backend Configuration (`server/.env`)

Create a `.env` file in the `server` directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/mern-blog
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Important**: 
- Replace `your-super-secret-jwt-key-change-this-in-production` with a strong, random string
- For MongoDB Atlas, replace the connection string with your actual credentials
- For local MongoDB, ensure MongoDB is running on your system

#### Frontend Configuration (`client/blog/.env`)

Create a `.env` file in the `client/blog` directory (optional):

```env
VITE_API_URL=/api
```

This is optional as the application defaults to `/api` which works with the Vite proxy.

### Step 4: Start MongoDB

#### Local MongoDB
If using local MongoDB, ensure the MongoDB service is running:
```bash
# On Windows (if installed as service, it should start automatically)
# Or start manually:
mongod
```

#### MongoDB Atlas
If using MongoDB Atlas, ensure your connection string in `.env` is correct and your IP is whitelisted.

### Step 5: Start the Development Servers

You need to run both the backend and frontend servers simultaneously. Open two terminal windows:

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```

You should see:
```
Connected to MongoDB
Server running on port 5000
```

#### Terminal 2 - Frontend Server
```bash
cd client/blog
npm run dev
```

You should see:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 6: Access the Application

Open your web browser and navigate to:
```
http://localhost:5173
```

## Usage Instructions

### 1. Register a New User
- Click on "Register" in the navigation bar
- Enter a username and password (minimum 6 characters)
- Click "Register" to create your account

### 2. Login
- Click on "Login" in the navigation bar
- Enter your username and password
- Click "Login" to access your account

### 3. Create a Blog Post
- After logging in, click "New Post" in the navigation bar
- Fill in the post title and content
- Optionally select a category and upload a featured image
- Click "Create Post" to publish

### 4. View Posts
- The home page displays all blog posts
- Click on a post title to view the full post
- Use the search bar to find posts by title
- Use the category dropdown to filter posts

### 5. Edit or Delete Posts
- Navigate to a post you created
- Edit or delete options are available for your own posts

### 6. Add Comments
- View any post to see existing comments
- Logged-in users can add comments at the bottom of the post

## Development Notes

### Key Features Implemented

1. **Authentication System**
   - JWT-based authentication
   - Password hashing with bcrypt
   - Protected routes using middleware
   - Token stored in localStorage

2. **Post Management**
   - Auto-generated slugs from titles
   - Image upload support with Multer
   - Category association
   - Author-based permissions

3. **Error Handling**
   - Comprehensive error handling on both frontend and backend
   - User-friendly error messages
   - Proper HTTP status codes

4. **CORS Configuration**
   - Properly configured to allow frontend-backend communication
   - Credentials support for authentication

5. **Form Validation**
   - Client-side validation with React Hook Form
   - Server-side validation with Express Validator

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running (local) or connection string is correct (Atlas)
   - Check firewall settings for MongoDB Atlas

2. **Port Already in Use**
   - Change PORT in `server/.env` if 5000 is occupied
   - Change Vite port in `vite.config.js` if 5173 is occupied

3. **Authentication Errors**
   - Ensure JWT_SECRET is set in `server/.env`
   - Clear browser localStorage and try logging in again

4. **CORS Errors**
   - Verify CLIENT_URL in `server/.env` matches your frontend URL
   - Check CORS configuration in `server/server.js`

5. **Image Upload Issues**
   - Ensure `server/uploads` directory exists
   - Check file permissions on the uploads directory

## Production Deployment

### Frontend Deployment (GitHub Pages)

The frontend is deployed on GitHub Pages and is accessible at:
**Live Application**: [https://plp-mern-stack-development.github.io/mern-stack-integration-J-Njoroge/](https://plp-mern-stack-development.github.io/mern-stack-integration-J-Njoroge/)

**Deployment Steps:**
1. Build the frontend:
   ```bash
   cd client/blog
   npm run build
   ```

2. Copy the contents of `dist/` folder to the repository root

3. Configure `vite.config.js` with the correct base path:
   ```js
   base: '/mern-stack-integration-J-Njoroge/'
   ```

4. Add `basename` to React Router in `App.jsx`:
   ```jsx
   <Router basename="/mern-stack-integration-J-Njoroge">
   ```

5. Create a `404.html` redirect file for client-side routing

6. Commit and push to the main branch

7. Enable GitHub Pages in repository Settings → Pages

### Backend Deployment

For backend production deployment:

1. Set `NODE_ENV=production` in server `.env`

2. Use a process manager like PM2 for the Node.js server

3. Configure proper MongoDB connection string

4. Set secure JWT_SECRET

5. Configure proper CORS origins

**Note**: The deployed frontend on GitHub Pages currently points to `localhost:5000` for API calls. For full functionality, the backend should be deployed separately (e.g., on Heroku, Railway, or Render) and the API base URL should be updated in the frontend configuration.

## Conclusion

This MERN stack blog application demonstrates a complete full-stack integration with user authentication, CRUD operations, file uploads, and a modern React frontend. The project follows best practices for code organization, error handling, and security.

---

**Project Author**: J. Njoroge  
**Date**: November 2025  
**Technology Stack**: MERN (MongoDB, Express.js, React.js, Node.js)

---
### Screenshots
![alt text](image.png)
![alt text](image-1.png)