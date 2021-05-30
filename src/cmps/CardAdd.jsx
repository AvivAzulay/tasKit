import React, { Component } from 'react'

export class CardAdd extends Component {
    state = {
        isEditing: false,
        card: {
            title: ''
        }
    }

    inputRef = React.createRef()

    componentDidMount() {
    }

    componentDidUpdate() {
        this.state.isEditing && this.inputRef.current.focus()
    }

    onToggleMode = () => {
        const { isEditing } = this.state
        this.setState({ ...this.state, isEditing: !isEditing })

    }

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState({ ...this.state, card: { title: value } })
    }

    onEnter = (ev) => {
        if (ev.key === 'Enter') {
            const { card } = this.state
            if (!card.title || card.title.charAt(0) === ' ' || card.title.charAt(0) === '\n') {
                this.setState({ ...this.state, card: { title: '' } })
                return
            }
            ev.preventDefault()
            this.props.onSaveCard(this.state.card, this.props.groupId)
            this.setState({ ...this.state, card: { title: '' } })
        }
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { card } = this.state
        if (!card.title || card.title.charAt(0) === ' ') return
        this.props.onSaveCard(card, this.props.groupId)
        this.setState({ ...this.state, card: { title: '' } })
    }

    render() {
        const { isEditing, card: { title } } = this.state
        return (<React.Fragment>

            { !isEditing &&
                <div className="card-add-edit" >
                    <p className="card-add-txt" onClick={this.onToggleMode}>Add another card</p>
                </div>}

            {isEditing &&
                <div className="card-add-edit" >
                    <form action="">
                        <textarea type="text" ref={this.inputRef} value={title} placeholder='Enter a title for this card...' onKeyPress={this.onEnter} onChange={this.handleChange} />
                        <div className="card-add-btn" >
                            <span className="left-btn">
                                <button className="card-add-edit-btn" onClick={this.onSubmit}>Add card</button>
                                <button className="card-add-exit-btn" onClick={this.onToggleMode}></button>
                            </span>
                            <button className="card-add-menu-btn" onClick={() => { }}></button>
                        </div>

                    </form>
                </div>}

        </React.Fragment>
        )
    }
}