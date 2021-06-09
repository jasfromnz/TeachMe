const Form = (props) => {
    return (
        <div className="form">
            <form onSubmit={props.handleSubmit}>
                <label>
                <span>USER</span>
                <input name="user" value={props.newPost.user} onChange={props.handleChange}/>
                </label>
                <label>
                <span>TITLE</span>
                <input name="title" value={props.newPost.title} onChange={props.handleChange}/>
                </label>
                <label>
                <span>LINK</span>
                <input name="link" value={props.newPost.link} onChange={props.handleChange}/>
                </label>
                <label>
                <span>RATING</span>
                <input name="rating" value={props.newPost.rating} onChange={props.handleChange}/>
                </label>
                <label>
                <span>NOTES</span>
                <input name="notes" value={props.newPost.notes} onChange={props.handleChange}/>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Form;