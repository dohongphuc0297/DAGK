import React from 'react';
import { connect } from 'react-redux';
import '../assets/css/dashboard.css';
//import '../assets/js/dashboard.js';
import PeopleList from './PeopleList';
import ChatHistory from './ChatHistory';
import SendMessage from './SendMessage';
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty, firestoreConnect } from 'react-redux-firebase';

const DashBoard = ({
    users,
    auth }
) => {
    //console.log(users);
    let CurChat = null;
    if (!(users === undefined)) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === auth.uid) {
                CurChat = users[i].currentChatUser;
                break;
            }
        }
        if (!(CurChat === null)) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === CurChat) {
                    CurChat = users[i];
                    break;
                }
            }
        }
    }
    //console.log(CurChat);
    return (
        <div className="login-block dashboard">
            <div className="main-message container clearfix">
                <PeopleList />
                <div className="chat">
                    <div className="chat-header clearfix">
                        <img src={CurChat ? CurChat.avatarUrl : ""} alt="avatar" />
                        <div className="chat-about">
                            <div className="chat-with">Chat with {CurChat ? CurChat.name : ""}</div>
                            <div className="chat-num-messages">already 1 902 messages</div>
                        </div>
                        <i className="fa fa-star"></i>
                    </div>
                    <ChatHistory data={{auth, CurChat}} />
                    <SendMessage data={{auth, CurChat}} />
                </div>
            </div>
        </div>
    );
}
// const mapStateToProps = (state) => {
//     return {
//         user: state.user
//     }
// };

//export default connect(mapStateToProps)(DashBoard);

// export default compose(
//     firebaseConnect(), // withFirebase can also be used
//     connect(({ firebase: { auth } }) => ({ auth }))
// )(DashBoard)

export default compose(
    firestoreConnect(['users']),
    connect((state, props) => ({
        users: state.firestore.ordered.users,
        auth: state.firebase.auth
    }))
)(DashBoard)