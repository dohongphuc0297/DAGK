import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { addCurChat } from '../actions/index';

class PeopleList extends React.Component {

    render() {
        let users = null;
        if (!(this.props.users === undefined)) {
            users = this.props.users
                .sort((a, b) => {
                    //console.log(this.props.data.CurChat);
                    if (!(this.props.data.CurChat === undefined) && !(this.props.data.StarList === undefined)) {
                        if (a.id === this.props.data.CurChat.id) return -1;
                        
                        if (b.id === this.props.data.CurChat.id) return 1;
                        if (this.props.data.StarList.indexOf(a.id) >= 0) return -1;
                        if (this.props.data.StarList.indexOf(b.id) >= 0) return 1;
                    }
                    return 0;
                })
                .map((user, index) => {
                    const time = new Date();
                    const timeSignOut = !(user.lastSignOut === undefined) ? user.lastSignOut.toDate() : null;
                    const status = user.status ? "online" : "offline ";
                    let t = null;
                    let unit = "mins";
                    const isStar = !(this.props.data.StarList === undefined) ? 
                        this.props.data.StarList.indexOf(user.id) >= 0 ? true : false : false;
                    if (status === "offline " && !(user.lastSignOut === undefined)) {
                        t = Math.floor((time - timeSignOut) / 60000);
                        if (t >= 60) {
                            t = Math.floor(t / 60);
                            unit = "hour";
                            if (t >= 24) {
                                t = Math.floor(t / 24);
                                if (t > 1) {
                                    unit = "days";
                                    if (t >= 30) {
                                        t = Math.floor(t / 30);
                                        if (t > 1) {
                                            unit = "months";
                                            if (t > 12) {
                                                t = Math.floor(t / 12);
                                                if (t > 1) {
                                                    unit = "years";
                                                } else {
                                                    unit = "year";
                                                }
                                            }
                                        } else {
                                            unit = "month";
                                        }
                                    }
                                } else {
                                    unit = "day";
                                }
                            }
                        }
                    }
                    return (
                        <li className="clearfix li-click" key={index} onClick={() => this.props.addCurChat(user)}>
                            <img src={user.avatarUrl} alt="avatar" />
                            <div className="about">
                                <div className="name">{user.name} {isStar ? <i className="fa fa-star" id="btn-star" style={{ color: "rgb(255, 230, 0)" }} />: null}</div>
                                <div className="status">
                                    <i className={"fa fa-circle " + status}></i> {status} {t ? t + " " + unit + " ago" : null}
                                </div>
                            </div>
                        </li>
                    );
                });
        }
        return (
            <div className="people-list" id="people-list">
                <div className="search">
                    <input type="text" placeholder="search" />
                    <i className="fa fa-search"></i>
                </div>
                <ul className="ul-data list">
                    {users ? users : null}
                </ul>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addCurChat: (user) => dispatch(addCurChat(user))
});

export default compose(
    firestoreConnect(['users']),
    connect((state, props) => {
        return ({
            users: state.firestore.ordered.users
        })
    }, mapDispatchToProps)
)(PeopleList)
