import React, { Component } from 'react';
import { MDBCard, MDBRow,  MDBCardBody, MDBIcon} from "mdbreact";
import '../Messages/messages.css';



class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <MDBCard
      className="my-5 px-5 pt-4"
      style={{ fontWeight: 300, maxWidth: 600 }}
    >
      <MDBCardBody className="py-0">
        <MDBRow>
                <li className="post-it">
                <div className="news">
                <div className="label">
                  <img
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(18)-mini.jpg"
                    alt=""
                    className="rounded-circle z-depth-1-half"
                  />
                </div>
<div className="excerpt">
                  <div className="brief">
                  {editMode ? (
            <input
                type="text"
                value={editText}
                onChange={this.onChangeEditText}
            />
            ) : (
            <span>
                <strong>{message.userId } posted in her page </strong><br></br> </span>
            )}
                    <div className="date">2 days ago</div>
                  </div>
                  <div className="added-text">
                  {message.text}
                <br></br> {message.editedAt && <span>(Edited)</span>}

                  </div>
                  <div className="feed-footer">
                    <a href="#!" className="like">
                      <MDBIcon icon="heart" />
                      <span>7 likes</span>
                      <span>
           {editMode ? (
              <span>
                   <br></br>
                   <MDBIcon onClick={this.onSaveEditText} icon="check-circle" />
                   <span> Save </span> 
                   <br></br>
                   <MDBIcon onClick={this.onToggleEditMode} icon="times-circle" />
                   <span> Delete </span>
              </span>
            ) : (
               <MDBIcon onClick={this.onToggleEditMode} icon="edit" />
              
            )}

            {!editMode && (
           
              <MDBIcon onClick={() => onRemoveMessage(message.username)} icon="trash" />
              
            )}
          </span>
                    </a>
                  </div>
                </div>
                </div>
                </li>
                </MDBRow>

                </MDBCardBody>
                </MDBCard>
    );
  }
}

export default MessageItem;