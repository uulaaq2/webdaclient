import appStyle from 'app/style.css'
import React, { useState, useEffect, useRef, useContext } from 'react'
import pageInitial from 'functions/pageInitial'
import config from 'config'
import { Flash, TextInput, Box, ButtonGroup, Button, PageLayout, Heading, Text, Pagehead, FormControl, UnderlineNav } from '@primer/react'
import B_InputFormGroup from 'baseComponents/B_InputFormGroup'
import addNewGroup from 'functions/groups/addNewGroup'
import { validateInputFields, addError } from 'functions/validateInputFields'
import { checkMenuPermission } from 'functions/user/checkPermission'
import B_SectionTitle from 'baseComponents/B_SectionTitle'
import usePageInitial from 'hooks/usePageInitial'
import useAppnavigate from 'hooks/useAppnavigate'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

import { useMachine } from '@xstate/react'
import { apiMachine } from 'state/apiMachine'

const NewGroup = ({
  setMode
}) => {
  usePageInitial({ pageName: 'settings.groups.new' })
  
  const globalServices = useContext(GlobalStateContext)  
  const [ state  ] = useActor(globalServices.authService)    
  const [current, send] = useMachine(apiMachine)  
  const [newGroupMode, setNewGroupMode] = useState('details')
  const appNavigate = useAppnavigate()

  const stateObj = {
    inProgress: current.context.inProgress
  }  

  const nameRef = useRef()
  const [erroredInputs, setErroredInputs] = useState([])  
  const [inputs, setInputs] = useState({
    name: {      
      id: 'name',
      label: 'Name',
      type: 'text',
      errorText: '',
      ref: nameRef,
      required: true,
      validate: true,
      maxLength: 120
    },
    inputErors: 0,
    setErroredInputs: setErroredInputs,
  })  

  useEffect(() => {
    console.log(state.context.userInfo.user.permissions)
    if (!checkMenuPermission(config.urls.settings.groups.id, state.context.userInfo.user.permissions)) {
      appNavigate(config.urls.noPermission.path)
    }
    nameRef.current.focus()
  }, [])

  useEffect(() => {
    if ((
        current.context.data.errno && 
        current.context.data.errno === 1062
        ))
    {
      send('RESET')
      addError(inputs.name, 'Already exists')      
    }

    if ((current.matches('finished') && current.context.data.status === 'ok')) {
      //setMode('list')
    }

    console.log(current)
  }, [current.value])

  async function handleSubmit() {
    const validateInputFieldsResult = validateInputFields(inputs)
    if (validateInputFieldsResult.status === 'error') { 
      throw new Error(validateInputFieldsResult.message) 
    }
    if (validateInputFieldsResult.status !== 'ok') return

    console.log(current.context)
    
    send('RESET')

    send('START', {
      startFunction: addNewGroup,
      params: {
        name: nameRef.current.value
      } 
    })    

  }

  function handleSetNewGroupMode(mode) {
    if (mode !== newGroupMode) {
      setNewGroupMode(mode)
    }
  }

  return (
    <>      
      <div className="container-sm clearfix">         
        <B_SectionTitle>{ config.urls.settings.groups.new.name }</B_SectionTitle>

        <UnderlineNav aria-label="Main">
          <UnderlineNav.Link selected={newGroupMode === 'details' ? true : false} onClick={() => handleSetNewGroupMode('details')}>
            Details
          </UnderlineNav.Link>
          <UnderlineNav.Link selected={newGroupMode === 'permissions' ? true : false} onClick={() => handleSetNewGroupMode('permissions')}>
            Permissions
          </UnderlineNav.Link>
        </UnderlineNav>

        <div>
          <div className="form-group">
            <div className="form-group-header">
              <label htmlFor="example-text">{ inputs.name.label }</label>
            </div>
            <div className="form-group-body">
              <input className="form-control" type="text" ref={inputs.name.ref} maxLength={inputs.name.maxLength}/>
            </div>
          </div>

          <div className="form-actions" style={{ float: 'left' }}>
            <button type="button" className="btn" onClick={() => setMode('list')}>Cancel</button>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save { current.context.inProgress && <span className='AnimatedEllipsis'></span> }</button>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default NewGroup;