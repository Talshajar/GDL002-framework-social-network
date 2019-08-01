import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from './MessageList';
import { SignUpPageStyle }  from '../SignUp/SignUpStyle'
import { MDBCard, MDBCardBody, MDBRow, MDBIcon, MDBBtn } from 'mdbreact';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 3,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            username: key,
          }));

          this.setState({
            messages: messageList,
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { username, ...messageSnapshot } = message;

    this.props.firebase.message(message.username).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = username => {
    this.props.firebase.message(username).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 3 }),
      this.onListenForMessages,
    );
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
        
          <div className="container">
            {!loading && messages && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                authUser={authUser}
                messages={messages}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

     


            <MDBCard
      className="my-5 px-5 pt-4"
      style={{ fontWeight: 300, maxWidth: 600 }}
    >
       <MDBCardBody className="py-0">
  <MDBRow>

<form
              onSubmit={event =>
                this.onCreateMessage(event, authUser)
              }
            >
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
                placeholder="What´s on your mind...?"
              />
                <MDBBtn type="submit" tag="a" size="lg" floating gradient="purple"> send </MDBBtn>
               {/* <MDBBtn color="primary" rounded type="submit">Send</MDBBtn> */}
              
            </form>
            </MDBRow>
            </MDBCardBody>
            </MDBCard>






          </div>
         
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);