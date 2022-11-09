import Todo from "../models/todoModels.js";


export const addTodo = async(req, res) => {
    try {
        const newTodo = new Todo({
            todo: req.body.todo,
            user: req.body.user
        })
        const todo = await newTodo.save();
        res.send({ 
            todo: todo.todo,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt
         });
    } catch (error) {
        console.log(error)
    }
}

export const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find({ user: req.user })
        res.send(todos);
    } catch (err) {
        console.log(err);
    }
}

export const delTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if(todo) {
        await todo.remove();
        res.send({ message: 'Todo deleted'})
    }
    else {
        res.send({ message: 'Not found'})
    }
}

export const doneTodo = async(req, res) => {
    console.log(req.params.id);
    const todo = await Todo.findById(req.params.id);
    if(todo) {
        todo.isDone = true;
        await todo.save();
        res.send(todo);
    }
    else {
        res.send({ message: 'Not found'})
    }
}

export const deleteAll = async (req, res) => {
    try {
        await Todo.remove({ user: req.user});
    } catch (error) {
        res.send({ message: 'Unable to delete' });
    }
    
}