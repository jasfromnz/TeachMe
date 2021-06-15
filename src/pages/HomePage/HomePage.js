import Posts from '../../components/Posts/Posts';
import './HomePage.css';

const HomePage = (props) => {
    return (
        <Posts 
            posts={props.posts}
            handleEdit={props.handleEdit}
            handleDelete={props.handleDelete}
            user={props.user}
        />
    )
}

export default HomePage;