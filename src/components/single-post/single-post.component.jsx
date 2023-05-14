



const SinglePost = ({ post }) => {

    const { title, content, imageUrl, creator } = post;

    return (
        <>
            <h1>feeds</h1>
            <section className="single-post">
                <h1>{title}</h1>
                <h2>{content}</h2>
                <img src={imageUrl} alt="" />

                <p>{creator.name}</p>
            </section>
        </>
    )

}

export default SinglePost;