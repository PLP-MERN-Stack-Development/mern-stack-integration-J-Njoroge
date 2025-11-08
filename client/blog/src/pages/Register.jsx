import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await authService.register(data);
      // Registration already stores token in localStorage via authService
      // Update auth context state
      if (response.token) {
        setAuth(response.token, response.user);
        navigate('/');
      }
    } catch (e) {
      console.error('Registration error:', e);
      const errorMessage = e.response?.data?.message || 
                          e.response?.data?.errors?.[0]?.msg || 
                          e.message || 
                          'Registration failed';
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <input
        {...register('username', { required: true })}
        placeholder="Username"
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        {...register('password', { required: true, minLength: 6 })}
        placeholder="Password (min 6)"
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}