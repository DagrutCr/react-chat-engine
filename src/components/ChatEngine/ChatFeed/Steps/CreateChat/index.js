import React, { useState } from 'react'
import { newChat } from '../../../../../actions/chats'
import { TextInput } from '../../../../../components/ChatEngine/components/Input'
import Button from '../../../../../components/ChatEngine/components/Button'

const CreateChat = (props) => {
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
                <b>No chat room found, start by creating one</b>
                <br />
                <TextInput
                    type="text"
                    label="Chat room name"
                    handleChange={onChange}
                />
                <Button type="submit" value="Create" />
            </form>
        </div>
    )
}

export default CreateChat
