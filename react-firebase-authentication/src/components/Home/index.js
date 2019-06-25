import React, { Component }from 'react';
import { compose } from 'recompose';

import { 
  withAuthorization , 
  // withEmailVerificacion 
} from '../Session';
import { withFirebase } from '../Firebase';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <Messages />
  </div>
);

class MessagesBase extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      Messages: [],
    };
  }

componentDidMount() {
  this.setState({ loading: true });

  this.props.firebase.messages().on('value', snapshot => {
  const messageObject = snapshot.val();

  if (messageObject) {
    const messageList = Object.keys(messageObject).map(key => ({
      uid: key,
    }))

  this.setState({ 
    messages: messageList,
    loading: false,
   });
  } else {
  this.setState({ messages: null, loading: false });
  }
  });

}

componentWillMount() {
  this.props.firebase.messages().off();
}

render() {
  const { messages, loading } = this.state;

  return (
    <div>
      {loading && <div>Loading ... </div>}

      {messages ? (
        <MessageList messages={messages} />
      ) : (
         <div>There are no messages</div>
      )}

      <form onSubmit={this.onCreateMessage}>
        <input
        type="text"
        value="text"
        onChange={this.onChangeText}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
}

const MessageList = ({ messages }) => (
  <ul>
    {messages.map(message => (
      <MessageItem key={message.uid} message={message} />
    ))}
  </ul>
);

const MessageItem = ({ message }) => (
  <li>
    <strong>
      {message.userId}
    </strong>
       {message.text}
  </li>
)

const condition = authUser => !!authUser;

const Messages = withFirebase(MessagesBase)

export default compose (
  // withEmailVerificacion,
  withAuthorization(condition)
)(HomePage);