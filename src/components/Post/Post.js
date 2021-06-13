import '../Post/Post.css';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

const Post = (props) => (
    <div className="post">
        <div className="user">
            <img src={props.post.user.photoURL} alt=""></img>
            <h2 id="name">{props.post.user.displayName}</h2>
        </div>
        <div className="body">
            <a id="title" href={props.post.link}>{props.post.title}</a>
            <p id="rating">{props.post.rating}</p>
            <p id="notes">{props.post.notes}</p>
        </div>
     { (!!(props.user) && props.post.user.uid === props.user.uid) ?
            <>
                <Link className="edit" to={"/edit/" + props.post._id} onClick={()=> props.handleEdit(props.post._id)}>✏️</Link>
                <button onClick={() => props.handleDelete(props.post._id)}>🗑</button>
            </>
        : <></>}
    </div>
);

export default Post;