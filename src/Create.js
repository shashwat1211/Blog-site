import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Create = () => {
    const [title ,setTitle] = useState('');
    const [body ,setBody] = useState('');
    const [author, setAuthor] = useState('mario')
    const [isPending , setIsPending] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault()
        const blog = {title,body,author}
        setIsPending(true);
        fetch("http://localhost:8000/blogs" , {
            method:"POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(blog)
        })
        .then(()=>{
            console.log(blog);
            setIsPending(false);
            navigate('/');
        })
    }
    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required />
                <label>Blog Content</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required>
                </textarea>
                <label>Blog Author</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="luigi">luigi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
                
            </form>
        </div>
     );
}
 
export default Create;