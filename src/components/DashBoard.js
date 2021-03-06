import React from 'react';
import { connect } from 'react-redux';
import '../assets/css/dashboard.css';
import PeopleList from './PeopleList';
import ChatHistory from './ChatHistory';
import SendMessage from './SendMessage';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { login, starUser } from '../actions/index';

class DashBoard extends React.Component {
    
    componentDidMount() {
        //login khi vào bằng địa chỉ url
        this.props.login(this.props.auth);
    }

    render() {
        //console.log(this.props);
        let CurChat;
        let StarList;
        let isStared = false;

        //find current chat
        if (!(this.props.users === undefined)) {
            let index = null;
            for (let i = 0; i < this.props.users.length; i++) {
                if (this.props.users[i].id === this.props.auth.uid) {
                    CurChat = this.props.users[i].currentChatUser;
                    index = i;
                    break;
                }
            }
            if (!(CurChat === undefined)) {
                function findIsStared(element) {
                    return element.id === CurChat.id;
                }
                for (let i = 0; i < this.props.users.length; i++) {
                    if (this.props.users[i].id === CurChat) {
                        CurChat = this.props.users[i];

                        //check if stared
                        if (!(this.props.users[index].stared === undefined)) {
                            StarList = this.props.users[index].stared;
                            //console.log(StarList);
                            const indx = StarList.findIndex(findIsStared);
                            if (indx >= 0) {
                                if (StarList[indx].status) isStared = true;
                                else isStared = false;
                            }
                        }
                        break;
                    }
                }
            }

        }

        const auth = this.props.auth;
        return (
            <div className="login-block dashboard">
                <div className="main-message container clearfix">
                    <PeopleList data={{ CurChat, StarList }} />
                    <div className="chat">
                        <div className="chat-header clearfix">
                            {CurChat ? <div>
                                <img src={CurChat.avatarUrl ? CurChat.avatarUrl : "./default_avatar.png"} alt="avatar" />
                                <div className="chat-about">
                                    <div className="chat-with">Chat with {CurChat ? CurChat.name : ""}</div>
                                    <div className="chat-num-messages">{!(this.props.messages === undefined) && !(this.props.messages.contents === undefined) ? "already " + this.props.messages.contents.length + " messages" : ""}</div>
                                </div>
                                <i className="fa fa-star btn-star" id="btn-star" style={isStared ? { color: "rgb(255, 230, 0)" } : {}} onClick={() => {
                                    return this.props.starUser(CurChat);
                                }}></i>
                            </div> : null}
                        </div>
                        <ChatHistory data={{ auth, CurChat }} />
                        <SendMessage data={{ auth, CurChat }} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (auth) => dispatch(login(auth)),
    starUser: (user) => dispatch(starUser(user))
});

export default compose(
    firestoreConnect(['users']),
    connect((state, props) => {
        //console.log(state);
        return ({
            users: state.firestore.ordered.users,
            auth: state.firebase.auth,
            messages: state.firestore.ordered.messages && state.firestore.ordered.messages[0]
        })
    }, mapDispatchToProps)
)(DashBoard)