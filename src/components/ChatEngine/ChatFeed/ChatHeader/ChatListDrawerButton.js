import React, { useState, useContext } from 'react'

import { MenuOutlined } from '@ant-design/icons'

import { ChatEngineContext } from '../../../Context'

import ChatList from '../../ChatList'

const ChatListDrawer = props => {
    const context = useContext(ChatEngineContext)
    const { setIsOpen } = props;

    return (
        <div> 
            <MenuOutlined
                onClick={() => setIsOpen(true)}
                style={{
                    color: 'rgb(24, 144, 255)',
                    outline: 'none',
                    fontSize: '1.5em',
                }} 
            />
        </div>
    )
}

export default ChatListDrawer
