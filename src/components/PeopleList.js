import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { addCurChat } from '../actions/index';
import $ from 'jquery';

class PeopleList extends React.Component {

    InputListener() {
        var input, filter, ul, li, a, i;
        input = $('#searchInput').val();
        if (input === undefined) return;
        filter = input.toUpperCase();
        ul = document.getElementById("ul-list");
        li = ul.getElementsByTagName('li');
        //console.log(li);
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("span")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    render() {
        let users = this.props.users;
        if (!(this.props.users === undefined)) {
            users = users
                .sort((a, b) => {
                    if (!(this.props.data.CurChat === undefined)) {

                        if (a.id === this.props.data.CurChat.id) return -1;

                        if (b.id === this.props.data.CurChat.id) return 1;
                    }
                    if (!a.status) return 1;
                    if (!b.status) return -1;
                    if (!(this.props.data.StarList === undefined)) {
                        function findIsStaredA(element) {
                            return element.id === a.id;
                        };
                        function findIsStaredB(element) {
                            return element.id === b.id;
                        };
                        const indexA = this.props.data.StarList.findIndex(findIsStaredA);
                        const indexB = this.props.data.StarList.findIndex(findIsStaredB);
                        if (indexA >= 0) {
                            if (this.props.data.StarList[indexA].status === true) return -1;
                        }
                        if (indexB >= 0) {
                            if (this.props.data.StarList[indexB].status === true) return 1;
                        }
                    }


                    return 0;
                })
                .map((user, index) => {
                    const time = new Date();
                    const timeSignOut = !(user.lastSignOut === undefined) ? user.lastSignOut.toDate() : null;
                    const status = user.status ? "online" : "offline ";
                    let t = null;
                    let unit = "mins";
                    function findIsStared(element) {
                        return element.id === user.id;
                    };
                    let IsStar = false;
                    if (this.props.data.StarList !== undefined) {
                        const indx = this.props.data.StarList.findIndex(findIsStared);
                        if (indx >= 0) {
                            if (this.props.data.StarList[indx].status) IsStar = true;
                            else IsStar = false;
                        }
                    }
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
                            <img src={user.avatarUrl !== undefined && user.avatarUrl !== null ? user.avatarUrl : "./default_avatar.png"} alt="avatar" />
                            <div className="about">
                                <div className="name"><span>{user.name}</span> {IsStar ? <i className="fa fa-star" id="btn-star" style={{ color: "rgb(255, 230, 0)" }} /> : null}</div>
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
                    <input type="text" id="searchInput" onKeyUp={() => this.InputListener()} placeholder="search" />
                    <i className="fa fa-search"></i>
                </div>
                <ul className="ul-data list" id="ul-list">
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
