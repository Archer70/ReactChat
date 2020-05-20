import React from 'react'
import GlobalContext from "../globals/GlobalContext";

export default class UserList extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            addedListener: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.appLoaded && !this.state.addedListener) {
            this.context.socketIo.on('user-list-update', users => {
                console.log(users)
                this.setState({users})
            })
            this.setState({addedListener: true})
        }
    }

    render() {
        const users = this.state.users.map((user, key) => <li key={key}>{user}</li>);

        return (
            <div className={this._classes().join(' ')}>
                <ul>{users}</ul>
            </div>
        )
    }

    _classes = () => {
        const classes = ['user-list'];
        if (this.props.authenticated) {
            classes.push('authenticated')
        }
        if (this.props.listOpen) {
            classes.push('open')
        }
        return classes;
    }
}