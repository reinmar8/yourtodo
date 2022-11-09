import React, { useContext, useEffect, useState, useReducer } from 'react';
import './HomePage.css';
import { MdDelete, MdCheckBox } from 'react-icons/md';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';



const reducer = (state, action) => {
  switch (action.type) {
    case 'DONE_REQUEST' : {
      return {...state , isDoneLoading: true }
    }
    case 'DONE_SUCCESS' : {
      return {...state , isDoneLoading: false }
    }
    default:
      return state;
  }
}


const HomePage = () => {
  const [ todo, setTodo ] = useState('');
  const [ todos, setTodos ]= useState([]);
  const navigate = useNavigate();

  const [  { isDoneLoading } , dispatch ] = useReducer(reducer, {
      isDoneLoading: false
    });
  
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if(!userInfo) {
      navigate('/');
    }
  },[userInfo, navigate])

  const fetchTodos = async() => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/todos/gettodo',
        {
          headers: { authorization: `Bearer ${userInfo.token}` }
        }
      );
      console.log('render')
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTodos();
    console.log('render');
    dispatch({ type: 'DONE_SUCCESS' })
  },[isDoneLoading])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'DONE_REQUEST' })
      const { data } = await axios.post('http://localhost:5000/api/todos/addtodo', 
        {
          todo,
          user: userInfo._id
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` }
        }
      );
      setTodo('');
    } catch (error) {
      toast.error(getError(error));
    }
  }

  const deleteHandler = async (todo) => {
    try {
      dispatch({ type: 'DONE_REQUEST' })
      await axios.delete(`http://localhost:5000/api/todos/${todo._id}`, 
        { 
          headers: { authorization: `Bearer ${userInfo.token}` } 
        }
      );
      toast.success('Deleted Successfully');
    } catch (error) {
      toast.error(getError(error))
    }
  }

  const doneHandler = async (todo) => {
    try {
      dispatch({ type: 'DONE_REQUEST' })
      const { data } = await axios.put(`http://localhost:5000/api/todos/${todo._id}`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` } 
        }
      );
    } catch (error) {
      toast.error(getError(error))
    }
  }

  const deleteAllHandler = async () => {
    if(window.confirm('Are you sure you want to delete all?')) {
      try {
        dispatch({ type: 'DONE_REQUEST' });
        await axios.delete(`http://localhost:5000/api/todos/all`, 
          { 
            headers: { authorization: `Bearer ${userInfo.token}` } 
          }
        );
        toast.success('Deleted All Todos');

      } catch (error) {
        toast.error(getError(error))
      }
    }
    
  }
 

  return (
    <div className='todo-container'>
        <div className='todolist'>
            <form onSubmit={submitHandler}>
              <input type='text' value={todo} onChange={(e) => setTodo(e.target.value)}/>
              <input type='submit' value='Add Todo' className='submit-btn'/>
            </form>
            <div className='todo-heading'>
                Your Todo
            </div>
            <ul>
                {
                  todos.length > 0 ? todos.map((todo, index) => (
                    <li key={todo._id} className={index == todos.length - 1 ? 'last-item' : ''}>
                      <div className='todo-item'>
                        {
                          todo.isDone && <MdCheckBox size={20} style={{color: 'green'}}/>
                        }
                        <p className={todo.isDone ? 'done' : ''}>{todo.todo}</p>
                      </div>
                      
                      <div className='btn-groups'>
                        {
                          !todo.isDone && <MdCheckBox size={20} style={{color: 'green', cursor: 'pointer'}} onClick={() => {doneHandler(todo)}}/>
                        }
                        
                        {''}
                        <MdDelete size={20} style={{color: 'red', cursor: 'pointer'}} onClick={() => {deleteHandler(todo)}}/>
                      </div>
                    </li>
                  )) : (
                    <div className='alert'>
                      You Have No Todos
                    </div>
                  )
                }
            </ul>
            <button className='del-btn' onClick={() => {deleteAllHandler()}}>Delete All</button>
            
        </div>
    </div>
  )
}

export default HomePage