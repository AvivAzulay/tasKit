import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BoradNav } from '../cmps/BoradNav.jsx'
import { loadBoard } from '../store/action/board.action.js'
import { GroupList } from '../cmps/GroupList'


class _BoardApp extends Component {

    state = {

    }

    componentDidMount() {
        this.props.loadBoard()
    }

    render() {
        if (!this.props.board) return <div>Loading...</div>
        return (
            <div className="board">
                <BoradNav />
                <GroupList groups={this.props.board.groups} />
                
                
                
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}
const mapDispatchToProps = {
    loadBoard
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
