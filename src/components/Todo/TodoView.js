import React from "react";
import { arrayOf, shape, number, string } from "prop-types";

import "./TodoViewStyles.css";

const TodoView = ({ 
    todoList,
    handleDeleteTodo,
    handleEditTodo,
    handleUpdateTodo,
    handleEditInputChange,
    editValue,
    disableButtons
}) => {
    return (
        <ul>
            {todoList.map(({ id, todo, isEditing }) => {
                return (
                <li key={id}>
                    {isEditing ? (
                        <input
                            type="text"
                            name="editValue"
                            value={editValue}
                            onChange={handleEditInputChange}
                        />
                    ) : (
                        <span>{todo}</span>
                    )}
                    
                    {isEditing ? (
                        <span
                            className={`todo-button edit-button`}
                            onClick={() => handleUpdateTodo()}
                        >Update
                        </span>
                    ) : (
                        <span 
                            className={`todo-button edit-button 
                                ${disableButtons ? "disabled" : ""}`}
                            onClick={() => handleEditTodo(id)}
                        >Edit
                        </span>
                    )}

                    
                    <span 
                        className={`todo-button delete-button 
                            ${disableButtons ? "disabled" : ""}`} 
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