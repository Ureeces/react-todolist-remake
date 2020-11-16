import React, { Component } from 'react';

import { v4 as uuidv4 } from "uuid";
import TodoView from "./TodoView";

export default class Todo extends Component {
    state = {
        todoList: [
        {
            id: uuidv4(),
            todo: "Create an app"
        },
        {
            id: uuidv4(),
            todo: "Test the app"
        },
        {
            id: uuidv4(),
            todo: "Publish the app"
        }
    ],

    };
    
    render() {
        const { todoList } = this.state;

        return (
            <div>
                <input 
                    type="text"
                    name="todoValue"
                /> {" "}
                <button>Add</button>
                
                <TodoView
                    todoList = {todoList}
                />
            </div>
        )
    }
}
