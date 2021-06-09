import Post from '../Post/Post';

const Posts = (props) => {
    return (
        <div className="posts">
            {props.posts.map((post, idx) => (
                <Post
                    post={post}
                    key={idx}
                    handleEdit={props.handleEdit}
                    handleDelete={props.handleDelete}
                />
            ))}
        </div>
    )
}


export default Posts;