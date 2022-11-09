import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
    {
        todo : { type: String, required: true},
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isDone: { type: Boolean, default: false }
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model('todo', todoSchema);
export default Todo;