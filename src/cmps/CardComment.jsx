import React, { Component } from 'react'

export class CardComment extends Component {
    state = {
        commentTxt: '',
        isEditModeOn: false
    }

    componentDidMount() {

    }


    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ commentTxt: value })
    }

    toggleEditMode = () => {
        if (this.state.isEditModeOn) return
        this.setState({ isEditModeOn: !this.state.isEditModeOn })
    }

    onSubmit = () => {
        const card = this.props.card
        card.commentTxt = this.state.commentTxt
        this.props.saveActivity(card, 'ADD_COMMENT')
        this.toggleEditMode()
        this.setState({ commentTxt: '', isEditModeOn: !this.state.isEditModeOn })
    }

    render() {
        const { commentTxt, isEditModeOn } = this.state
        return (
            <>
                <div className="flex">
                    <div className='user-img-chat-add'>G</div>
                    <textarea onChange={this.handleChange}
                        type="text"
                        value={commentTxt}
                        onClick={this.toggleEditMode}
                        placeholder='Write a comment...'
                        className="edit-activity-description-textarea"
                    />
                </div>
                {isEditModeOn && <button onClick={this.onSubmit}>Save</button>}
            </>
        )
    }
}
