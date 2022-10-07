import React, { useState, useContext } from 'react'

import { LoadingOutlined } from '@ant-design/icons'

import { ChatEngineContext } from 'react-chat-engine'

const Thumbnail = props => {
    const { userCallbacks: { openAttachment } } = useContext(ChatEngineContext);
    const [hovered, setHovered] = useState(false)
    const { attachment } = props
    const style={ 
        ...styles.thumbnail, 
        ...{ border: hovered ? '1px solid #1890ff' : '1px solid #fff' } 
    }

    if (!attachment) {
        return (
            <div style={styles.loadingContainer}>
                <LoadingOutlined  style={{ color: 'white', padding: '4px', fontSize: '24px' }} />
            </div>
        )
    }

    return (
        <img 
            onClick={() => openAttachment(attachment, 'image')}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            src={attachment.file}
            alt={'thumb-nail'}
            style={style}
        />
    )
}

export default Thumbnail

const styles = {
    loadingContainer: {
        width: '100%', 
        cursor: 'pointer',
        textAlign: 'right', 
        display: 'inline-block', 
        objectFit: 'cover',
        borderRadius: '0.3em',
        marginRight: '2px',
        marginBottom: '4px',
        height: '30vw', 
        width: '30vw', 
        maxHeight: '200px',
        maxWidth: '200px',
        minHeight: '100px',
        minWidth: '100px',
        backgroundColor: '#d9d9d9',
    },
    thumbnail: { 
        width: '100%', 
        cursor: 'pointer',
        textAlign: 'right', 
        display: 'inline', 
        objectFit: 'cover',
        borderRadius: '0.3em',
        paddingRight: '2px',

        height: '30vw', 
        width: '30vw', 
        maxHeight: '200px',
        maxWidth: '200px',
        minHeight: '100px',
        minWidth: '100px',
    }
}