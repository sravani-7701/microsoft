import React,{useState,useContext,useEffect} from 'react'
import {UserDetails} from '../Home/Home'
import './Todo.css'
var Loader = require('react-loader');
function Todo() {
  const user=useContext(UserDetails);
  const[loader,setloader] =useState(true);
  var userid;
  if(user &&user._id){
   userid = user._id.toString();
  }
  console.log(userid)
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
		setloader(false);
		fetch('/todos/'+userid)
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));
			setloader(true)
	}

	const completeTodo = async id => {
		setloader(false);
		const data = await fetch('/todo/complete/' + id).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.complete = data.complete;
			}

			return todo;
		}));
		setloader(true)
	}

	const addTodo = async () => {
		setloader(false);
		const data = await fetch( "/todo/"+userid, {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				text: newTodo
			})
		}).then(res => res.json());

		setTodos([...todos, data]);

		setPopupActive(false);
		setNewTodo("");
		setloader(true);
	}

	const deleteTodo = async id => {
		setloader(false);
		const data = await fetch('/todo/' + id, { method: "DELETE" }).then(res => res.json());
		setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
		setloader(true);
	}

	return (
		<div>
			<Loader loaded={loader}/>
			<div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id} onClick={() => completeTodo(todo._id)}>
						<div className="checkbox"></div>

						<div className="text">{todo.text}</div>

						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<h1>You currently have no tasks</h1>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className="btntodo" onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
		</div>
	);
}

export default Todo;