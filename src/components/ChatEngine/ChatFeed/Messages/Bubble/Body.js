import React, { useContext } from 'react'
import ReactHtmlParser from 'react-html-parser';
import { ChatEngineContext } from 'react-chat-engine'

const Body = props => {
    const { userCallbacks: { htmlMessageTransform } } = useContext(ChatEngineContext)
    let text = props.text ? props.text : '';
    text = text
        .replaceAll("<p>", "<div>")
        .replaceAll("</p>", "</div>")
        .replaceAll("<a ", `<a style="color: ${ props.myMessage ? 'white' : '#1890ff' };" `);

    let parserOptions = {};
    if (htmlMessageTransform) {
        parserOptions.transform = htmlMessageTransform;
    }

    return (
        <div className='ce_message'>
            {ReactHtmlParser(text, parserOptions)}
        </div>
    );
}

export default Body