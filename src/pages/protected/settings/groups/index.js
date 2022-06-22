import appStyle from 'app/style.css'
import React, { useState, useEffect, useContext } from 'react'
import pageInitial from 'functions/pageInitial'
import config from 'config'
import { Box, ButtonGroup, Button, PageLayout, Heading, Breadcrumbs } from '@primer/react'
import GroupList from './GroupList'
import NewGroup from './NewGroup'
import { checkMenuPermission } from 'functions/user/checkPermission'
import useAppnavigate from 'hooks/useAppnavigate'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const index = ({ showTitle = false }) => {
  pageInitial( {pageName: 'settings.groups'} ) 
  const appNavigate = useAppnavigate()
  const [mode, setMode] = useState('list')
  
  const globalServices = useContext(GlobalStateContext)  
  const [ state  ] = useActor(globalServices.authService)  

  useEffect(() => {
    if (!checkMenuPermission(config.urls.settings.groups.id, state.context.userInfo.user.permissions)) {
      appNavigate(config.urls.home.path)
    }
  }, [])

  return (
    <>
      <PageLayout>        
        <PageLayout.Content>
          { mode === 'new' && 
            <NewGroup setMode={setMode}/>
          }
          { mode === 'list' && 
            <GroupList setMode={setMode} />
          }
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

export default index;