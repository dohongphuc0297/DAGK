import React from 'react';
import { connect } from 'react-redux';

const PeopleList = (props)=>{
    return (
        <div className="people-list" id="people-list">
                    <div className="search">
                        <input type="text" placeholder="search" />
                        <i className="fa fa-search"></i>
                    </div>
                    <ul className="ul-data list">
                        <li className="clearfix">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                            <div className="about">
                                <div className="name">Vincent Porter</div>
                                <div className="status">
                                    <i className="fa fa-circle online"></i> online
            </div>
                            </div>
                        </li>

                        <li className="clearfix">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg" alt="avatar" />
                            <div className="about">
                                <div className="name">Aiden Chavez</div>
                                <div className="status">
                                    <i className="fa fa-circle offline"></i> left 7 mins ago
            </div>
                            </div>
                        </li>
                    </ul>
                </div>

    );
}

const mapStateToProps = (state) => {
    return ({
        user: state.user
    })
};

export default connect(mapStateToProps)(PeopleList);