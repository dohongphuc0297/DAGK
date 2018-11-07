import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import $ from 'jquery';

class ChatHistory extends React.Component {

    getTimeFormat(time) {
        if (time.getHours() >= 12) {
            return ((time.getHours() - 12) >= 10 ? "" : "0") + (time.getHours() - 12) + ":" + (time.getMinutes() >= 10 ? "" : "0") + time.getMinutes() + " PM";
        } else {
            return (time.getHours() >= 10 ? "" : "0") + time.getHours() + ":" + (time.getMinutes() >= 10 ? "" : "0") + time.getMinutes() + " AM";
        }
    }

    getTime(time) {
        const today = new Date();
        if (time.getFullYear() === today.getFullYear() && time.getMonth() === today.getMonth() && time.getDate() === today.getDate()) {
            return this.getTimeFormat(time) + ", Today";
        } else {
            return this.getTimeFormat(time) + ", " + time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();
        }
    }

    componentWillMount(){
        
        
    }

    render() {
        //console.log(this.props);
        
        var message = null;
        if (!(this.props.messages === undefined)) {
            if (!(this.props.messages.length === 0)) {
                if(!(this.props.messages[0].contents === undefined)){
                    message = this.props.messages[0].contents.map((message, index) => {
                        const time = message.date.toDate();
                        let t = null;
                        t = this.getTime(time);
    
                        if (message.sender === this.props.data.auth.uid) {
                            return (
                                <li className="clearfix" key={index}>
                                    <div className="message-data align-right">
                                        <span className="message-data-time" >{t}</span> &nbsp; &nbsp;
                                        <span className="message-data-name" >{this.props.data.auth.displayName}</span> <i className="fa fa-circle me"></i>
    
                                    </div>
                                    <div className="message my-message float-right">
                                        {message.content}
                                    </div>
                                </li>
                            );
                        } else {
                            return (
                                <li>
                                    <div className="message-data" key={index}>
                                        <span className="message-data-name"><i className="fa fa-circle online"></i> {this.props.data.CurChat.name}</span>
                                        <span className="message-data-time">{t}</span>
                                    </div>
                                    <div className="message other-message">
                                        {message.content}
                                    </div>
                                </li>
                            );
                        }
                    });
                    
                }
            }
        }
        $('#chatHistory').scrollTop(100);
        console.log("scroll");
        return (
            <div className="chat-history" id="chatHistory">
                <ul className="ul-data">
                    {message}
                </ul>
            </div>

        );
    }
}

export default compose(
    firestoreConnect((props) => {
        let id = null;
        if (!(props.data.CurChat === null)) {
            if (props.data.auth.uid >= props.data.CurChat.id) {
                id = props.data.auth.uid + props.data.CurChat.id;
            } else {
                id = props.data.CurChat.id + props.data.auth.uid;
            }
        }
        return [{ collection: 'messages', doc: id }
        ]
    }),
    connect(({ firestore: { ordered } }, props) => {
        return ({
            messages: ordered.messages
        })
    })
)(ChatHistory)