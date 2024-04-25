import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../Editor';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); 
  const [cover, setCover] = useState(''); 
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5001/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setCover(postInfo.cover); 
        });
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    if (file) {
      data.append('file', file); 
    }

    try {
      const response = await fetch(`http://localhost:5001/post/${id}`, {
        method: 'PUT',
        body: data,
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        console.error('Failed to update post:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="text"
        name="summary"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input
        type="file"
        name="file"
        onChange={(ev) => setFile(ev.target.files[0])} 
      />
      <Editor onChange={setContent} value={content} />
      <button type="submit" style={{ marginTop: '5px' }}>Update Post</button>
    </form>
  );
}
