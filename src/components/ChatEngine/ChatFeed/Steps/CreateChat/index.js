import React, { useState, useContext } from 'react'
import { newChat } from '../../../../../actions/chats'
import { TextInput } from '../../../../../components/ChatEngine/components/Input'
import Button from '../../../../../components/ChatEngine/components/Button'

import { ChatEngineContext } from 'react-chat-engine'

const CreateChat = (props) => {
    const { userCallbacks: { translate } } = useContext(ChatEngineContext);
    const { conn } = props;
    const [title, setTitle] = useState('');

    function onSubmit(event) {
        event.preventDefault();
        if (title) {
            newChat(
                conn,
                { title },
            );
        }
    }

    function onChange(event) {
        setTitle(event.target.value);
    }

    return (
        <div class='ce-ice-breaker-no-chat'>
            <form onSubmit={onSubmit}>
                <b>{translate('No chat room found, start by creating one', 'CreateChat')}</b>
                <br />
                <TextInput
                    type="text"
                    label={translate('Chat room name', 'CreateChat')}
                    handleChange={onChange}
                />
                <Button type="submit" value={translate('Create', 'CreateChat')} />
            </form>
        </div>
    )
}

export default CreateChat
