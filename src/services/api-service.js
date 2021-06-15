const host = 'https://teachme-resources-backend.herokuapp.com/api/skills';

const BASE_URL = host + '/api/posts';

function fetchPosts() {
    return fetch(BASE_URL).then(res => res.json());
}       

function createPost(data, userInfo) {
  console.log(userInfo);
    return fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(
          {...data, 
            user: userInfo})
    })
    .then(res => res.json());
  }

function updatePost({_id, title, link, rating, notes}) {
    return fetch(BASE_URL + '/' + _id, {
        method: 'PUT',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify({title, link, rating, notes})
      }).then(res => res.json());
}

function deletePost(postId) {
    return fetch(BASE_URL + '/' + postId, {
        method: 'DELETE'
      }).then(res => res.json());
}

export {
    fetchPosts,
    createPost,
    updatePost,
    deletePost
}