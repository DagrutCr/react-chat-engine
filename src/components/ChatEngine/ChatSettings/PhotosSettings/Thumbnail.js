import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { getFileName, isImage } from '../../ChatFeed/Messages/Bubble/file'

import { ChatEngineContext } from 'react-chat-engine'

const Thumbnail = props => {
    const { openAttachment } = useContext(ChatEngineContext);
    const { attachment } = props 

    if (!attachment) { return <div /> }

    const fileName = getFileName(attachment.file);

    return (
        <div
            style={styles.container}
            className='ce-photo-thumbnail'
            onClick={() => openAttachment(attachment, 'image')}
        >
            <div style={{ paddingTop: '100%' }} />
            
            {(isImage(fileName) ? (
                <img
                    alt={attachment.id}
                    style={styles.image}
                    src={attachment.file}
                    className='ce-photo-img'
                    id={`image-${attachment.id}`}
                />
            ) : (
                <div 
                    alt={attachment.id}
                    style={styles.file}
                    className='ce-settings-file'
                    id={`image-${attachment.id}`}
                >
                    {fileName}
                </div>
            ))}
        </div>
    )
}

export default Thumbnail

const styles = {
    container: { 
        position: 'relative',
        width: 'calc(33% - 8px)',
        border: '1px solid white',
        display: 'inline-block',
        cursor: 'pointer'
    },
    image: {
        top: '0px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        objectFit: 'cover'
    },
    file: {
        top: '0px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        overflow: 'auto',
        padding: '10px 5px',
    },
}

Thumbnail.propTypes = {
    attachment: PropTypes.object.isRequired,
}