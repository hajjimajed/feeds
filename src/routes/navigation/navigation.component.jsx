import { Link, Outlet } from 'react-router-dom';


const Navigation = () => {

    return (
        <>
            <div>
                <Link to='/feeds'>feed</Link>
                <Link to='/create-feed'>create feed</Link>
                <Link to='/signup'>signup</Link>
                <Link to='/login'>login</Link>
            </div>
            <Outlet />
        </>
    )

}

export default Navigation;