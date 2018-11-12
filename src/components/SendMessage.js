import React from 'react';
import { connect } from 'react-redux';
import { sendMessage, uploadImage } from "../actions/index";
import $ from 'jquery';

const SendMessage = (props) => {
    let input
    //console.log(props);
    // event key press enter and shift+enter
    $('#textBox').on('keypress', function (e) {
        if (e.key === 'Enter') {
            if (!e.shiftKey) {
                e.preventDefault();
                $('#btnSend').trigger('click');
            }
        }
    });
    return (
        <div className="chat-message clearfix">
            <div className="upload-btn-wrapper">
                <input id="inputUpload" type="file" name="upload" onChange={(e) => {
                    e.preventDefault();
                    let file = e.target.files[0];
                    
                    props.upload(props.data.CurChat, file);
                    e.target.value = '';
                }} accept="image/png, image/jpeg" />

                <button className="btn-add-image" onClick={(e) => {
                    //e.preventDefault();
                    $('#inputUpload').trigger('click');
                }}><img className="add-image" src="./add_image.svg" alt="" /></button>
            </div>
            <textarea id="textBox" name="message-to-send" ref={node => input = node} placeholder="Type your message (shift + enter to begin a new line)" rows="1"></textarea>
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

const mapStateToProps = state => {
    return { CurChat: state.reducers.auth.curChat }
}

const mapDispatchToProps = (dispatch) => ({
    send: (people, message) => dispatch(sendMessage(people, message)),
    upload: (people, file) => dispatch(uploadImage(people, file))
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);