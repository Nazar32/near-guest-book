import { PostedMessage, messages } from './model';

// --- contract code goes below

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(text: string, createdAt: string): void {
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text, createdAt);
  for (let i = 0; i < messages.length; i++) {
    assert(
      messages[i].sender.toString() === message.sender.toString(),
      'Current sender has already signed a message!'
    );
  }
  // Adding the message to end of the the persistent collection
  messages.push(message);
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getMessages(): PostedMessage[] {
  const result = new Array<PostedMessage>(messages.length);
  for (let i = 0; i < messages.length; i++) {
    result[i] = messages[i];
  }
  return result;
}
