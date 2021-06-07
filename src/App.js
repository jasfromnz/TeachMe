import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
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

    console.log('submitted!')

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
  }

  function handleEdit(id) {
    const postToEdit = state.posts.find(post => post._id === id);
    setState(prevState => ({
      ...prevState,
      newPost: postToEdit,
      editMode: true,
    }));
  }

  return (
    <div className="App">
      <Header />
      <Route exact path='/'
        render={() => (
          <HomePage
            posts={state.posts}
            handleEdit={handleEdit}
          />
        )}
      />
      <Route path='/add'
        render={() => (
          <form onSubmit={handleSubmit}>
            <label>
              <span>USER</span>
              <input name="user" value={state.newPost.user} onChange={handleChange}/>
            </label>
            <label>
              <span>TITLE</span>
              <input name="title" value={state.newPost.title} onChange={handleChange}/>
            </label>
            <label>
              <span>LINK</span>
              <input name="link" value={state.newPost.link} onChange={handleChange}/>
            </label>
            <label>
              <span>RATING</span>
              <input name="rating" value={state.newPost.rating} onChange={handleChange}/>
            </label>
            <label>
              <span>NOTES</span>
              <input name="notes" value={state.newPost.notes} onChange={handleChange}/>
            </label>
            <button>Submit</button>
          </form>
        )}
      />
    </div>
  );
}

export default App;
