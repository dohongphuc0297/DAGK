import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from "../actions/index";

const SendMessage = (props) => {
    let input
    console.log(props);
    return (
        <div className="chat-message clearfix">
            <textarea name="message-to-send" ref={node => input = node} placeholder="Type your message" rows="3"></textarea>

            <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>
            <button onClick={() => {
                if (!input.value.trim()) {
                    return
                }
                props.send(props.data.CurChat, input.value);
                input.value = '';
            }}
                className="btn-send">Send</button>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    send: (people, message) => dispatch(sendMessage(people, message))
});

export default connect(undefined, mapDispatchToProps)(SendMessage);