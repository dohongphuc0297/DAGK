import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from "../actions/index";
import $ from 'jquery';

const SendMessage = (props) => {
    let input
    //console.log(props);
    // event key press enter and shift+enter
    $('#textBox').on('keypress', function (e) {
        if(e.key === 'Enter'){
            if(!e.shiftKey){
                e.preventDefault();
                $('#btnSend').trigger('click');
            }
        }
  });
    return (
        <div className="chat-message clearfix">
            <textarea id="textBox" name="message-to-send" ref={node => input = node} placeholder="Type your message" rows="1"></textarea>
            <button onClick={() => {
                if (!input.value.trim()) {
                    return
                }
                props.send(props.data.CurChat, input.value);
                input.value = '';
            }}
                className="btn-send" id="btnSend">Send</button>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    send: (people, message) => dispatch(sendMessage(people, message))
});

export default connect(undefined, mapDispatchToProps)(SendMessage);