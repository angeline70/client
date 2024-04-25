import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        fetch(`http://localhost:5001/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                });
            });
    }, [id]);

    const handleDelete = async () => {
        try {
            // Send a DELETE request to delete the post
            const response = await fetch(`http://localhost:5001/post/${postInfo._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                // Post successfully deleted
                console.log('Post deleted successfully');
                // Navigate to the homepage
                navigate('/');
            } else {
                throw new Error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            // Display an error message to the user
            // setError('Failed to delete post. Please try again.');
        }
    };

    if (!postInfo) return null;

    const createdAtDate = new Date(postInfo.createdAt);
    const formattedDate = isNaN(createdAtDate.getTime()) ? '' : format(createdAtDate, 'MMM d, yyyy HH:mm');

    return (
        <div className='post-page'>
            <h1>{postInfo.title}</h1>
            {formattedDate && <time>{formattedDate}</time>}
            <div className='edit-row'>
                <Link className='edit-btn' to={`/edit/${postInfo._id}`}>Edit</Link>
                <button className='delete-btn' onClick={handleDelete}>Delete</button>
            </div>
            <div className="image">
                <img src={`http://localhost:5001/${postInfo.cover}`} alt={postInfo.title} />
            </div>
            <div className='content' dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    );
}
