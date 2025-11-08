import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postService, categoryService } from '../services/api';
import { usePosts } from '../context/PostContext';

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, setPosts } = usePosts();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isEdit = !!id;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [catRes, postRes] = await Promise.all([
          categoryService.getAllCategories(),
          isEdit ? postService.getPost(id) : null,
        ]);
        setCategories(catRes || []);
        if (isEdit && postRes) {
          const p = postRes;
          setValue('title', p.title);
          setValue('content', p.content);
          setValue('category', p.category?._id || '');
        }
      } catch (err) {
        console.error('Error loading form data:', err);
        setError('Failed to load form data');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const form = new FormData();
      form.append('title', data.title);
      form.append('content', data.content);
      if (data.category) form.append('category', data.category);
      if (data.image && data.image[0]) form.append('image', data.image[0]);

      let res;
      if (isEdit) {
        res = await postService.updatePost(id, form);
        setPosts(posts.map((p) => (p._id === id ? res : p)));
      } else {
        res = await postService.createPost(form);
        setPosts([res, ...posts]);
      }
      navigate('/');
    } catch (err) {
      console.error('Error submitting post:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.errors?.[0]?.msg || 
                          err.message || 
                          'Failed to save post';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && categories.length === 0) {
    return <div className="container"><p>Loading...</p></div>;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {isEdit ? 'Edit' : 'Create'} Post
        </h2>

        {error && (
          <div style={{ 
            background: '#fee', 
            border: '1px solid #fcc', 
            color: '#c33', 
            padding: '0.75rem', 
            borderRadius: '6px' 
          }}>
            {error}
          </div>
        )}

        <div>
          <input
            {...register('title', { required: 'Title is required' })}
            placeholder="Post Title"
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', marginBottom: '0.5rem' }}
          />
          {errors.title && <p style={{ color: '#c33', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.title.message}</p>}
        </div>

        <div>
          <textarea
            {...register('content', { required: 'Content is required' })}
            placeholder="Write your post content here..."
            rows="10"
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', marginBottom: '0.5rem', minHeight: '200px' }}
          />
          {errors.content && <p style={{ color: '#c33', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.content.message}</p>}
        </div>

        <div>
          <select
            {...register('category')}
            disabled={loading}
            style={{ width: '100%', padding: '0.75rem', marginBottom: '0.5rem' }}
          >
            <option value="">-- No category --</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
            Featured Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            {...register('image')}
            disabled={loading}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button
            type="submit"
            disabled={loading}
            className="primary"
            style={{ 
              padding: '0.75rem 1.5rem', 
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            disabled={loading}
            style={{ 
              padding: '0.75rem 1.5rem', 
              background: '#e5e7eb', 
              color: '#374151', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}