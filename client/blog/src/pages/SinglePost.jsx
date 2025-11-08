import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postService, commentService } from '../services/api';

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const p = await postService.getPost(id);
        setPost(p);
        const c = await commentService.getComments(id);
        setComments(c || []);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) load();
  }, [id]);

  const addComment = async (e) => {
    e?.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await commentService.addComment({ post: id, content: newComment });
      setComments([res, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <Link to="/" className="text-blue-600">← Back to posts</Link>
      <h1 className="text-2xl font-bold mt-2">{post.title}</h1>
      <p className="text-sm text-gray-600">{post.category?.name}</p>
      <div className="mt-4">{post.content}</div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Comments</h2>
        <form onSubmit={addComment} className="mt-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
            placeholder="Write a comment..."
          />
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Add Comment</button>
        </form>

        <ul className="mt-4 space-y-3">
          {comments && comments.length ? (
            comments.map((c) => (
              <li key={c._id} className="border p-3 rounded">
                <p className="text-sm text-gray-700">{c.content}</p>
                <p className="text-xs text-gray-500">By {c.author?.username || 'Unknown'}</p>
              </li>
            ))
          ) : (
            <li>No comments yet.</li>
          )}
        </ul>
      </section>
    </div>
  );
}