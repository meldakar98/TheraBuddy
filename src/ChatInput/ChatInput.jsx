import React, { useState } from 'react';
import '../style.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function ChatInput(props) {
  const activeChannelId = 1;
  const { className, onSubmit } = props;
  const [value, setValue] = useState('');

  const onClick = (e) => {
    if (value) {
      onSubmit(value,e);
      setValue('');
    }
  };

  const onKeyDown = (e) => {
    if (e.code === 'Enter') {
      onClick(e);
    }
  };

  return (
    <div
      className={
        classNames(
          'd-flex flex-column',
          className,
        )
      }
    >

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Aa"
          aria-label="ChatInput"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className="input-group-append">
          <button type="button" disabled={activeChannelId <= 0} className="btn btn-primary" onClick={onClick}>
            <i className="fas fa-paper-plane" />
          </button>
        </div>
      </div>
    </div>
  );
}

ChatInput.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

ChatInput.defaultProps = {
  className: null,
  onSubmit: null,
};

export default ChatInput;
