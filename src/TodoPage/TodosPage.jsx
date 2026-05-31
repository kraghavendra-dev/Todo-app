import React, { useState, useEffect } from 'react'
import './TodosPage.css'

const TodosPage = () => {
    const [todos, setTodos] = useState(()=>{
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("All");
    
    useEffect(()=> {
       localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleAdd = () =>{
        const newTodo = {
            id: Date.now().toString(),
            text: inputValue,
            completed: false
        };
        setTodos([...todos, newTodo]);
        setInputValue("");
    };
   
    const toggleTodo = (id) =>{
       const updated = todos.map((todo)=>
        todo.id === id ? {...todo, completed: !todo.completed} : todo
       );
       setTodos(updated);
    };

    const handleDelete = (id) =>{
       const updatedTodo = todos.filter((todo)=> todo.id !== id);
       setTodos(updatedTodo);
    };

    const filteredTodos = todos.filter((todo) =>{
        if (filter === "Pending") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

  return (
    <div>
        <div className='title-container'>
            <h1>Todo Application</h1>
        </div>
        <div className='input-container'>
            <input
               type="text"
               placeholder='Enter task...'
               value={inputValue}
               onChange={(e)=>setInputValue(e.target.value)}
            
            />
            <div>
               <button className='addButton' disabled={!inputValue} onClick={handleAdd}>Add</button>
            </div>
            
        </div>
        <div className='dropdown'>
               <label>Filter:</label>
               <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="completed">Completed</option>
               </select>
        </div>
        <div className='todos-container'>
            {todos.length === 0 && <h2>No task is Added!</h2>}
            {
            filteredTodos.map((todo)=>(
                <div className='todo-item' key={todo.id}>
                    <div className='checkbox'>
                       <input
                       type="checkbox"
                       checked = {todo.completed}
                       onChange={()=>toggleTodo(todo.id)}
                       />
                    </div>
                    
                    <div className='todo'>
                       <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
                    </div>
                    

                    <button className='editButton'>Edit</button>
                    <button className='deleteButton' onClick={()=> handleDelete(todo.id)}>Delete</button>
                    
                </div>
                
            ))
            }
        </div>
    </div>
  )
}

export default TodosPage