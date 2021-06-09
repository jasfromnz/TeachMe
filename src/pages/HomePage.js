import Posts from '../components/Posts/Posts';

const HomePage = (props) => {
    return (
        <Posts 
            posts={props.posts}
            handleEdit={props.handleEdit}
            handleDelete={props.handleDelete}
        />
    )
}

export default HomePage;