import React from "react"
import GlobalContext from "../globals/GlobalContext"

export default class Header extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);
        this.state = {
            onlineUsers: 0,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.appLoaded) {
            this.context.socketIo.on('user-count-update', count => {
                this.setState({onlineUsers: count})
            })
        }
    }

    render() {
        return (
            <div className="header">
                <h1 className="title">React Chat</h1>
                <button className="btn btn-primary" onClick={this.props.onUsersButtonClicked}>
                    <i className="far fa-caret-square-left" />
                    <span className="online-count">Online ({this.state.onlineUsers})</span>
                </button>
            </div>
        )
    }
}