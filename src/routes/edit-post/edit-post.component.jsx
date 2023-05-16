import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { JwtTokenContext } from "../../contexts/jwt-token.context";

const EditPost = () => {

    const { _id } = useParams();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { jwtToken } = useContext(JwtTokenContext);


    useEffect(() => {
        fetch(`http://localhost:8080/feed/post/${_id}`, {
            headers: {
                Authorization: 'Bearer ' + jwtToken
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setPost(data.post);
                setTitle(data.post.title);
                setContent(data.post.content);
                setImage(data.post.imageUrl);
            })
            .catch(err => console.log(err))
    }, [_id]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        fetch(`http://localhost:8080/feed/post/${_id}`, {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: 'Bearer ' + jwtToken
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to update the post.");
                }
                return response.json();
            })
            .then(data => {
                setSuccessMessage(data.message);
                setErrorMessage('');
            })
            .catch((err) => {
                setSuccessMessage("");
                setErrorMessage("An error occurred while updating the post.");
                console.log(err);
            });
    }


    return (
        <div>
            <h1>Edit Post</h1>
            {post ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            rows="4"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="image">Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept=".jpg,.png,.jpeg"
                            onChange={(event) => setImage(event.target.files[0])}
                        />
                    </div>
                    <button type="submit">Update Post</button>
                </form>
            ) : (
                <p>Loading post...</p>
            )}
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )

}

export default EditPost;