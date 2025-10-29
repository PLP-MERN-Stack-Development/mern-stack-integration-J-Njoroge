import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { postService, categoryService } from '../services/api';
import { usePosts } from '../context/PostContext';

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, setPosts } = usePosts();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [categories, setCategories] = React.useState([]);
  const isEdit = !!id;

  useEffect(() => {
    (async () => {
      const [catRes, postRes] = await Promise.all([
        categoryService.getAllCategories(),
        isEdit ? postService.getPost(id) : null,
      ]);
      setCategories(catRes);
      if (isEdit && postRes) {
        const p = postRes;
        setValue('title', p.title);
        setValue('content', p.content);
        setValue('category', p.category?._id || '');
      }
    })();
  }, [id, isEdit, setValue]);

  const onSubmit = async (data) => {
    const form = new FormData();
    form.append('title', data.title);
    form.append('content', data.content);
    form.append('category', data.category);
    if (data.image[0]) form.append('image', data.image[0]);

    let res;
    if (isEdit) {
      res = await postService.updatePost(id, form);
      setPosts(posts.map((p) => (p._id === id ? res : p)));
    } else {
      res = await postService.createPost(form);
      setPosts([res, ...posts]);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Create'} Post</h2>

      <input
        {...register('title', { required: 'Title required' })}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />
      {errors.title && <p className="text-red-600">{errors.title.message}</p>}

      <textarea
        {...register('content', { required: 'Content required' })}
        placeholder="Content"
        rows="8"
        className="w-full border p-2 rounded"
      />
      {errors.content && <p className="text-red-600">{errors.content.message}</p>}

      <select
        {...register('category')}
        className="w-full border p-2 rounded"
      >
        <option value="">-- No category --</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        {...register('image')}
        className="w-full"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isEdit ? 'Update' : 'Create'}
      </button>
    </form>
  );
}