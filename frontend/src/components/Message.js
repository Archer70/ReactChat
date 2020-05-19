import React from 'react';
import '../css/Message.css';

export default class Message extends React.Component {
    render() {
        const message = this.props.message
        const notificationClass = this.props.message.hasOwnProperty('isServer')
            ? ' is-server'
            : ''

        return (
            <div className={'message' + notificationClass}>
                <div>
                    <strong>{message.name}</strong>
                </div>
                <div className="message-body">{message.text}</div>
            </div>
        )
    }
}