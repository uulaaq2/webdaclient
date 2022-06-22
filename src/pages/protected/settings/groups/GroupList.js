import appStyle from 'app/style.css'
import React, { useEffect, useState } from 'react'
import { FormControl, Select, Box, Heading, Button, Link, Spinner, Pagehead, Text, Flash, StyledOcticon } from '@primer/react'
import { TriangleDownIcon, CircleSlashIcon, SearchIcon } from '@primer/octicons-react'
import config from 'config'
import B_Listloading from 'baseComponents/B_Listloading'
import getGroups from 'functions/groups/getGroups'
import B_Formerror from 'baseComponents/B_Formerror'

import { useMachine } from '@xstate/react'
import { apiMachine } from 'state/apiMachine'

const AppList = ({
  setMode
}) => {
  
  const [current, send] = useMachine(apiMachine)
  const [azDropdownOpen, setAZDropdownOpen] = useState(true)

  const stateObj = {
    inProgress: current.context.inProgress
  }

  function handleSortChange(e) {
    handleGetList({ order: e.target.value })
  }

  function handleGetList(params) {   
    current.context.params = {
      ...current.context.params,
      ...params
    }

    console.log(current.context)
    
    send('RESET')
    
    send('START', {
      startFunction: getGroups
    })

    setAZDropdownOpen(!azDropdownOpen)
  }
  useEffect(() => {
    current.context.params.name = '';
    current.context.params.orderByFields = 'Name';
    current.context.params.order = 'A-Z';
    current.context.params.searchField = '';
    current.context.params.searchText = '';
    current.context.params.listPerPage = config.urls.settings.groups.listPerPage;
    
    handleGetList()
  }, [])

  useEffect(() => {
    //console.log(current)
  }, [current.value])

  return (
    <>
    <div className="container-sm clearfix">
      <Pagehead sx={{fontSize: 4, borderBottom: 'none', margin: 0, padding: 0, marginBottom: '1rem'}} >
        <div style={{marginBottom: '1rem'}}>
          { config.urls.settings.groups.name }
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}> 
        <div class="input-group" style={{marginRight: '0.5rem'}}>            
            <input class="form-control" type="text" placeholder='Group name' />
            <span class="input-group-button">
              <button class="btn" type="button">
                <SearchIcon />
              </button>
            </span>
          </div>           

          <button className='btn'>New</button>
        </div>
      </Pagehead>
 
      <div className="Box Box--condensed">
        <div className="Box-header d-flex flex-items-center">
          <h3 className="Box-title overflow-hidden flex-auto">
            Name
          </h3>
          <div style={{display: 'flex'}}>    

          </div>
        </div>
        { (current.matches('finished') && current.context.data.status === 'ok') &&
           current.context.data.groups.map((g, i) => {
            return (
              <div className="Box-body Box-row--hover-gray" key={i}>
              <a onClick={() => alert('aaa')} className='color-fg-default'>{ g.Name }</a>
              </div>    
            )
        })}

        { current.context.inProgress && 
          <Box display={'flex'} alignItems='center' justifyContent='center' p={2}>
            <Spinner size='small' /> 
          </Box>
        }
      </div>
    { current.matches('failed') &&
          <B_Formerror error={current.context.data} style={{marginTop: '1rem'}} />
    }
    </div>

    </>
  )

}

export default AppList