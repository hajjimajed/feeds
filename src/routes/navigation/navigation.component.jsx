import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './navigation.styles.scss';
import { useContext, useEffect, useState } from 'react';

import { JwtTokenContext } from '../../contexts/jwt-token.context';

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
                                home
                            </NavLink>
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
                                to='/profile'
                            >
                                profile
                            </NavLink>
                            <button className='navigation-link'
                                activeclassName='active'
                                onClick={logout}
                            >
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
                                    home
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
            }
        </>
    );
};

export default Navigation;
