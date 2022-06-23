import React, { useContext, useEffect } from 'react'
import config from 'config'
import { checkMenuPermission } from 'functions/user/checkPermission';

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import useAppnavigate from 'hooks/useAppnavigate';

const index = (params) => {
  const globalServices = useContext(GlobalStateContext)  
  const [ state  ] = useActor(globalServices.authService)   
  const appNavigate = useAppnavigate()
  
  const pages = params.pageName.split('.')
  
  useEffect(() => {
    let page = config.urls
    for (let i=0; i < pages.length; i++ ) {
      page = page[pages[i]]
    }
    document.title = page.name + ' | ' + config.app.name    
    
    if (!checkMenuPermission(page.id, state.context.userInfo.user.permissions)) {
      appNavigate(config.urls.noPermission.path)
    }     
  }, [])

};

export default index;