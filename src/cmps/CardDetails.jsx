import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { boardService } from '../services/board-service'
import { saveCard, saveActivity } from '../store/action/board.action'
import { SmartTitleEdit } from './SmartTitleEdit'
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
import { AttachmentsList } from './AttachmentsList'
import { CardComment } from './CardComment'
import { UplodeImg } from './UplodeImg'

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
    const cardId = this.props.cardId
    this.onLoadCard(cardId)
  }

  onLoadCard = (cardId) => {
    const group = this.props.board.groups.find(group =>
      group.cards.find(card => card.id === cardId))
    const card = group.cards.find(card => card.id === cardId)
    this.setState({ card })
  }

  onUpdateCardProps = (key, value) => {
    const { card } = this.state
    card[key] = value
    this.setState({ card }, () => this.onSaveCard(card))
  }

  onSaveCard = () => {
    const { card } = this.state
    this.props.saveCard(card, card.currGroup.groupId, this.props.board)
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
      <div className="window-screen" onClick={() => this.props.history.push(`/board/${this.props.board._id}`)}>

        <div className="edit" onClick={this.onCloseAllModals}>
          <>
            <>
              <>
                <div className="edit-details-header">
                  <p className="edit-details-header-logo"></p>
                  <SmartTitleEdit card={card} saveCard={this.props.saveCard} board={this.props.board} />
                  <button className="close-save-edit" onClick={() => this.props.history.push(`/board/${this.props.board._id}`)} ></button>
                </div>
              </>
            </>
          </>
          <div className="edit-body">
            <div className="edit-details">
              <span className="list-pages">In list pages</span>



              {/* 
              #########################################
              ###########                 #############
              #####^^^^  CARD PROPS DISPLAY   ^^^^#####
              ###########                 #############
              #########################################
               */}
              <div className="flex members-labels-container">
                <>
                  <>
                    <>
                      <div className="flex column">
                        {card.members.length > 0 && <div>
                          <CardDetailsMembers members={card.members}
                            onToggle={this.onToggleCardMemberLeft} /></div>}

                        <div className="card-member-pos">
                          {this.state.isCardMemberListShowenLeft &&
                            <CardMemberList
                              card={card}
                              saveActivity={this.props.saveActivity}
                              boardMembers={this.props.board.members}
                              onToggle={this.onToggleCardMemberLeft}
                              onUpdateCardProps={this.onUpdateCardProps}
                            />}
                        </div>
                      </div>
                    </>
                  </>
                </>

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
                          <CardDetailsDate
                            card={card}
                            onToggle={this.onToggleDueDateLeft}
                            saveActivity={this.props.saveActivity}
                            onUpdateCardProps={this.onUpdateCardProps}
                          />
                        }
                        <div className="card-date-pos">
                          {this.state.isCardMemberListShowenLeft &&
                            <CardDetailsDate
                              card={card}
                              onToggle={this.onToggleDueDateRight}
                              saveActivity={this.props.saveActivity}
                              onUpdateCardProps={this.onUpdateCardProps}
                            />}
                        </div>
                      </div>
                    </>
                  </>
                </>
              </div>


              {/* 
              #########################################
              ###########                 #############
              ####^^^^^^ CARD EDIT BUDTTONS ^^^^^^^####
              ###########                 #############
              #########################################
               */}


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


              <div className="edit-details-attachments">
                <div className="edit-details-attachments-header">
                  <p className="edit-details-attachments-logo"></p>
                  <h1>Attachments</h1>
                </div>
                <AttachmentsList
                  card={card}
                />
              </div>



              <div>
                <CardCheckListContainer
                  card={card}
                  // checklist={card.checklist}
                  saveActivity={this.props.saveActivity}
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
                        <CardComment
                          card={card}
                          saveActivity={this.props.saveActivity}
                          onUpdateCardProps={this.onUpdateCardProps}
                        />
                        <div>
                          <CardActivitiesList card={card} activities={this.props.board.activities} />
                        </div>
                      </div>
                    </div>
                  </>
                </>
              </>
            </div >


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
                          saveActivity={this.props.saveActivity}
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
                      {this.state.isCardCheckListShowen &&
                        <CardAddCheckList
                          card={card}
                          onToggle={this.onToggleCheckList}
                          saveActivity={this.props.saveActivity}
                          onUpdateCardProps={this.onUpdateCardProps}
                        />}
                    </div>
                  </>
                </>
              </>
              <>
                <>
                  <>
                    {/* <CardDateSetter onUpdateCardProps={this.onUpdateCardProps} card={card} /> */}
                    <button className="edit-add-to-card-dates"
                    > Dates
                    <div className="card-date-pos">
                        {
                          <CardDateSetter
                            dueDate={this.state.card.dueDate}
                            onToggle={this.onToggleDueDateRight}
                            onUpdateCardProps={this.onUpdateCardProps}
                            card={card}
                          />}
                      </div>
                    </button>
                  </>
                </>
              </>
              <>
                <>
                  <>

                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onSubmit={this.onAttachmentFile}
                    />
                    <label htmlFor="raised-button-file">
                      <button className="edit-add-to-card-attachment">
                        Attachment
                        <UplodeImg onUpdateCardProps={this.onUpdateCardProps} /></button>
                    </label>


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