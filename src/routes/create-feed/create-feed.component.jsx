import { useState } from "react";

const CreateFeed = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            title: title,
            content: content,
        };
        fetch("http://localhost:8080/feed/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreateFeed;
