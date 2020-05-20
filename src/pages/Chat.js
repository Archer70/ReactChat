import React from 'react'
import Message from '../components/Message'
import GlobalContext from "../globals/GlobalContext"
import '../css/Chat.css'

export default class Login extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props)
        this.state = {
            messageInput: '',
            messages: [],
        }
        this.messagesEnd = React.createRef()
    }

    componentDidMount() {
        this.context.socketIo.on('chat-message', message => {
            this._addMessage(message)
        })

        this.context.socketIo.on('user-joined', name => {
            this._addMessage({
                isServer: true,
                name: 'Notification',
                text: name + ' just joined!',
            })
        })

        this.context.socketIo.on('user-disconnected', name => {
            this._addMessage({
                isServer: true,
                name: 'Notification',
                text: name + ' disconnected.',
            })
        })
    }

    render() {
        const messages = this.state.messages.map(
            (message, key) => <Message key={key} message={message} />
        )
        return (
            <div className="chat-container">
                <div className="messages">
                    {messages}
                    {/* This span is used to scroll new messages into view. */}
                    <span ref={this.messagesEnd} />
                </div>
                <form className="input-section" onSubmit={this._sendMessage}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Message"
                        autoFocus
                        value={this.state.messageInput}
                        onChange={this._updateMessageInput}
                    />
                </form>
            </div>
        )
    }

    _updateMessageInput = event => {
        this.setState({messageInput: event.target.value})
    }

    _sendMessage = event => {
        event.preventDefault()
        const message = {
            name: this.props.name,
            text: this.state.messageInput,
        }

        this._addMessage(message, true)
        this.context.socketIo.emit('chat-message', message)
    }

    _addMessage(message, clearInput=false) {
        this.setState(state => ({
            messages: state.messages.concat(message),
        }), () => {
            this.messagesEnd.current.scrollIntoView({behavior: 'smooth'})
        })

        if (clearInput) {
            this.setState({messageInput: ''})
        }
    }
}
