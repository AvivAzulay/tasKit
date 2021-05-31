
import { Button, Checkbox } from '@material-ui/core'
import React, { Component } from 'react'
import { utilService } from '../services/util-service'
// import { DeleteOutlineOutlinedIcon } from '@material-ui/icons/DeleteOutlineOutlined';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

export class CardChecklistTodo extends Component {
    
    state = {
        isDone: false,
        isEditing: false,
        txtValue: '',
        isNew: false,
        todo: null
    }
    
    componentDidMount() {
        // if (this.props.isNew) this.setState({ isNew: true })
        this.updateTodo()
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.txtValue !== this.state.txtValue || prevState.isDone !== this.state.isDone) this.updateChecklist(this.state.checklist)
    }

    handleChange = (ev) => {
        ev.stopPropagation()
        // let txt = ''
        let checkStatus = ev.target.checked
        // if (checkStatus) {
        //     txt = `completed ${this.state.txtValue}`
        // } else {
        //     txt = `marked ${this.state.txtValue} incomplete`
        // }

        this.setState({ isDone: checkStatus })
            // , () => {
        //     this.updateChecklist()
        // })
    }

    setEditing = () => {
        this.setState({ isEditing: true })
    }

    setNotEditing = () => {
        this.setState({ isEditing: false })
    }

    removeText = () => {
        this.setState({ txtValue: '' })
    }

    // getNewTodoDisplay = () => {
    //     if (this.state.isEditing) {
    //         return (
    //             <form onBlur={this.setNotEditing} onSubmit={this.onSubmit}>
    //                 <input className="checkbox-text-edit" type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
    //                 <button className="save-btn" type="submit">Save</button>
    //             </form>
    //         )
    //     }
    //     return (
    //         <Button className="checklist-add-todo" onClick={this.setEditing}>
    //             Add an item
    //         </Button>
    //     )
    // }

    getTodoClassName = () => {
        const doneClass = (this.state.isDone) ? 'todo-done' : 'todo-not-done'
        return `checklist-todo-title ${doneClass}`
    }

    getTextBox = () => {
        if (this.state.isEditing) return (
            <React.Fragment>
                <Checkbox checked={this.state.isDone} onChange={this.onCheck} className="checkbox-todo" />
                <form onBlur={this.setNotEditing} onSubmit={this.onSubmit}>
                    <input className="checkbox-text-edit" type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
                    <button className="save-btn" type="submit">Save</button>
                </form>
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <Checkbox checked={this.state.isDone} onChange={this.onCheck} className="checkbox-todo" />
                <div className={this.getTodoClassName()} onClick={this.setEditing}>
                    {this.state.txtValue}
                    <Button onClick={this.onRemove}>
                        {/* <DeleteOutlineOutlinedIcon fontSize="inherit" /> */}
                        {/* <DeleteOutlineOutlinedIcon /> */}
                    </Button>
                </div>
            </React.Fragment>
        )
    }

    onSubmit = (ev) => {

        ev.preventDefault()
        // this.setNotEditing()
        this.updateChecklist()

    }

    updateTodo = () => {

        const todo = this.props.todo
        if (!todo) return
        const txtValue = todo.title
        const isDone = todo.isDone

        this.setState({ ...this.state, isDone, txtValue })
    }

    onChange = (ev) => {
        ev.stopPropagation()
        this.setState({ txtValue: ev.target.value })
    }

    getActivityTxt = () => {
        let txt;
        if (this.state.isDone) {
            txt = `completed ${this.state.txtValue}`
        } else {
            txt = `marked ${this.state.txtValue} incomplete`
        }
        return txt
    }

    onRemove = (ev) => {
        // ev.stopPropagation()
        // console.log(this.props.todo);
        // console.log(ev);
        this.props.todo.title = ''
        this.props.onUpdateChecklist(this.props.todo)
        // this.setState({ txtValue: '' }, this.updateChecklist)
    }

    updateChecklist = () => {

        let id;
        if (this.props.todo) {
            id = this.props.todo.id
        } else {
            id = utilService.makeId()
        }
        const todo = {
            id,
            isDone: this.state.isDone,
            title: this.state.txtValue
        }

        this.props.onUpdateChecklist(todo)
        // const activityTxt = this.getActivityTxt()
        // if (this.state.isNew) {
        //     this.props.onUpdate(todo)
        //     this.setState({ txtValue: '' })
        // } else {
        //     this.props.onUpdate(todo, activityTxt)
        // }
    }


    render() {
        if (!this.props.displayCompleted && this.state.isDone) return <React.Fragment />


        if (this.state.isEditing) return (
            <div className="checklist-todo flex">
                <Checkbox checked={this.state.isDone} onChange={this.onCheck} className="checkbox-todo" />
                <form onBlur={this.setNotEditing} onSubmit={this.onSubmit}>
                    <input className="checkbox-text-edit" type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
                    <button className="save-btn" type="submit">Save</button>
                </form>
                {/* { this.getNewTodoDisplay()} */}
            </div>
        )
        return (
            <div className="checklist-todo flex">
                <Checkbox checked={this.state.isDone} onChange={this.handleChange} className="checkbox-todo" />
                <div className={this.getTodoClassName()} onClick={this.setEditing}>
                    {this.state.txtValue}
                    <Button onClick={this.onRemove}>
                        {/* <DeleteOutlineOutlinedIcon fontSize="inherit" /> */}
                    </Button>
                </div>
                {/* {this.getNewTodoDisplay()} */}
            </div>
        )

        // return (
        //     <>
        //         <div className="checklist-todo flex">
        //             {this.getTextBox()}
        //         </div>
        //         {this.getNewTodoDisplay()}
        //     </>
        // <div className="checklist-todo flex">
        //     {(this.state.isNew) ? this.getNewTodoDisplay() : this.getTextBox()}
        // </div>
        // )
    }
}
