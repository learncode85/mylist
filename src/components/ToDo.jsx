import {useState, useEffect } from "react";

const ToDo = () => {

    const [todos, setTodos] = useState (() => {
        const storeTodos = localStorage.getItem('todos');
        return storeTodos ? JSON.parse(storeTodos) : [];
    })

  // state for storing new todo input value
  const [newTodo, setNewTodo] = useState("");

  // handle input change
    const handleChange = (event) => {
        setNewTodo(event.target.value);
    }

    // handle Form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (newTodo.trim() === "") return; 
        setTodos([...todos, newTodo]);  
        setNewTodo("");
    }

    // Handle Delete function
    const handleDelete = (index) => {
      const updateTodos = todos.filter((todos, i) => i !== index);
      setTodos(updateTodos);

    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
    <div>
      <h1>My To-Do List</h1>  
      <form onSubmit={handleSubmit}>
        <input type ="text" placeholder ='Say something' value={newTodo} onChange={handleChange} />
        <button type='submit'>Add</button>
        </form>
        <ul>
            {/* Display todos */}
            {todos.map((todo, index) =>(
              <p key={index}>{todo}

                <button onClick={() => handleDelete(index)}> Delete</button>
              </p>
            ))}
            
        </ul>
    </div>
  )
}

export default ToDo;
