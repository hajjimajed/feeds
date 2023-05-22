import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './navigation.styles.scss';
import { useContext, useEffect, useState } from 'react';

import { JwtTokenContext } from '../../contexts/jwt-token.context';
import { ReactComponent as HomeIcon } from '../../assets/home.svg'
import { ReactComponent as Register } from '../../assets/register.svg'
import { ReactComponent as NewFeed } from '../../assets/new-feed.svg'
import { ReactComponent as Login } from '../../assets/log-in.svg'
import { ReactComponent as Logout } from '../../assets/logout.svg'
import { ReactComponent as Feeds } from '../../assets/feeds.svg'
import { ReactComponent as Profile } from '../../assets/profile.svg'

const Navigation = () => {

    const { jwtToken, setJwtToken, setUserData } = useContext(JwtTokenContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtToken !== null) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [jwtToken]);

    const logout = () => {
        setJwtToken(null);
        localStorage.removeItem('token');
        setUserData(null);
        localStorage.removeItem('userData');
        navigate('/login')
    };

    useEffect(() => {
        setIsAuthenticated(jwtToken !== null);
    }, [location.pathname]);

    return (
        <>
            {
                isAuthenticated ? <>
                    <div className='navigation-container'>
                        <div className='navigation-section'>
                            <NavLink
                                className='navigation-link'
                                activeclassName='active'
                                to='/'
                                exact
                            >
                                <HomeIcon className='nav-icon'></HomeIcon>
                                home
                            </NavLink>
                            <NavLink
                                className='navigation-link'
                                activeclassName='active'
                                to='/feeds'
                                exact
                            >
                                <Feeds className='nav-icon'></Feeds>
                                feeds
                            </NavLink>
                            <NavLink
                                className='navigation-link'
                                activeclassName='active'
                                to='/create-feed'
                            >
                                <NewFeed className='nav-icon'></NewFeed>
                                create feed
                            </NavLink>
                        </div>
                        <div className='navigation-section'>
                            <NavLink
                                className='navigation-link'
                                activeclassName='active'
                                to='/profile'
                            >
                                <Profile className='nav-icon'></Profile>
                                profile
                            </NavLink>
                            <button className='navigation-link'
                                activeclassName='active'
                                onClick={logout}
                            >
                                <Logout className='log-icon'></Logout>
                                logout
                            </button>
                        </div>
                    </div>
                    <Outlet />
                </>
                    :
                    <>
                        <div className='navigation-container'>
                            <div className='navigation-section'>
                                <NavLink
                                    className='navigation-link'
                                    activeclassName='active'
                                    to='/'
                                    exact
                                >
                                    <HomeIcon className='nav-icon'></HomeIcon>
                                    home
                                </NavLink>
                            </div>
                            <div className='navigation-section'>
                                <NavLink
                                    className='navigation-link'
                                    activeclassName='active'
                                    to='/signup'
                                >
                                    <Register className='nav-icon'></Register>
                                    signup
                                </NavLink>
                                <NavLink
                                    className='navigation-link'
                                    activeclassName='active'
                                    to='/login'
                                >
                                    <Login className='log-icon'></Login>
                                    login
                                </NavLink>
                            </div>
                        </div>
                        <Outlet />
                    </>
            }
        </>
    );
};

export default Navigation;
