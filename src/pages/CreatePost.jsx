import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Navigate} from 'react-router-dom'
import Editor from '../Editor';


export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // Changed to single file state
  const [redirect, setRedirect] = useState(false)

  async function createNewPost(ev) {
    ev.preventDefault();
    
    // Get the token from local storage or state
    const token = localStorage.getItem('token'); // Example, adjust as needed
  
    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('file', file); // Appending the file to FormData
  
    try {
      const response = await fetch('http://localhost:5001/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      if (response.ok) {
        setRedirect(true);
      } else {
        throw new Error(`Failed to create post: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display error message to the user
    }
  }

  if(redirect){
   return <Navigate to={'/'}/>
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFile(ev.target.files[0])} /> {/* Use ev.target.files */}
      <Editor value={content} onChange={setContent}/>
      <button style={{ marginTop: '5px' }}>Create Post</button>
    </form>
  );
}
