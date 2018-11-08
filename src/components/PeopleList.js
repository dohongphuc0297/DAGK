import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { fetchUser } from '../actions/index';

const PeopleList = (props) => {
    let users = null;
    if (!(props.users === undefined)) {
        users = props.users.sort((a, b) =>{
            if(a.id === props.data.CurChat.id) return -1;
            if(b.id === props.data.CurChat.id) return 1;
            return 0;
        }).map((user, index) => {
            const time = new Date();
            const timeSignOut = !(user.lastSignOut === undefined) ? user.lastSignOut.toDate() : null;
            const status = user.status ? "online" : "offline ";
            let t = null;
            let unit = "mins";
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
                <li className="clearfix li-click" key={index} onClick={()=>props.fetchUser(user)}>
                <img src={user.avatarUrl} alt="avatar" />
                    <div className="about">
                        <div className="name">{user.name}</div>
                        <div className="status">
                            <i className={"fa fa-circle " + status}></i> {status} {t ? t + " " + unit + " ago" : null}
                        </div>
                    </div>
                </li>
            );
        });
    }
    console.log(users);
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

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (user) => dispatch(fetchUser(user))
});

export default compose(
    firestoreConnect(['users']),
    connect((state, props) => ({
        users: state.firestore.ordered.users
    }),mapDispatchToProps)
)(PeopleList)
