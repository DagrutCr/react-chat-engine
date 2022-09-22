import React, { useContext } from 'react'

import { ChatEngineContext } from 'react-chat-engine'

const IceBreaker = () => {
    const { translate } = useContext(ChatEngineContext)
    return (
        <div
            id='ce-ice-breaker-chat'
            style={{ width: '100%', textAlign: 'center', paddingTop: 'calc(43% - 112px)' }}
        >
            <div 
                id='ce-ice-breaker-text' 
                style={{ color: '#afafaf', fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}
            >
                {translate('No messages here yet...', 'IceBreaker')}
            </div>
        </div>   
    )
}

export default IceBreaker
