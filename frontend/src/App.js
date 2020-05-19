import React from 'react'
import GlobalContext from "./globals/GlobalContext"
import SocketIo from "socket.io-client"
import Header from './components/Header';
import UserList from './components/UserList';
import Login from './pages/Login'
import Chat from './pages/Chat'
import './css/App.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            onlineUsers: 0,
            userListOpen: false,
            loaded: false,
        }
    }

    componentDidMount() {
        this.socketIo = SocketIo('http://localhost:3123')
        this.setState({loaded: true})
    }

    render() {
        return (
            <GlobalContext.Provider value={{socketIo: this.socketIo}}>
                <div className="app">
                    <Header
                        appLoaded={this.state.loaded}
                        onUsersButtonClicked={this._toggleUserList}
                    />
                    {this._getPage()}
                    <UserList
                        appLoaded={this.state.loaded}
                        authenticated={Boolean(this.state.name)}
                        listOpen={this.state.userListOpen}
                    />
                </div>
            </GlobalContext.Provider>
        );
    }

    _setName = name => {
        this.setState({name})
    }

    _getPage() {
        let view;
        if (!this.state.loaded) {
            view = <div>Loading...</div>
        } else if (this.state.name === '') {
            view = <Login onLogin={this._setName} />
        } else {
            view = <Chat name={this.state.name} />
        }
        return view;
    }

    _toggleUserList = () => {
        this.setState(state => ({
            userListOpen: !state.userListOpen,
        }))
    }
}
