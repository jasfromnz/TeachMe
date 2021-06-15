import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import UserPage from './pages/UserPage';
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';

import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import { fetchPosts, createPost, updatePost, deletePost } from './services/api-service';

import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

function App() {

  const [state, setState] = useState({
    posts: [],
    newPost: {
      title: "",
      link: "",
      rating: 5,
      notes: "",
      user: null,
    },
    editMode: false
  });

  useEffect(() => {
    async function getAppData() {
      try {
        const posts = await fetchPosts();
        setState(prevState => ({
          ...prevState,
          posts
        }));
      } catch(err) {
        console.log(err)
      }
    }
    getAppData();
    
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        setState((prevState) => ({
          ...prevState,
          user
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          user
        }));
      }
    });
    
    // clean up function
    return function() {
      unsubscribe();
    }
  }, [state.user]);

  function handleChange (e) {
    setState(prevState => ({
      ...prevState,
      newPost: {
        ...prevState.newPost,
        [e.target.name]: e.target.value
      }
    }));
  }

  async function handleSubmit (e) {
    if(!state.user) return;
    
    e.preventDefault();

    if (state.editMode) {
      try {
        const posts = await updatePost(state.newPost)

        setState(prevState => ({
          ...prevState,
          posts,
          newPost: {
            title: "",
            link: "",
            rating: 5,
            notes: "",
            user: null,
          },
          editMode: false
        }));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const posts = await createPost(state.newPost, state.user);

        setState(prevState => ({
          ...prevState,
          posts,
          newPost: {
            title: "",
            link: "",
            rating: 5,
            notes: "",
            user: null
          }
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }

  

  function handleEdit(postId) {
    const postToEdit = state.posts.find(post => post._id === postId);
    setState(prevState => ({
      ...prevState,
      newPost: postToEdit,
      editMode: true,
    }));
  }

  async function handleDelete(postId) {
    try {
      const posts = await deletePost(postId);
      setState(prevState => ({
        ...prevState,
        posts,
      }));
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="App">
      <Header user={state.user} />
      <Route exact path='/'
        render={() => (
          <HomePage
            posts={state.posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            user={state.user}
          />
        )}
      />
      <Route path='/user'
        render={(props) => (
          <UserPage
            {...props}
            user={state.user}
            posts={state.posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      />
      <Route path='/edit/:id'
        render={() => (
          <Form 
            newPost={state.newPost}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      />
      <Route exact path='/add'
        render={() => (
          <Form 
            newPost={state.newPost}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      />
      <Footer />
    </div>
  );
}

export default App;
