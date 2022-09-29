import React, { useState, createContext } from 'react'

import {
    formatTime as internalFormatTime,
    formatDate as internalFormatDate,
    formatDateTime as internalFormatDateTime,
    formatDateTimeAgo as internalFormatDateTimeAgo,
} from '../ChatEngine/Utilities/timezone';

export const ChatEngineContext = createContext()

export const ChatEngineWrapper = props => {
    const [connecting, setConnecting] = useState(true)
    const [conn, setConn] = useState(null)
    const [creds, setCreds] = useState(null)
    const [sessionToken, setSessionToken] = useState('')
    const [chats, setChats] = useState(null)
    const [messages, setMessages] = useState({})
    const [activeChat, setActiveChat] = useState(null)
    const [typingCounter, setTypingCounter] = useState({})
    const [loadMoreMessages, setLoadMoreMessages] = useState(false)
    const [isBottomVisible, setIsBottomVisible] = useState(false)

    const translate = (text, component, dom) => {
        if (!props.translate) return (dom || text);

        const translated = props.translate(text, component, dom);
        if (!translated && typeof translated !== 'string') {
            return (dom || text);
        }

        return (translated);
    };

    const formatDateTime = (dateObj, format) => {
        if (props.formatDateTime) {
            return (props.formatDateTime(dateObj, format));
        }

        switch (format) {
            case 'date':
                return (internalFormatDate(dateObj));
            case 'time':
                return (internalFormatTime(dateObj));
            case 'datetime':
                return (internalFormatDateTime(dateObj));
            case 'ago':
                return (internalFormatDateTimeAgo(dateObj));
            default:
                return ('');
        }
    };

    const openAttachment = (attachment, type) => {
        if (props.openAttachment) {
            props.openAttachment(attachment, type);
        } else {
            window.open(attachment.file)
        }
    };

    const htmlMessageTransform = typeof props.htmlMessageTransform === 'function' ? props.htmlMessageTransform : null;

    const value = {
        connecting, setConnecting,
        conn, setConn,
        creds, setCreds,
        sessionToken, setSessionToken,
        chats, setChats,
        messages, setMessages,
        activeChat, setActiveChat,
        typingCounter, setTypingCounter,
        loadMoreMessages, setLoadMoreMessages,
        isBottomVisible, setIsBottomVisible,
        translate,
        formatDateTime,
        openAttachment,
        htmlMessageTransform,
    }

    return (
        <ChatEngineContext.Provider value={value}>
            {props.children}
        </ChatEngineContext.Provider>
    )
}
