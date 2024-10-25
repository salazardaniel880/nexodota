// src/components/PostsList.js
import React, { useEffect, useState } from 'react';

// Datos de ejemplo
const examplePosts = [
  {
    id: 1,
    titulo: { rendered: 'Primer Post' },
    contenido: { rendered: '<p>Este es el contenido del primer post.</p>' },
    likes: 0,
    comentario_id: [],
  },
  {
    id: 2,
    titulo: { rendered: 'Segundo Post' },
    contenido: { rendered: '<p>Este es el contenido del segundo post.</p>' },
    likes: 0,
    comentario_id: [],
  },
];

const PostsList = () => {
  const [posts, setPosts] = useState(examplePosts);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [commentData, setCommentData] = useState({ postId: null, text: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(examplePosts);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCommentChange = (e) => {
    setCommentData({ ...commentData, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPost) {
      // Edit post
      setPosts(posts.map(post => (post.id === currentPost.id ? { ...post, titulo: { rendered: formData.title }, contenido: { rendered: formData.content } } : post)));
    } else {
      // Create new post
      const newPost = {
        id: posts.length + 1,
        titulo: { rendered: formData.title },
        contenido: { rendered: formData.content },
        likes: 0,
        comentario_id: [],
      };
      setPosts([...posts, newPost]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', content: '' });
    setCurrentPost(null);
    setFormVisible(false);
  };

  const editPost = (post) => {
    setCurrentPost(post);
    setFormData({ title: post.titulo.rendered, content: post.contenido.rendered });
    setFormVisible(true);
  };

  const addComment = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = { text: commentData.text };
        return { ...post, comentario_id: [...post.comentario_id, newComment] };
      }
      return post;
    }));
    setCommentData({ postId: null, text: '' }); // Reset comment input
  };

  const likePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  if (loading) {
    return <p>Cargando publicaciones...</p>;
  }

  return (
    <div>
      <h1>Publicaciones del Blog</h1>
      <button onClick={() => setFormVisible(true)}>Crear Post</button>
      {formVisible && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Título"
            required
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Contenido"
            required
          />
          <button type="submit">{currentPost ? 'Modificar Post' : 'Crear Post'}</button>
          <button type="button" onClick={resetForm}>Cancelar</button>
        </form>
      )}
      <ul>
        {posts.map(post => (
          <li key={post.id} className="p-6 text-gray-800 dark:text-gray-100 aos-flip-up bg-grey-100">
            <h2>{post.titulo.rendered}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.contenido.rendered }} />
            <div>
              <button onClick={() => likePost(post.id)}>Me gusta ({post.likes})</button>
              <button onClick={() => editPost(post)}>Editar</button>
            </div>
            <div>
              <h3>Comentarios:</h3>
              <ul>
                {post.comentario_id.map((comment, index) => (
                  <li key={index}>{comment.text}</li>
                ))}
              </ul>
              <input
                type="text"
                value={commentData.postId === post.id ? commentData.text : ''}
                onChange={handleCommentChange}
                placeholder="Agregar un comentario"
              />
              <button onClick={() => { setCommentData({ ...commentData, postId: post.id }); addComment(post.id); }}>Comentar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;