import React, { useState, useContext } from 'react'
import { ActionList, Box, PageLayout, Avatar } from '@primer/react'
import B_PageLayout from 'baseComponents/B_PageLayout'
import B_SectionTitle from 'baseComponents/B_SectionTitle'

import config from 'config'
import pageInitial from 'functions/pageInitial'
import useAppnavigate from 'hooks/useAppnavigate'
import useAppLocation from 'hooks/useAppLocation'
import usePageInitial from 'hooks/usePageInitial'

import { checkPermission } from 'functions/user/checkPermission';

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import { HomeIcon } from '@primer/octicons-react'

const index = () => {
  usePageInitial({ pageName: 'config' })
  const appLocation = useAppLocation()  
  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    

  const [mode, setMode] = useState('menu')

  return (
    <>
      <PageLayout>        
        <PageLayout.Content>
          <B_SectionTitle>{ config.urls.config.name }</B_SectionTitle>
          <ActionList showDividers sx={{marginTop: '0.5rem'}}>
          <ActionList.Item></ActionList.Item>
  <ActionList.Item>
    Permission actions
    <ActionList.TrailingVisual>⌘ + N</ActionList.TrailingVisual>
  </ActionList.Item>
  <ActionList.Item>
    Permission menus
  </ActionList.Item>
  <ActionList.Item>
    Permission definitions
  </ActionList.Item>
  <ActionList.Item></ActionList.Item>
</ActionList>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
};

export default index