import appStyle from 'app/style.css'
import React, { useEffect, useState } from 'react'
import { FormControl, Select, Box, Heading, Button, Link, Spinner, Pagehead, Text, Flash, StyledOcticon } from '@primer/react'
import { TriangleDownIcon, TriangleUpIcon, SearchIcon } from '@primer/octicons-react'
import config from 'config'
import B_Listloading from 'baseComponents/B_Listloading'
import getGroups from 'functions/groups/getGroups'
import B_Formerror from 'baseComponents/B_Formerror'
import B_Search from 'baseComponents/B_Search'
import B_Pagination from 'baseComponents/B_Pagination'

import { useMachine } from '@xstate/react'
import { apiMachine } from 'state/apiMachine'

const AppList = ({
  setMode
}) => {
  
  const [current, send] = useMachine(apiMachine)
  const [azDropdownOpen, setAZDropdownOpen] = useState(true)
  const [querySuccess, setQuerySuccess] = useState(false)

  const stateObj = {
    inProgress: current.context.inProgress
  }

  function handleSortChange(e) {
    handleGetList({ order: e.target.value })
  }

  function handleGetList(params) {   
    send('RESET')

    send('START', {
      startFunction: getGroups,
      params: {
        ...current.context.params,
        ...params
      }
    })

    setAZDropdownOpen(!azDropdownOpen)
  }  

  useEffect(() => {
    
    handleGetList({
      orderByFields: 'Name',
      order: 'A-Z',
      searchField: '',
      searchValue: '',
      searchType: 'includes',
      listPerPage: config.urls.settings.groups.listPerPage      
    })
  }, [])

  useEffect(() => {
    setQuerySuccess((current.matches('finished') && current.context.data.status === 'ok'))

    console.log(current)
  }, [current.value])

  return (
    <>
    <div className="container-sm clearfix">
      <Pagehead sx={{fontSize: 4, borderBottom: 'none', margin: 0, padding: 0, marginBottom: '1rem'}} >
        <div style={{marginBottom: '1rem'}}>
          { config.urls.settings.groups.name }
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}> 
          <B_Search current={current} searchField='Name' startFunction={handleGetList} />

          <button className='btn btn-primary' onClick={() => setMode('new')}>New</button>
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
        { querySuccess && current.context.data.totalRows > 0 &&
            current.context.data.groups.map((g, i) => {
              return (
                <div className="Box-body Box-row--hover-gray" key={i}>
                  <a className='color-fg-default'>{ g.Name }</a>
                </div>    
              )                          
        })}

        { querySuccess && current.context.data.totalRows === 0 && 
          <div className="Box-body Box-row--hover-gray" style={{textAlign: 'center'}}>
            <span className='color-fg-default'>No groups</span>
          </div>        
        }

        { current.context.inProgress && 
          <Box display={'flex'} alignItems='center' justifyContent='center' p={2}>
            <Spinner size='small' /> 
          </Box>
        }
      </div>

      { !querySuccess &&
            <B_Formerror error={current.context.data} style={{marginTop: '1rem'}} /> 
      }

      { querySuccess && current.context.data.totalRows > 0 && current.context.data.totalRows > current.context.params.listPerPage &&
        <B_Pagination />
      }
    </div>

    </>
  )

}

export default AppList