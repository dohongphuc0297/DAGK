import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import $ from 'jquery';
import { scroll, addMessages } from "../actions/index";

class ChatHistory extends React.Component {

    //time format hh:mm AM/PM
    getTimeFormat(time) {
        if (time.getHours() >= 12) {
            return ((time.getHours() - 12) >= 10 ? "" : "0") + (time.getHours() - 12) + ":" + (time.getMinutes() >= 10 ? "" : "0") + time.getMinutes() + " PM";
        } else {
            return (time.getHours() >= 10 ? "" : "0") + time.getHours() + ":" + (time.getMinutes() >= 10 ? "" : "0") + time.getMinutes() + " AM";
        }
    }

    //function get time when offline
    getTime(time) {
        const today = new Date();
        if (time.getFullYear() === today.getFullYear() && time.getMonth() === today.getMonth() && time.getDate() === today.getDate()) {
            return this.getTimeFormat(time) + ", Today";
        } else {
            return this.getTimeFormat(time) + ", " + time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();
        }
    }

    componentDidMount() {
        if (!(this.props.messages === undefined)) {
            if (!(this.props.messages.contents === undefined)) {

                this.props.addMessages(this.props.message);
            }
        }
    }

    componentDidUpdate() {
        //roll to bottom when done render
        if (!(this.props.messages === undefined)) {
            if (!(this.props.messages.contents === undefined)) {
                $('#chatHistory').scrollTop(this.props.messages.contents.length * 341);
            }
        }
    }

    render() {
        var message = null;
        if (!(this.props.messages === undefined)) {
            if (!(this.props.messages.contents === undefined)) {
                var messages = this.props.messages.contents;
                //map message to render
                message = messages.map((message, index) => {
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
                                <div id={"content-message_" + index} className="message my-message float-right">
                                    {message.content}
                                </div>
                                <img id={"img-message_" + index} onError={(e) => {
                                    $("#img-message_" + index).remove();
                                }} className="img-message" src={message.content} alt="" />
                            </li>
                        );
                    } else {
                        return (
                            <li className="clearfix" key={index}>
                                <div className="message-data">
                                    <span className="message-data-name"><i className="fa fa-circle online"></i> {this.props.data.CurChat ? this.props.data.CurChat.name : ""}</span>
                                    <span className="message-data-time">{t}</span>
                                </div>
                                <div id={"content-message_" + index} className="message other-message">
                                    {message.content}
                                </div>
                                <img id={"img-message_" + index} onError={(e) => {
                                    $("#img-message_" + index).remove();
                                }} className="img-message img-left" src={message.content} alt="" />
                            </li>
                        );
                    }
                });
            }
        }

        return (
            <div className="chat-history" id="chatHistory">
                <ul className="ul-data">
                    {this.props.data.CurChat !== undefined ? this.props.data.CurChat !== null ? message !== [] ? message !== null ? message : null : <img className="img-loading" src="./loading.gif" id="img-loading" alt="" /> : null : null}
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    scroll: () => dispatch(scroll()),
    addMessages: (messages) => dispatch(addMessages(messages))
});

export default compose(
    firestoreConnect((props) => {
        let id = null;
        if (!(props.data.CurChat === null) && !(props.data.CurChat === undefined)) {
            if (props.data.auth.uid >= props.data.CurChat.id) {
                id = props.data.auth.uid + props.data.CurChat.id;
            } else {
                id = props.data.CurChat.id + props.data.auth.uid;
            }
            return [{ collection: 'messages', doc: id }]
        } else return [];
    }),
    connect(({ firestore: { ordered } }, props) => {
        //console.log(props);
        return ({
            messages: ordered.messages && ordered.messages[0]
        })
    }, mapDispatchToProps)
)(ChatHistory)