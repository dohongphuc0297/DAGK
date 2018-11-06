import React from 'react';
import { connect } from 'react-redux';

const SendMessage = (props) => {
    return (
        <div className="chat-message clearfix">
            <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>

            <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>
            <button className="btn-send">Send</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
};

export default connect(mapStateToProps)(SendMessage);