import './App.css';
import { Routes, Route } from 'react-router-dom'

import Navigation from './routes/navigation/navigation.component';
import Feeds from './routes/feeds/feeds.component';
import CreateFeed from './routes/create-feed/create-feed.component';
import PostDetails from './routes/post-details/post-details';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/feeds' element={<Feeds />}></Route>
        <Route path='/create-feed' element={<CreateFeed />}></Route>
        <Route path='/post/:_id' element={<PostDetails />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
