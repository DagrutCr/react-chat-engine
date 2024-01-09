import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'

import { ChatEngineContext, getLatestChats, getChatsBefore } from 'react-chat-engine'

import { getDateTime } from '../Utilities/timezone'

import _ from 'lodash'

import ChatLoader from './ChatLoader'
import NewChatForm from './NewChatForm'
import ChatCard from './ChatCard'

const interval = 33

const ChatList = props => {
    const didMountRef = useRef(false)
    const [latestChatLoading, setLatestChatLoading] = useState(false);
    const [loadChats, setLoadChats] = useState(false) // true, false, or loading
    const [hasMoreChats, setHasMoreChats] = useState(true)
    const { conn, chats, setChats, setActiveChat } = useContext(ChatEngineContext)

    const chatList = sortChats(
        chats ? 
        Object.values(chats) : 
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    )

    const anyLoading = useMemo(() => (
        !!(loadChats || latestChatLoading)
    ), [loadChats, latestChatLoading]);

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true

            setLatestChatLoading(true);
            getLatestChats(
                props, 
                interval, 
                (chats) => {
                    onGetChats(chats)
                    chats.length > 0 && setActiveChat(chats[0].id)
                    setLatestChatLoading(false);
                }
            )
        }
    })

    useEffect(() => {
        if (!loadChats || loadChats === 'loading') return;
        setLoadChats('loading')

        const chatList = (chats !== null ? sortChats(Object.values(chats)) : []).filter(a => a)
        if (chatList.length > 0) {
            const before = chatList[chatList.length - 1].created
            getChatsBefore(props, before, interval, (chats) => onGetChats(chats))
        }
    }, [loadChats])

    function sortChats(chats) {
        return chats.sort((a, b) => { 
            const aDate = a.last_message && a.last_message.created ? getDateTime(a.last_message.created) : getDateTime(a.created)
            const bDate = b.last_message && b.last_message.created ? getDateTime(b.last_message.created) : getDateTime(b.created)
            return new Date(bDate) - new Date(aDate); 
        })
    }

    function onGetChats(chatList) {
        setLoadChats(false)
        const oldChats = chats !== null ? chats : {}
        const newChats = _.mapKeys({...chatList}, 'id')
        const allChats = {...oldChats, ...newChats}
        setChats(allChats);
        interval > chatList.length && setHasMoreChats(false);
    }

    function renderChats(chats) {
        return chats.map((chat, index) => {
            if (!chat) {
                return <div key={`chat_${index}`} />

            } else if (props.renderChatCard) {
                return <div key={`chat_${index}`}>{props.renderChatCard(chat, index)}</div>
                
            } else {
                return (
                    <div 
                        key={`chat_${index}`}
                        onClick={() => !anyLoading && props.onChatClick && props.onChatClick(chat.id)}
                    >
                        <ChatCard chat={chat} spinner={anyLoading} />
                    </div>
                )
            }
        })
    }

    return (
        <div style={styles.chatListContainer} className='ce-chat-list'>
            <div style={styles.chatsContainer} className='ce-chats-container'>
                { 
                    props.renderNewChatForm ? 
                    props.renderNewChatForm(conn) : 
                    <NewChatForm onClose={props.onClose ? () => props.onClose() : undefined} /> 
                }

                { renderChats(chatList) } 

                { 
                    hasMoreChats && chatList.length > 0 &&
                    <div>
                        <ChatLoader 
                            onVisible={() => !loadChats && setLoadChats(true)} />
                        <div style={{  height: '8px' }} />
                    </div>
                }
            </div>
        </div>
    )
}

const styles={
    chatListContainer: { 
        height: '100%', 
        maxHeight: '100vh', 
        overflow: 'scroll', 
        overflowX: 'hidden',
        borderRight: '1px solid #afafaf', 
        backgroundColor: 'white'
    },
    chatsContainer: { 
        width: '100%', 
        height: '100%',
        backgroundColor: 'white', 
        borderRadius: '0px 0px 24px 24px'
    },
}

export default ChatList;
