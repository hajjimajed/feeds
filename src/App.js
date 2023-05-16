import './App.scss';
import { Routes, Route } from 'react-router-dom'

import Navigation from './routes/navigation/navigation.component';
import Feeds from './routes/feeds/feeds.component';
import CreateFeed from './routes/create-feed/create-feed.component';
import PostDetails from './routes/post-details/post-details.component';
import EditPost from './routes/edit-post/edit-post.component';

import Signup from './routes/signup/signup.component';
import Login from './routes/login/login.component';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/feeds' element={<Feeds />}></Route>
        <Route path='/create-feed' element={<CreateFeed />}></Route>
        <Route path='/post/:_id' element={<PostDetails />}></Route>
        <Route path='/post/edit/:_id' element={<EditPost />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
