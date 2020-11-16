import React from "react";
import { arrayOf, shape, number, string } from "prop-types";

import "./TodoViewStyles.css";

const TodoView = ({ todoList, handleDeleteTodo }) => {
    return (
        <ul>
            {todoList.map(({ id, todo }) => {
                return (
                <li key={id}>
                    <span>{todo}</span>
                    <span className="todo-button edit-button">Edit</span>
                    <span 
                        className="todo-button delete-button" 
                        onClick={() => handleDeleteTodo(id)}
                    >Delete
                    </span>
                </li>
                )

            })}
        </ul>
    )
}

export default TodoView;