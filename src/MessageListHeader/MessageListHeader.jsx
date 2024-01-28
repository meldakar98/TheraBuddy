import React from 'react';
import PropTypes from 'prop-types';
import '../style.css';
import { Modal, Button, CloseButton } from 'react-bootstrap';

function MessageListHeader(props) {
  const { data, show, handleShow, handleClose, handleSubmit } = props;
  return (
    <div className="d-flex flex-row bg-white p-3 justify-content-between">
      <div className="d-flex align-items-center">
        {
          data.avatarUrl
            ? (
              <img
                className="w-50px h-50px bg-light-blue rounded-circle border-0 img-fluid"
                alt="avatar"
                src={data.avatarUrl}
              />
            )
            : (
              <button type="button" className="btn btn-success rounded-circle border-0 w-40px h-40px">
                <i className="fas fa-users" />
              </button>
            )
        }
      </div>
      <div className="d-none d-sm-flex flex-1 flex-column justify-content-center ml-1 overflow-hidden">
        {data.title}
      </div>
      <CloseButton variant="primary" onClick={handleShow} style={{ backgroundColor: 'white', border: 'none' }}>
        <i className="fas fa-times "  />
      </CloseButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Möchtest du dieses Gespräch speichern</Modal.Title>
        </Modal.Header>
        <Modal.Body>sollst du das Gespräch hilfreich empfonden haben, Kannst du dieses auch speichern </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

MessageListHeader.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

MessageListHeader.defaultProps = {
  data: {},
};

export default MessageListHeader;
