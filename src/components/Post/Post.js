import '../Post/Post.css';

const Post = (props) => (
    <div className="post">
        <h2 id="user">{props.post.user}</h2>
        <a id="title" href={props.post.link}>{props.post.title}</a>
        <p id="rating">{props.post.rating}</p>
        <p id="notes">{props.post.notes}</p>
        <button className="edit" onClick={()=> props.handleEdit(props.post._id)}>✏️</button>
    </div>
);

export default Post;