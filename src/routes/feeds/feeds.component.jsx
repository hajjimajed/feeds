import { useEffect, useState } from "react"

import SinglePost from "../../components/single-post/single-post.component";

const Feeds = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/feed/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data.posts);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    console.log(posts)

    return (
        <div>
            {
                posts.map(post => {
                    return <SinglePost post={post}></SinglePost>
                })
            }
        </div>
    )

}

export default Feeds;