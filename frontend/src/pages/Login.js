import React from 'react'
import GlobalContext from "../globals/GlobalContext"
import '../css/Login.css'

export default class Login extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props)
        this.state = {
            nameInput: '',
            errorNameInUse: false,
        }
    }

    componentDidMount() {
        this.context.socketIo.on('login-success', () => {
            this.props.onLogin(this.state.nameInput)
        })
        this.context.socketIo.on('login-name-in-use', () => {
            this.setState({errorNameInUse: true})
        })
    }

    render() {
        const nameInUseMessage = (
            <div className="invalid-feedback">
                Sorry, than name is currently in use.
            </div>
        )

        return (
            <div className="login-container">
                <div className="jumbotron login">
                    <h1 className="display-6">Login</h1>
                    <p>Please select a name to join with.</p>
                    <form onSubmit={this._submit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className={'form-control' + (this.state.errorNameInUse ? ' is-invalid' : '')}
                                placeholder="Nickname"
                                autoFocus
                                value={this.state.nameInput}
                                onChange={this._updateInput}
                            />
                            { this.state.errorNameInUse ? nameInUseMessage : null}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Join</button>
                    </form>
                </div>
            </div>
        )
    }

    _updateInput = event => {
        this.setState({nameInput: event.target.value})
    }

    _submit = event => {
        event.preventDefault();

        this.context.socketIo.emit('login', this.state.nameInput);
    }
}
