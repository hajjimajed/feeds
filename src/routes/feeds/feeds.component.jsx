import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SinglePost from "../../components/single-post/single-post.component";
import "./feeds.styles.scss"; // Import the CSS file for component-specific styles

const Feeds = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/feed/posts?page=${currentPage}`)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data.posts);
                setTotalItems(data.totalItems);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page.selected + 1);
    };

    return (
        <div>
            {posts.map((post) => {
                return <SinglePost key={post._id} post={post} />;
            })}
            <ReactPaginate
                pageCount={Math.ceil(totalItems / 2)} // Assuming 2 items per page
                pageRangeDisplayed={3} // Number of page links to display
                marginPagesDisplayed={1} // Number of page links to display at the beginning and end
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default Feeds;
