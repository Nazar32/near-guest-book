import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Big from 'big.js';
import { Loader } from './Loader';

export default function Form({
  error,
  onSubmit,
  isMessageAddLoading,
  currentUser,
}) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Sign the guest book, {currentUser.accountId}!</p>
        <p className="highlight">
          <label htmlFor="message">Message:</label>
          <input autoComplete="off" autoFocus id="message" required />
        </p>
        <p>
          <label htmlFor="donation">Donation (optional):</label>
          <input
            autoComplete="off"
            defaultValue={'0'}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>
        <SubmitContainer>
          <button type="submit">Sign</button>
          {isMessageAddLoading && !error && <StyledLoader />}
          <ErrorContainer>{error}</ErrorContainer>
        </SubmitContainer>
      </fieldset>
    </form>
  );
}

const ErrorContainer = styled.div`
  margin-left: 1rem;
  color: var(--tertiary);
`;

const StyledLoader = styled(Loader)`
  margin-left: 1rem;
`;

const SubmitContainer = styled.div`
  display: flex;
  align-items: center;
`;

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
};
