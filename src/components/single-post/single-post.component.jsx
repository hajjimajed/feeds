import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import './single-post.styles.scss'

import { JwtTokenContext } from "../../contexts/jwt-token.context";

import Button from '../../components/button/button.component'

const SinglePost = ({ post }) => {

    const { _id, title, content, imageUrl, creator } = post;

    const image = `http://localhost:8080/${imageUrl}`;

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { jwtToken } = useContext(JwtTokenContext);

    const navigate = useNavigate();

    const handleDelete = () => {
        // Code to delete the post
        fetch(`http://localhost:8080/feed/post/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + jwtToken
            }
        })
            .then(response => {
                if (response.ok) {
                    setSuccessMessage('Post deleted');
                } else {
                    throw new Error('Delete request failed');
                }
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    const postNavigate = () => {
        navigate(`/post/${_id}`);
    }

    const postUpdate = () => {
        navigate(`/post/edit/${_id}`);
    }

    return (
        <>
            <div className="post">
                <div className="creator">
                    <div>
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
                    </div>
                    <div>
                        <h1>{creator.name}</h1>
                        <p>{creator.status}</p>
                    </div>
                </div>
                <div className="post-content">
                    <img src={image} alt="" />
                    <div className="post-content-infos">
                        <h2>{title}</h2>
                        <div></div>
                        <p>{content}</p>
                    </div>
                </div>
                <div className="buttons">
                    <Button type="button" buttonType='details' onClick={postNavigate}>Details</Button>
                    <Button type="button" buttonType='delete' onClick={handleDelete}>Delete</Button>
                    <Button type="button" onClick={postUpdate}>Update</Button>
                </div>
            </div>
        </>
    )

}

export default SinglePost;