import React from 'react';
import { withAuthorization } from '../Session';
import Messages from '../Messages';

const HomePage = () => (
  <div>
    <Messages />
  </div>
);



const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);