import React from "react";
import { arrayOf, shape, number, string } from "prop-types";
import Span from "../shared/Span";

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
                        // <span
                        //     className={`todo-button edit-button`}
                        //     onClick={() => handleUpdateTodo()}
                        // >Update
                        // </span>
                        <Span
                            value={"Update"}
                            onClick={handleUpdateTodo}
                            className={`todo-button edit-button`}
                        />
                    ) : (
                        // <span 
                        //     className={`todo-button edit-button 
                        //         ${disableButtons ? "disabled" : ""}`}
                        //     onClick={() => handleEditTodo(id)}
                        // >Edit
                        // </span>
                        <Span
                            value={"Edit"}
                            id={id}
                            onClick={handleEditTodo}
                            className={`todo-button edit-button`}
                            disabledClass={"disabled"}
                            disabledButton={disableButtons}
                        />
                    )}

                    
                    {/* <span 
                        className={`todo-button delete-button 
                            ${disableButtons ? "disabled" : ""}`} 
                        onClick={() => handleDeleteTodo(id)}
                    >Delete
                    </span> */}
                    <Span
                        value={"Delete"}
                        id={id}
                        onClick={handleDeleteTodo}
                        className={`todo-button delete-button`}
                        disabledClass={"disabled"}
                        disabledButton={disableButtons}
                    />
                </li>
                )
            })}
        </ul>
    )
}

export default TodoView;