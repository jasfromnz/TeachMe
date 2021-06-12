import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import Form from './components/Form/Form';
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import './App.css';
import { fetchPosts, createPost, updatePost, deletePost } from './services/api-service';

function App() {

  const [state, setState] = useState({
    posts: [],
    newPost: {
      title: "",
      link: "",
      rating: 5,
      notes: "",
      uid: ""
    },
    editMode: false
  });

  const [userState, setUserState] = useState({
    user: null,
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
    
    const unsubscribe = auth.onAuthStateChanged((user) => setUserState({ user }));
    
    // clean up function
    return function() {
      unsubscribe();
    }
  }, [userState.user]);

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
    if(!userState.user) return;
    
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
            uid: ""
          },
          editMode: false
        }));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const posts = await createPost(state.newPost, userState.user.uid);

        setState(prevState => ({
          ...prevState,
          posts,
          newPost: {
            title: "",
            link: "",
            rating: 5,
            notes: ""
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
      <Header user={userState.user} />
      <Route exact path='/'
        render={() => (
          <HomePage
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
      <Route path='/user'
        render={() => (
          <UserPage 
            user={userState.state}
            posts={state.posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      />
    </div>
  );
}

export default App;
