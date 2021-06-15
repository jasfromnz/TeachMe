import './Form.css';

const Form = (props) => {
    return (
        <div className="form">
            <form onSubmit={props.handleSubmit}>
                <label>
                    <span>TITLE</span>
                    <input name="title" value={props.newPost.title} onChange={props.handleChange}/>
                </label>
                <label>
                    <span>LINK</span>
                    <input name="link" value={props.newPost.link} onChange={props.handleChange}/>
                </label>
                <div className="input-field">
                    <label className="rating">
                        <div id="span">
                        <span className="rating">RATING</span>
                        </div>
                        <select class="browser-default" name="rating" value={String(props.newPost.rating)} onChange={props.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                </div>
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