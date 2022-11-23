import React, { useState } from 'react'

import { ArrowUpOutlined } from '@ant-design/icons'

const SendButton = () => {
    const [hover, setHover] = useState(false)

    return (
        <div 
            id="ce-send-message-button"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ 
                cursor: 'pointer',
                backgroundColor: hover ? '#40a9ff' : '#1890ff',
                display: 'inline-block',
                padding: '8px 14px',
                borderRadius: '8px',
            }}
        >
            <ArrowUpOutlined style={{
                color: 'white',
                fontSize: '1.5em',
            }} />
        </div>
    );
}

export default SendButton
