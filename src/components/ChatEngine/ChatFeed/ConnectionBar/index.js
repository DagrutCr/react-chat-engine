import React, { useContext, useState, useEffect, useRef } from 'react'

import { ChatEngineContext } from '../../../Context'

import { SyncOutlined } from '@ant-design/icons'

const ConnectionBar = props => {
    const didMountRef = useRef(false)
    const [isVisible, setIsVisible] = useState(false)
    const { connecting, userCallbacks: { translate } } = useContext(ChatEngineContext)

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            setTimeout(
                () => setIsVisible(true), 
                props.renderDelay ? props.renderDelay : 0
            )
        }
    })

    if (!connecting || !isVisible) return <div />

    return (
        <div
            style={{
                zIndex: '1',
                bottom: '100px', 
                left: '0',
                right: '0',
                position: 'absolute',
                textAlign: 'center',
            }}
        >
            <span
                style={{
                    fontSize: '15px',
                    padding: '10px 22px', 
                    color: 'white',
                    display: 'inline-block',
                    backgroundColor: '#fa8c16',
                    borderRadius: '1.3em',
                }}
                id='ce-connecting-popup'
            >
                <SyncOutlined spin />{' '}{translate('Connecting', 'ConnectionBar')}
            </span>
        </div>
    )
}

export default ConnectionBar
