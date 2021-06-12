import Posts from '../components/Posts/Posts';

const UserPage = (props) => {
    function getUserPosts(posts) {
        let userPosts = [];
        for (let i=0;i<posts.length;i++) {
            if(posts[i].uid === props.user.uid) {
                userPosts.push(posts[i]);
            }
        }
    }
    return (
        <Posts 
            posts={getUserPosts(props.posts)}
            handleEdit={props.handleEdit}
            handleDelete={props.handleDelete}
        />
    )
}

export default UserPage;