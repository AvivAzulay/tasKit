import React from 'react'
import Moment from 'react-moment'
import { MemberIcon } from './MemberIcon'

export function BoardActivitiesList({ activities }) {
    if (!activities) return <></>
    return (
        <span className="activity-list">
            {activities.map(activity => {
                return <div className="activity-list-container" key={activity.id}>
                    <div className="activity-list-container-icon-txt" >
                        <MemberIcon member={activity.byMember} />
                        <div className="activity-list-content" >
                            <div>
                                <span className="activity-list-name">{activity.byMember.fullname.split(' ')[0]}</span>
                                <span className="activity-list-txt">{activity.txtBoard} </span>
                            </div>
                            <span className="activity-list-time"><Moment fromNow>{activity.createdAt}</Moment></span>
                        </div>
                    </div>
                </div>
            })}
        </span>
    )
}
