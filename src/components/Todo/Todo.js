import React, { Component } from 'react';

import { v4 as uuidv4 } from "uuid";
import { uuid } from 'uuidv4';
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

        addValue: "",
        showInputErrorMessage: false,

    };

    handleAddInputChange = (event) => {
        // We also want to make sure that we don't show the input error message when there is a change
        if(this.state.showInputErrorMessage) {
            this.setState({
                showInputErrorMessage: false
            });
        }

        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleAddNewTodo = (event) => {
        // Prevent page from refreshing
        event.preventDefault();

        // Make sure that the input bar is actually filled in
        if(this.state.addValue.length === 0) {
            this.setState({
                showInputErrorMessage: true
            });

            // Then cut off the function at this point
            return;
        }

        // Store the values of the new todo into a temporary object
        let newTodo = {
            id: uuidv4(),
            todo: this.state.addValue
        };

        // Create a new array that now holds the updated list
        let newTodoList = [...this.state.todoList, newTodo];

        // Now we set the state to save our new todo list
        this.setState({
            todoList: newTodoList,
            // We also want to reset the value of the input bar
            addValue: ""
        });
    }
    
    render() {
        const { 
            todoList,
            showInputErrorMessage
        } = this.state;

        return (
            <div>
                {showInputErrorMessage ? (
                    <div>
                        sorry, i'm drawing a 'blank' in figuring out what you wanna add
                    </div>
                ) : null }
                <input 
                    onChange={this.handleAddInputChange}
                    type="text"
                    name="addValue"
                    value={this.state.addValue}
                /> {" "}
                <button onClick={this.handleAddNewTodo}>Add</button>
                
                <TodoView
                    todoList = {todoList}
                />
            </div>
        )
    }
}
