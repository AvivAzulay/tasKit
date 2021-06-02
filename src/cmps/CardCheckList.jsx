import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@material-ui/core'
// import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { CardChecklistTodo } from './CardChecklistTodo'
import React, { Component } from 'react'
// import { boardAction } from '../store/action/board.action'
import { utilService } from '../services/util-service'

export class CardCheckList extends Component {

    state = {
        tasksCompleted: 0,
        totalTasks: 0,
        displayCompleted: true,
        showDialog: false,
        isNew: false,
        isEditing: false,
        // isNewTodoShownByFather,
        checklist: null,
        todo: null,
        txtValue: '',
    }

    // isNewTodoShown
    componentDidMount() {
        this.setTasksStatus()
        this.setState({ checklist: this.props.card.checklist })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (document.querySelector('.checklist-text-edit')) document.querySelector('.checklist-text-edit').onBlur(console.log('g'))
    // }
    //     if (prevProps.isNewTodoShownByFather !== this.props.isNewTodoShownByFather) {
    //         if (!this.props.isNewTodoShownByFather) {
    //             this.setState({isEditing: false})
    //         } else {

    //         }
    // }

    setTasksStatus = () => {
        let tasksCompleted = 0
        let totalTasks = 0

        this.props.list.todos.forEach(todo => {
            if (todo.isDone) tasksCompleted += 1
            totalTasks += 1
        });

        this.setState({ tasksCompleted, totalTasks })
    }

    toggleEditing = () => {
        this.setState({ isEditing: !this.state.isEditing })
    }

    handleChange = (ev) => {
        ev.stopPropagation()
        this.setState({ txtValue: ev.target.value })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        this.updateNewTodo()
    }

    updateNewTodo = () => {
        const id = utilService.makeId()
        const todo = {
            id,
            isDone: false,
            title: this.state.txtValue
        }
        this.setState({ todo })
        this.onUpdateChecklist(todo)
        // const activityTxt = this.getActivityTxt()
        // if (this.state.isNew) {
        //     this.props.onUpdate(todo)
        //     this.setState({ txtValue: '' })
        // } else {
        //     this.props.onUpdate(todo, activityTxt)
        // }
    }

    toggleDisplayCompleted = () => {
        if (this.state.displayCompleted) return this.setState({ displayCompleted: false })
        return this.setState({ displayCompleted: true })
    }

    getDisplayCheckedBtn = () => {
        if (!this.state.tasksCompleted) return <React.Fragment />
        let btnContent;
        if (this.state.displayCompleted) {
            btnContent = 'Hide Completed Items'
        } else {
            btnContent = `Show Checked Items (${this.state.tasksCompleted})`
        }
        return (
            <button onClick={this.toggleDisplayCompleted}>{btnContent}</button>
        )
    }

    openDialog = () => {
        this.setState({ showDialog: true })
    }

    closeDialog = () => {
        this.setState({ showDialog: false })
    }

    getPrecentegesCompleted = () => {
        const percent = Math.round((this.state.tasksCompleted / this.state.totalTasks) * 100)
        return percent
    }

    onUpdateChecklist = (newTodo) => {
        // take the updated todo and insert it into the list
        if (!newTodo) return
        let todos = [...this.props.list.todos]
        // find the todo index
        const todoIdx = todos.findIndex(todo => todo.id === newTodo.id)
        // if new title is blank - remove todo
        if (!newTodo.title) {
            todos.splice(todoIdx, 1)
        } else if (todoIdx < 0) { //if the index is less than 0 - this is a new item
            todos.push(newTodo)
        } else {
            todos[todoIdx] = newTodo
        }
        const checklist = this.state.checklist
        let currList = checklist.find(list => list.id === this.props.list.id)
        currList.todos = todos
        this.props.onUpdateCardProps('checklist', checklist)
        this.setTasksStatus()
    }

    onRemoveChecklist = () => {
        const { checklist } = this.state
        const { list, saveActivity, card } = this.props
        const checklistIdx = checklist.findIndex(currList => currList.id === list.id)
        checklist.splice(checklistIdx, 1)
        this.props.onUpdateCardProps('checklist', checklist)
        this.closeDialog()

        ///////////////HEREHEREHERE//////////////////

        //Add new card activity
        const newCard = { ...card } // for actions
        newCard.currList = list
        // txt = `removed ${list.title} from this card`
        saveActivity(newCard, 'REMOVE_CHECKLIST')
    }

    getNewTodoDisplay = () => {
        if (this.state.isEditing) {
            return (
                <form onSubmit={this.onSubmit}>
                    {/* onBlur={this.toggleEditing} */}
                    <input className="checklist-text-edit" type="text" autoFocus value={this.state.txtValue} onChange={this.handleChange} />
                    <button className="save-btn" type="submit">Save</button>
                </form>
            )
        }
        return (
            <Button className="checklist-add-todo" onClick={this.toggleEditing}>
                Add an item
            </Button>
        )
    }

    render() {
        const { list } = this.props
        return (
            <div className="checklist" onClick={(ev) => { ev.stopPropagation() }}>

                {/* Check list + input + delete btn! */}
                <div className="checklist-title-container flex space-between">
                    {/* <CheckBoxOutlinedIcon /> */}
                    {/* TODO: Set here the icon of Checklist */}
                    <h1 className="checklist-title">{list.title}</h1>
                    <div className="checklist-title-btns">
                        {this.getDisplayCheckedBtn()}
                        <button  onClick={this.openDialog}>Delete</button>
                    </div>
                </div>

                {/* Adding liner bar progress! */}
                {((this.state.totalTasks) ? (
                    <div className="checklist-progress">
                        <div className="checklist-progress-numbers">%{this.getPrecentegesCompleted()}</div>
                        <LinearProgress value={this.getPrecentegesCompleted()} variant="determinate" />
                    </div>
                ) : <React.Fragment />)
                }

                <main className="checklist-main">
                    {this.props.list.todos.map(todo => <CardChecklistTodo key={todo.id} displayCompleted={this.state.displayCompleted} todo={todo} onUpdateChecklist={this.onUpdateChecklist} />)}
                    {this.getNewTodoDisplay()}
                </main>


                <Dialog onClose={this.closeDialog} open={this.state.showDialog}>
                    <DialogTitle id="alert-dialog-title">{"Remove this checklist?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Deleting a checklist is permanent and there is no way to get it back.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.onRemoveChecklist} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}
