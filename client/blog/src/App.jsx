import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import Nav from './components/Nav';
import PostList from './pages/PostList';
import SinglePost from './pages/SinglePost';
import PostForm from './pages/PostForm';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Router basename="/mern-stack-integration-J-Njoroge">
          <Nav />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/posts/:id" element={<SinglePost />} />
              <Route path="/create" element={<PostForm />} />
              <Route path="/edit/:id" element={<PostForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
}