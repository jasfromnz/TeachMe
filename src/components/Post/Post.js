import '../Post/Post.css';
import { Link } from 'react-router-dom';

const Post = (props) => (
    <div className="post">
        <div className="user">
            <img src={props.post.user.photoURL} alt=""></img>
            <h2 id="name">{props.post.user.displayName}</h2>
        </div>
        <div className="body">
            <div className="content">
                <h1 id="title">{props.post.title}</h1>
                {/* {!props.post.link.slice(50) ? props.post.link : props.post.link.slice(0,50)+"..."} */}
                <p id="rating">{'⭐'.repeat(props.post.rating)}</p>
                <p id="notes">{props.post.notes}</p>
                <a id="link" href={props.post.link}>Go To Link ➡</a>
            </div>
     { (!!(props.user) && props.post.user.uid === props.user.uid) ?
            <div id="buttons">
                <Link id="edit" to={"/edit/" + props.post._id} onClick={()=> props.handleEdit(props.post._id)}>✏️</Link>
                <button id="delete" onClick={() => props.handleDelete(props.post._id)}>🗑</button>
            </div>
        : <></>}
        </div>
    </div>
);

export default Post;