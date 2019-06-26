import React from 'react';
import { withAuthorization } from '../Session';
import Messages from '../Messages';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <Messages />
  </div>
);



const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);