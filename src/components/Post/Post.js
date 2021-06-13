import '../Post/Post.css';
import { Link } from 'react-router-dom';

const Post = (props) => (
    <div className="post">
        <h2 id="user">{props.post.user.displayName}</h2>
        <a id="title" href={props.post.link}>{props.post.title}</a>
        <p id="rating">{props.post.rating}</p>
        <p id="notes">{props.post.notes}</p>
     { (!!(props.user) && props.post.user.uid === props.user.uid) ?
            <>
                <Link className="edit" to={"/edit/" + props.post._id} onClick={()=> props.handleEdit(props.post._id)}>✏️</Link>
                <button onClick={() => props.handleDelete(props.post._id)}>🗑</button>
            </>
        : <></>}
    </div>
);

export default Post;