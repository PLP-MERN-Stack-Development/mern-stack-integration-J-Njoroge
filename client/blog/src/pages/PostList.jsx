import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postService, categoryService } from '../services/api';
import { usePosts } from '../context/PostContext';

export default function PostList() {
  const { posts, setPosts } = usePosts();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, catsData] = await Promise.all([
          postService.getAllPosts(page, 10, search, category),
          categoryService.getAllCategories(),
        ]);
        setPosts(postsData.posts || postsData);
        setTotalPages(postsData.totalPages || 1);
        setCategories(catsData || []);
      } catch (err) {
        console.error('Failed to load posts', err);
      }
    };
    fetchData();
  }, [page, search, category, setPosts]);

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="border p-2 rounded flex-1"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      <ul className="space-y-4">
        {posts && posts.length ? (
          posts.map((p) => (
            <li key={p._id} className="border p-4 rounded">
              <Link to={`/posts/${p._id}`} className="text-xl font-semibold text-blue-600">
                {p.title}
              </Link>
              <p className="text-sm text-gray-600">{p.category?.name}</p>
              <p className="mt-2 text-gray-800">{p.content?.slice(0, 200)}{p.content && p.content.length > 200 ? '...' : ''}</p>
            </li>
          ))
        ) : (
          <li>No posts found.</li>
        )}
      </ul>

      <div className="mt-4 flex items-center gap-2">
        <button onClick={() => setPage((s) => Math.max(1, s - 1))} disabled={page === 1} className="px-3 py-1 border rounded">Prev</button>
        <span>Page {page} / {totalPages}</span>
        <button onClick={() => setPage((s) => Math.min(totalPages, s + 1))} disabled={page === totalPages} className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  );
}