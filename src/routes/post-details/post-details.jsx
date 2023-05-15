import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


const PostDetails = () => {
    const { _id } = useParams();
    const [post, setPost] = useState(null);

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

    console.log(post);

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
            </>
        );
    }
};

export default PostDetails;