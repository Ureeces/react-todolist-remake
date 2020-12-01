import React, { Component } from 'react';

import { v4 as uuidv4 } from "uuid";
import { uuid } from 'uuidv4';
import TodoView from "./TodoView";

export default class Todo extends Component {
    state = {
        todoList: [
        {
            id: uuidv4(),
            todo: "Create an app",
            isEditing: false,
        },
        {
            id: uuidv4(),
            todo: "Test the app",
            isEditing: false,
        },
        {
            id: uuidv4(),
            todo: "Publish the app",
            isEditing: false,
        }
        ],

        addValue: "",
        editValue: "",
        showInputErrorMessage: false,
        showNoTodosMessage: false,
        disableButtons: false,
    };

    /* *************************************************************
    Add Todo Handles 
    ************************************************************* */
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

    handleAddTodo = (event) => {
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
        },
        () => {
            if(this.state.todoList.length > 0) {
                this.setState({
                    showNoTodosMessage: false
                });
            }
        });

        console.log("Added todo:", newTodo.todo);
    };

    /* *************************************************************
    Delete Todo Handles 
    ************************************************************* */
    handleDeleteTodo = (targetID) => {
        // console.log('Got here');
        let tempTodoList = [...this.state.todoList];
        let deletedTodo = '';

        // Make sure that we filter out the li element that matches targetID
        let updatedTodoList = tempTodoList.filter(({ id, todo }) => {
            if(id === targetID) {
                deletedTodo = todo;
            }

            return id !== targetID;
        });

        // Save our todoList
        this.setState({
            todoList: updatedTodoList
        }, 
        () => {
            // Check if that was the last todo on the list - if it is, we need an error flag
            if(this.state.todoList.length === 0) {
                this.setState({
                    showNoTodosMessage: true
                });
            }
        });

        console.log("Deleted todo:", deletedTodo);
    };

    /* *************************************************************
    Edit Todo Handles 
    ************************************************************* */
    handleEditTodo = (targetID) => {
        let editingTodo = '';

        let todoListCopy = [...this.state.todoList];

        // Make sure we target the right li element based on id, and toggle its editing state
        let updatedTodos = todoListCopy.map((todoItem) => {
            if(todoItem.id === targetID) {
                todoItem.isEditing = true;
                editingTodo = todoItem.todo;
            }

            return todoItem;
        });

        // Save list
        this.setState({
            todoList: updatedTodos,
            editValue: editingTodo,
            disableButtons: true
        });

        console.log("Editing todo:", editingTodo);
    };

    handleUpdateTodo = () => {
        let oldTodo, updatedTodo;
        let todoListCopy = [...this.state.todoList];

        let updatedTodoList = todoListCopy.map((todoItem) => {
            if(todoItem.isEditing === true) {
                // Check for an empty input - if it is, then we need to set it back to its original value
                if(this.state.editValue.length === 0) {
                    this.state.editValue = todoItem.todo;
                }

                // Todos for console
                oldTodo = todoItem.todo;
                updatedTodo = this.state.editValue;

                // Changing the necessary values for the updated todo
                todoItem.todo = this.state.editValue;
                todoItem.isEditing = false;
            }

            return todoItem;
        });

        this.setState({
            todoList: updatedTodoList,
            editValue: '',
            disableButtons: false
        });

        console.log(`Updated todo: ${oldTodo} >> ${updatedTodo}`);
    };

    handleEditInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { 
            todoList,
            editValue,
            showNoTodosMessage,
            showInputErrorMessage,
            disableButtons,
        } = this.state;

        return (
            <div>
                <h1>Todo List</h1>
                {showInputErrorMessage ? (
                    <div>
                        sorry, i'm drawing a 'blank' here trying to figure out what you wanna add
                    </div>
                ) : null }
                <input 
                    onChange={this.handleAddInputChange}
                    type="text"
                    name="addValue"
                    value={this.state.addValue}
                /> {" "}
                <button onClick={this.handleAddTodo}>Add</button>
                
                {showNoTodosMessage ? (
                    <div style={{marginTop: "10px"}}>
                        looks like you have nothing 'to do' today. sure you wanna keep it like that?
                    </div>
                ) : null}
                <TodoView
                    todoList = {todoList}
                    handleDeleteTodo = {this.handleDeleteTodo}
                    handleEditTodo = {this.handleEditTodo}
                    handleUpdateTodo = {this.handleUpdateTodo}
                    handleEditInputChange = {this.handleEditInputChange}
                    editValue = {editValue}
                    disableButtons = {disableButtons}
                />
            </div>
        )
    }
}
