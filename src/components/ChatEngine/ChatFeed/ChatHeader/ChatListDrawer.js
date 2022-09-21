import React, { useState, useContext } from 'react'

import { MenuOutlined } from '@ant-design/icons'

import { ChatEngineContext } from '../../../Context'

import ChatList from '../../ChatList'

const ChatListDrawer = props => {
    const {chatListIsOpen, setChatListIsOpen} = props
    const context = useContext(ChatEngineContext)
    const allProps = {...props, ...context.conn}

    return (
        <div>
            { 
                chatListIsOpen &&
                <div style={styles.drawerContainer}>
                    {
                        context.conn !== null && context.conn.renderChatList ?
                        context.conn.renderChatList(context) :
                        <ChatList 
                            {...allProps} 
                            onClose={() => setChatListIsOpen(false)} 
                            onChatClick={() => setChatListIsOpen(false)} 
                        />
                    }
                </div>
            }
        </div>
    )
}

export default ChatListDrawer

const styles = {
    drawerContainer: { 
        position: 'absolute',
        zIndex: '1',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        textAlign: 'left'
    },
    titleContainer: {
        width: '100%',
        padding: '24px 0px',
        textAlign: 'center',
        color: 'rgb(24, 144, 255)',
    },
    titleText: {
        fontSize: '24px',
        fontWeight: '600',
    }
}
