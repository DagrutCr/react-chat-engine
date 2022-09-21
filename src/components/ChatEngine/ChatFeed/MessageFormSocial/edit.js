import React, { useState } from 'react';

import { editMessage } from 'react-chat-engine'

import { Button, TextInput } from 'react-chat-engine'

import { ChatEngineContext } from '../../../Context'

const MessageEditForm = props => {
  const { translate } = useContext(ChatEngineContext)
  const [value, setValue] = useState('')

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    editMessage(
      props.conn,
      props.chatId,
      props.message.id,
      { text: value },
      (data) => { }
    )
  }
  return (
    <form onSubmit={handleSubmit.bind(this)}>
      <TextInput
        type="text"
        label={translate('Edit message...')}
        value={value}
        style={{ width: 'calc(100% - 84px)' }}
        handleChange={handleChange.bind(this)}
      />
      <Button type="submit" value={translate('Edit')} />
    </form>
  );
}

export default MessageEditForm