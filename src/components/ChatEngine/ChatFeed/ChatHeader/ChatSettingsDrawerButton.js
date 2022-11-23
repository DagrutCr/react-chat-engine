import React, { useState, useContext } from 'react'

import { SettingOutlined, CloseOutlined } from '@ant-design/icons'

import { ChatEngineContext } from 'react-chat-engine'

import ChatSettings from '../../ChatSettings'

const ChatSettingsDrawer = props => {
    const context = useContext(ChatEngineContext)
    const { setIsOpen } = props;

    return (
        <div> 
            <SettingOutlined
                onClick={() => setIsOpen(true)}
                style={{
                    color: 'rgb(24, 144, 255)',
                    outline: 'none',
                    fontSize: '1.5em',
                }} 
            />
        </div>
    );
}

export default ChatSettingsDrawer
