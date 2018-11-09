import React from 'react';
import { connect } from 'react-redux';
import '../assets/css/dashboard.css';
//import '../assets/js/dashboard.js';
import PeopleList from './PeopleList';
import ChatHistory from './ChatHistory';
import SendMessage from './SendMessage';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import { login, AddCurChat } from '../actions/index';

class DashBoard extends React.Component {
    componentWillMount() {

    }
    componentDidMount() {
        console.log("login");
        //console.log(this.props);
        this.props.login(this.props.auth);
        //console.log("end login");
    }
    componentWillUpdate() {

    }
    render() {
        let CurChat;
        if (!(this.props.users === undefined)) {
            for (let i = 0; i < this.props.users.length; i++) {
                if (this.props.users[i].id === this.props.auth.uid) {
                    CurChat = this.props.users[i].currentChatUser;
                    break;
                }
            }
            if (!(CurChat === undefined)) {
                for (let i = 0; i < this.props.users.length; i++) {
                    if (this.props.users[i].id === CurChat) {
                        CurChat = this.props.users[i];
                        break;
                    }
                }
            }

            //if(!(CurChat === undefined)) this.props.AddCurChat(CurChat);
        }
        //const CurChat = this.props.curChat;
        const auth = this.props.auth;
        return (
            <div className="login-block dashboard">
                <div className="main-message container clearfix">
                    <PeopleList data={{ CurChat }} />
                    <div className="chat">
                        <div className="chat-header clearfix">
                            {CurChat ? <div>
                                <img src={CurChat ? CurChat.avatarUrl : ""} alt="avatar" />
                                <div className="chat-about">
                                    <div className="chat-with">Chat with {CurChat ? CurChat.name : ""}</div>
                                    <div className="chat-num-messages">{!(this.props.messages.length === 0) ? "already " + this.props.messages.length + " messages" : ""}</div>
                                </div>
                                <i className="fa fa-star"></i>
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
    AddCurChat: (user) => dispatch(AddCurChat(user))
});

export default compose(
    firestoreConnect(['users']),
    connect((state, props) => {
        return ({
            users: state.firestore.ordered.users,
            auth: state.firebase.auth,
            messages: state.reducers.auth.messages
        })
    }, mapDispatchToProps)
)(DashBoard)