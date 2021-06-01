import React, { Component } from 'react'
import { connect } from 'react-redux'
import { boardService } from '../services/board-service'
import { saveCard, saveActivity } from '../store/action/board.action'
import { GroupTitleEdit } from './GroupTitleEdit'
import { CardDescription } from './CardDescription'
import { CardMemberList } from './CardMemberList'
import { CardLabelList } from './CardLabelList'
import { CardDetailsMembers } from './CardDetailsMembers'
import { CardDetailsLabels } from './CardDetailsLabels'
import { CardDetailsDate } from './CardDetailsDate'
import { CardDateSetter } from './CardDateSetter'
import { CardCheckListContainer } from './CardCheckListContainer'
import { CardAddCheckList } from './CardAddCheckList'
import { CardActivitiesList } from './CardActivitiesList'

export class _CardDetails extends Component {
  state = {
    card: null,
    isCardMemberListShowenRight: false,
    isCardMemberListShowenLeft: false,
    isCardLabelListShowenRight: false,
    isCardLabelListShowenLeft: false,
    isCardDueDateShowenRight: false,
    isDueDateListShowenLeft: false,
    isCardCheckListShowen: false,
    isNewTodoShown: false
  }

  componentDidMount() {
    const id = this.props.cardId
    const card = boardService.getCardById(id)
    this.setState({ card })
  }

  onUpdateCardProps = (key, value) => {
    const { card } = this.state
    card[key] = value
    this.setState({ card }, () => this.onSaveCard(card))
  }

  onSaveCard = () => {
    const { card } = this.state
    this.props.saveCard(card, card.currGroup.groupId)
  }

  onToggleCardMemberRight = () => {
    this.setState({ isCardMemberListShowenRight: !this.state.isCardMemberListShowenRight })
    this.setState({ isCardMemberListShowenLeft: false })
  }

  onToggleCardMemberLeft = () => {
    this.setState({ isCardMemberListShowenLeft: !this.state.isCardMemberListShowenLeft })
    this.setState({ isCardMemberListShowenRight: false })
  }

  onToggleCardLabelRight = () => {
    this.setState({ isCardLabelListShowenRight: !this.state.isCardLabelListShowenRight })
    this.setState({ isCardLabelListShowenLeft: false })
  }

  onToggleCardLabelLeft = () => {
    this.setState({ isCardLabelListShowenLeft: !this.state.isCardLabelListShowenLeft })
    this.setState({ isCardLabelListShowenRight: false })
  }

  onToggleCheckList = () => {
    this.setState({ isCardCheckListShowen: !this.state.isCardCheckListShowen })
  }

  onToggleDueDateRight = () => {
    this.setState({ isDueDateListShowenRight: !this.state.isDueDateListShowenRight })
    this.setState({ isDueDateListShowenLeft: false })
  }

  onToggleDueDateLeft = () => {
    this.setState({ isDueDateListShowenLeft: !this.state.isDueDateListShowenLeft })
    this.setState({ isDueDateListShowenRight: false })
  }

  onCloseAllModals = (ev) => {
    ev.stopPropagation()
    if (this.state.isCardMemberListShowenRight === true) this.setState({ isCardMemberListShowenRight: false })
    if (this.state.isCardMemberListShowenLeft === true) this.setState({ isCardMemberListShowenLeft: false })
    if (this.state.isCardLabelListShowenRight === true) this.setState({ isCardLabelListShowenRight: false })
    if (this.state.isCardLabelListShowenLeft === true) this.setState({ isCardLabelListShowenLeft: false })
    if (this.state.isCardDueDateShowenRight === true) this.setState({ isCardDueDateShowenRight: false })
    if (this.state.isCardDueDateShowenLeft === true) this.setState({ isCardDueDateShowenLeft: false })
    if (this.state.isCardCheckListShowen === true) this.setState({ isCardCheckListShowen: false })
    this.setState({ isNewTodoShown: false })
  }
  render() {
    const { card } = this.state
    if (!card) return <></>
    return (
      <div className="window-screen" onClick={() => this.props.history.push('/board')}>
​
        <div className="edit" onClick={this.onCloseAllModals}>
          <>
            <>
              <>
                <div className="edit-details-header">
                  <p className="edit-details-header-logo"></p>
                  <GroupTitleEdit title={card.title} group={card} />
                  <button className="close-save-edit" onClick={() => this.props.history.push('/board')} ></button>
                </div>
              </>
            </>
          </>
          <div className="edit-body">
            <div className="edit-details">
              <span className="list-pages">In list pages</span>
​
​
​
              {/* 
              #########################################
              ###########                 #############
              #####^^^^  CARD PROPS DISPLAY   ^^^^#####
              ###########                 #############
              #########################################
               */}
              <div className="flex">
                <>
                  <>
                    <>
                      <div className="flex column">
                        {card.members.length > 0 && <div><CardDetailsMembers members={card.members}
                          onToggle={this.onToggleCardMemberLeft} /></div>}
                        <div className="card-member-pos">
                          {this.state.isCardMemberListShowenLeft &&
                            <CardMemberList
                              card={card}
                              saveActivity={saveActivity}
                              boardMembers={this.props.board.members}
                              onToggle={this.onToggleCardMemberLeft}
                              onUpdateCardProps={this.onUpdateCardProps}
                            />}
                        </div>
                      </div>
                    </>
                  </>
                </>
​
                <>
                  <>
                    <>
                      <div className="flex column">
                        {card.labels.length > 0 &&
                          <div><CardDetailsLabels
                            labels={card.labels}
                            onToggle={this.onToggleCardLabelLeft} />
                          </div>}
                        <div className="card-lable-pos">
                          {this.state.isCardLabelListShowenLeft &&
                            <CardLabelList
                              card={card}
                              boardLabels={this.props.board.labels}
                              onToggle={this.onToggleCardLabelLeft}
                              onUpdateCardProps={this.onUpdateCardProps} />}
                        </div>
                      </div>
                    </>
                  </>
                </>
                <>
                  <>
                    <>
                      <div className="flex column">
                        {card.dueDate &&
                          <CardDetailsDate dueDate={card.dueDate}
                            onToggle={this.onToggleDueDateLeft} />
                        }
                        <div className="card-date-pos">
                          {this.state.isCardMemberListShowenLeft &&
                            <CardDetailsDate
                              card={card}
                              dueDate={card.dueDate}
                              onToggle={this.onToggleDueDateLeft}
                              onUpdateCardProps={this.onUpdateCardProps}
                            />}
                        </div>
                      </div>
                    </>
                  </>
                </>
              </div>
​
​
              {/* 
              #########################################
              ###########                 #############
              ####^^^^^^ CARD EDIT BUDTTONS ^^^^^^^####
              ###########                 #############
              #########################################
               */}
​
              <div className="edit-details-description">
                <div className="edit-details-description-header">
                  <p className="edit-details-description-logo"></p>
                  <h1>Description</h1>
                </div>
                <CardDescription
                  description={card.description}
                  onUpdateCardProps={this.onUpdateCardProps}
                  onSaveCard={this.onSaveCard} />
              </div>
              <div>
                <CardCheckListContainer
                  checklist={card.checklist}
                  onUpdateCardProps={this.onUpdateCardProps} />
                {/* <CardCheckListList onUpdate={this.onUpdateChecklists} /> */}
              </div>
              <>
                <>
                  <>
                    <div>
                      <div className="edit-details-activity-header">
                        <span>
                          <p className="edit-details-activity-logo"></p>
                          <h1>Activity</h1>
                        </span>
                        <button>Show details</button>
                      </div>
                      <div className="edit-activity-description">
                        <div>
                          <div className='user-img-chat-add'>G</div>
                          <textarea readOnly className="edit-activity-description-textarea" type="text" value='Write a comment...' />
                        </div>
                        <div>
                          <CardActivitiesList card={card} activities={this.props.board.activities} />
                        </div>
                      </div>
                    </div>
                  </>
                </>
              </>
            </div >
​
​
            <div className="edit-add-to-card">
              <h1> ADD TO CARD </h1>
              <>
                <>
                  <>
                    <button className="edit-add-to-card-members"
                      onClick={this.onToggleCardMemberRight}> Members</button>
                    <div className="card-member-pos">
                      {this.state.isCardMemberListShowenRight &&
                        <CardMemberList
                          card={card}
                          saveActivity={saveActivity}
                          boardMembers={this.props.board.members}
                          onToggle={this.onToggleCardMemberRight}
                          onUpdateCardProps={this.onUpdateCardProps}
                        />}
                    </div>
                  </>
                </>
              </>
              <>
                <>
                  <>
                    <button className="edit-add-to-card-labels"
                      onClick={this.onToggleCardLabelRight}> Labels</button>
                    <div className="card-label-pos">
                      {this.state.isCardLabelListShowenRight &&
                        <CardLabelList
                          card={card}
                          boardLabels={this.props.board.labels}
                          onToggle={this.onToggleCardLabelRight}
                          onUpdateCardProps={this.onUpdateCardProps}
                        />}
                    </div>
                  </>
                </>
              </>
              <>
                <>
                  <>
                  <button className="edit-add-to-card-checklist"
                onClick={this.onToggleCheckList}> Checklist</button>
              <div className="card-modal-pos">
                {this.state.isCardCheckListShowen && <CardAddCheckList
                  onToggle={this.onToggleCheckList} onUpdateCardProps={this.onUpdateCardProps} card={card} />}
              </div>
                  </>
                </>
              </>
              <>
                <>
                  <>
                    {/* <CardDateSetter onUpdateCardProps={this.onUpdateCardProps} card={card} /> */}
                    <button className="edit-add-to-card-dates"
                      onClick={this.onToggleDueDateRight}> Dates</button>
                    <div className="card-date-pos">
                      {this.state.isDueDateListShowenRight &&
                        <CardDateSetter
                          dueDate={this.state.card.dueDate}
                          onToggle={this.onToggleDueDateRight}
                          onUpdateCardProps={this.onUpdateCardProps}
                          card={card}
                        />}
                    </div>
                  </>
                </>
              </>
              <>
                <>
                  <>
                    {/* <label htmlFor="raised-button-file">
                      <button className="edit-add-to-card-attachment" variant="raised" component="span"> Attachment</button>
                    </label> */}
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onSubmit={this.onAttachmentFile}
                    />
                    <label htmlFor="raised-button-file">
                      <button className="edit-add-to-card-attachment" variant="contained" component="span">
                        Attachment
                      </button>
                      {/* <button className="edit-add-to-card-attachment" variant="raised" component="span">
                        Attachment
                      </button> */}
                    </label>
                  </>
                </>
              </>
              <>
                <>
                  <>
                    <button className="edit-add-to-card-cover"> Cover</button>
                  </>
                </>
              </>
            </div>
          </div>
        </div >
      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  }
}

const mapDispatchToProps = {
  saveCard,
  saveActivity,

}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)