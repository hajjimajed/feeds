import { useState } from "react";

const CreateFeed = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [errorMessages, setErrorMessages] = useState([]);


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);

        fetch("http://localhost:8080/feed/post", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Post created successfully!");
                } else {
                    return response.json(); // parse response body as JSON
                }
            })
            .then((responseData) => {
                if (responseData && responseData.errors) {
                    // update component state to display validation errors
                    const errors = responseData.errors.map((error) => error.msg);
                    setErrorMessages(errors);
                } else {
                    console.log("Post created successfully!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div>
            <div>
                {errorMessages.map((errorMessage) => (
                    <div key={errorMessage}>{errorMessage}</div>
                ))}
            </div>
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
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(event) => setImage(event.target.files[0])}
                    />
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreateFeed;
