import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await authService.register(data);
      await login(data);
      navigate('/');
    } catch (e) {
      alert('Registration failed');
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