import '../Post/Post.css';
import { Link } from 'react-router-dom';

const Post = (props) => (
    <div className="post">
        <h2 id="user">{props.post.user}</h2>
        <a id="title" href={props.post.link}>{props.post.title}</a>
        <p id="rating">{props.post.rating}</p>
        <p id="notes">{props.post.notes}</p>
        <Link className="edit" to={"/add/" + props.post._id} onClick={()=> props.handleEdit(props.post._id)}>✏️</Link>
    </div>
);

export default Post;