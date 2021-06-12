import Posts from '../components/Posts/Posts';

const UserPage = (props) => {
    function getUserPosts(posts, userId) {
        let userPosts = [];
        for (let i=0; i<posts.length; i++) {
            if(posts[i].uid === userId) {
                userPosts.push(posts[i]);
            }
        }
        return userPosts;
    };

    console.log(props.user)
    let userPosts = getUserPosts(props.posts, props.user.uid)
    
    return (
        <Posts 
            posts={userPosts}
            handleEdit={props.handleEdit}
            handleDelete={props.handleDelete}
        />
    )
}

export default UserPage;