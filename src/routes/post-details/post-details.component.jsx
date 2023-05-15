import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const PostDetails = () => {
    const { _id } = useParams();
    const [post, setPost] = useState(null);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    console.log(_id)

    useEffect(() => {
        fetch(`http://localhost:8080/feed/post/${_id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setPost(data.post);
            })
            .catch(err => console.log(err))
    }, [_id]);


    const navigate = useNavigate();
    const handleDelete = () => {
        // Code to delete the post
        fetch(`http://localhost:8080/feed/post/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    setSuccessMessage('Post deleted');
                    navigate('/feeds');
                } else {
                    throw new Error('Delete request failed');
                }
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };



    if (!post) {
        return (
            <>
                <p>loading...</p>
            </>
        )
    }
    else {

        const imageUrl = `http://localhost:8080/${post.imageUrl}`;
        return (
            <>
                <h1>Post Details</h1>
                <h2>{post.title}</h2>
                <img src={imageUrl} alt="" />
                <p>{post.content}</p>
                <h3>{post.creator.name}</h3>

                <Link to={`/post/edit/${_id}`}>edit post</Link>
                <button type="button" onClick={handleDelete}>Delete</button>
            </>
        );
    }
};

export default PostDetails;