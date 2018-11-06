import React from 'react';
import { connect } from 'react-redux';
import '../assets/css/dashboard.css';
//import '../assets/js/dashboard.js';
import PeopleList from './PeopleList';
import ChatHistory from './ChatHistory';
import SendMessage from './SendMessage';

const DashBoard = (props) => {
    return (
        <div>
            <div className="main-message container clearfix">
                <PeopleList />
                <div className="chat">
                    <div className="chat-header clearfix">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                        <div className="chat-about">
                            <div className="chat-with">Chat with Vincent Porter</div>
                            <div className="chat-num-messages">already 1 902 messages</div>
                        </div>
                        <i className="fa fa-star"></i>
                    </div>
                    <ChatHistory />
                    <SendMessage />
                </div>
            </div>

            {/* <script id="message-template" type="text/x-handlebars-template">
                <li className="clearfix">
                    <div className="message-data align-right">
                        <span className="message-data-time" >{{ time }}, Today</span> &nbsp; &nbsp;
      <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
                    </div>
                    <div className="message other-message float-right">
                        {{ messageOutput }}
                    </div>
                </li>
            </script>

            <script id="message-response-template" type="text/x-handlebars-template">
                <li>
                    <div className="message-data">
                        <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                        <span className="message-data-time">{{ time }}, Today</span>
                    </div>
                    <div className="message my-message">
                        {{ response }}
                    </div>
                </li>
            </script> */}

        </div>
    );
}
const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
};

export default connect(mapStateToProps)(DashBoard);