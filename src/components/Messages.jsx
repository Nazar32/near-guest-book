import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export default function Messages({ messages }) {
  return (
    <>
      <h2>Messages</h2>
      <MessagesContainer>
        {messages.map((message, i) => (
          <MessageWrapper key={i} premium={message.premium}>
            {message.createdAt?.length &&
            !Number.isNaN(Number(message.createdAt)) ? (
              <CreatedAtLabel>
                {new Date(Number(message.createdAt)).toLocaleString()}
              </CreatedAtLabel>
            ) : (
              ''
            )}
            <strong>{message.sender}</strong>:<br />
            {message.text}
          </MessageWrapper>
        ))}
      </MessagesContainer>
    </>
  );
}

const CreatedAtLabel = styled.div`
  font-size: 0.6rem;
  color: var(--gray);
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MessageWrapper = styled.div`
  overflow: hidden;
  padding: 16px 32px;
  width: 300px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  margin: 0 16px 16px 0;

  ${(p) =>
    p.premium &&
    css`
      border-left: 0.5em solid #ffc837;
    `}
`;

Messages.propTypes = {
  messages: PropTypes.array,
};
