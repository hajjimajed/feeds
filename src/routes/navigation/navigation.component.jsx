import { NavLink, Outlet } from 'react-router-dom';
import './navigation.styles.scss';

const Navigation = () => {
    return (
        <>
            <div className='navigation-container'>
                <div className='navigation-section'>
                    <NavLink
                        className='navigation-link'
                        activeclassName='active'
                        to='/feeds'
                        exact
                    >
                        feeds
                    </NavLink>
                    <NavLink
                        className='navigation-link'
                        activeclassName='active'
                        to='/create-feed'
                    >
                        create feed
                    </NavLink>
                </div>
                <div className='navigation-section'>
                    <NavLink
                        className='navigation-link'
                        activeclassName='active'
                        to='/signup'
                    >
                        signup
                    </NavLink>
                    <NavLink
                        className='navigation-link'
                        activeclassName='active'
                        to='/login'
                    >
                        login
                    </NavLink>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
