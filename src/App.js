import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import Form from './components/Form/Form';
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [state, setState] = useState({
    posts: [{
      user: "jasmine",
      title: "My First Post",
      link: "https://www.codecademy.com/",
      rating: 3,
      notes: "This is my first resource!"
    }],
    newPost: {
      user: "",
      title: "",
      link: "",
      rating: 5,
      notes: ""
    },
    editMode: false
  });

  useEffect(() => {
    function getAppData() {
      fetch('http://localhost:3001/api/posts')
      .then(res => res.json())
      .then(data => 
        setState(prevState => ({
          ...prevState,
          posts: data
        }))
      ).catch(err => console.log(err))
    }
    getAppData();
  }, []);

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
    e.preventDefault();

    if (state.editMode) {
      const {_id, user, title, link, rating, notes} = state.newPost;
      try {
        const posts = await fetch(`http://localhost:3001/api/posts/${_id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify({user, title, link, rating, notes})
        }).then(res => res.json());

        setState({
          posts,
          newPost: {
            user: "",
            title: "",
            link: "",
            rating: 5,
            notes: ""
          },
          editMode: false
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const post = await fetch('http://localhost:3001/api/posts', {
          method: 'POST',
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify(state.newPost)
        })
        .then(res => res.json());

        setState({
          posts: [...state.posts, post],
          newPost: {
            user: "",
            title: "",
            link: "",
            rating: 5,
            notes: ""
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleEdit(id) {
    const postToEdit = state.posts.find(post => post._id === id);
    setState(prevState => ({
      ...prevState,
      newPost: postToEdit,
      editMode: true,
    }));
  }

  async function handleDelete(id) {
    try {
      const posts = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'DELETE'
      }).then(res => res.json());
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
      <Header />
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
    </div>
  );
}

export default App;
