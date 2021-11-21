import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [messages, setMessages] = useState([]);
  const [isMessageAddLoading, setIsMessageAddLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract.getMessages().then(setMessages);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known

    setIsMessageAddLoading(true);

    contract
      .addMessage(
        { text: message.value, createdAt: Date.now().toString() },
        BOATLOAD_OF_GAS,
        Big(donation.value || '0')
          .times(10 ** 24)
          .toFixed()
      )
      .then(() => {
        setIsMessageAddLoading(false);
        contract.getMessages().then((messages) => {
          setMessages(messages);
          message.value = '';
          donation.value = SUGGESTED_DONATION;
          fieldset.disabled = false;
          message.focus();
        });
      })
      .catch((err) => {
        if (err && err.message) {
          setError(
            err.message.slice(
              err.message.indexOf('panicked:') + 10,
              err.message.indexOf(', filename')
            )
          );
        }
      });
  };

  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, 'NEAR Guest Book');
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main>
      <header>
        <h1>NEAR Guest Book</h1>
        {currentUser ? (
          <button onClick={signOut}>Log out</button>
        ) : (
          <button onClick={signIn}>Log in</button>
        )}
      </header>
      {currentUser ? (
        <Form
          onSubmit={onSubmit}
          isMessageAddLoading={isMessageAddLoading}
          error={error}
          currentUser={currentUser}
        />
      ) : (
        <SignIn />
      )}
      {!!currentUser && !!messages.length && (
        <Messages
          isMessageAddLoading={isMessageAddLoading}
          messages={messages}
        />
      )}
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
