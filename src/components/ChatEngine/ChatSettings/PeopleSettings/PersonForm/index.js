import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { ChatEngineContext } from 'react-chat-engine'

import { addPerson, getOtherPeople } from 'react-chat-engine'

import { AutoCompleteInput } from 'react-chat-engine'

import PersonOption from './PersonOption'

const PersonForm = props => {
  const { userCallbacks: { translate } } = useContext(ChatEngineContext) 
  const [state, setState] = useState({
    value: '',
    others: []
  })

  function handleChange(value) {
    setState({ ...state, value });
  }

  function invitePerson(name) {
    addPerson(
      props.conn,
      props.chat.id,
      name,
      () => { 
        setState({ ...state, value: '' }); 
        getOthers(); 
      }
    )
  }

  function getOthers() {
    getOtherPeople(
      props.conn,
      props.chat.id,
      (id, others) => setState({ ...state, others }),
      () => {},
    )
  }

  function renderOption(option) {
    return <PersonOption person={option} onClick={() => invitePerson(option.username)} />
  }

  return (
    <div style={{ marginBottom: '12px' }}>
      <AutoCompleteInput 
        style={{ width: '100%' }}
        label={translate('Type a username', 'PersonForm')}
        value={state.value}
        options={state.others}
        onFocus={() => getOthers()}
        handleChange={(value) => handleChange(value)} 
        renderOption={(option) => renderOption(option)}
        max={-1}
      />
    </div>
  )
}

export default PersonForm

PersonForm.propTypes = {
  chat: PropTypes.object.isRequired,
  conn: PropTypes.object.isRequired,
}