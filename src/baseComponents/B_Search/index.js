import React, { useRef, useEffect } from 'react'
import { Spinner } from '@primer/react'
import { SearchIcon, SyncIcon } from '@primer/octicons-react'

const index = ({ 
  current,
  searchField,
  startFunction,
  focusOnShow = true
}) => {
  const searchRef = useRef()

  useEffect(() => {
    if (focusOnShow) {
      searchRef.current.focus()
    }    
  }, [])

  function handleStart() {
    startFunction({ 
      searchField: searchRef.current.value.replace(/ /g,'') ? searchField : '',
      searchValue: searchRef.current.value.replace(/ /g,'') ? searchRef.current.value : ''
    })
  }

  return (
    <div className="input-group" style={{marginRight: '0.5rem'}}>            
      <input className="form-control" type="text" placeholder='Group name' ref={searchRef}/>
      <span className="input-group-button">
        <button className="btn" type="button" onClick={handleStart}>
          { !current.context.inProgress ? <SearchIcon /> : <SyncIcon className={!current.context.inProgress ? '' : 'anim-rotate'}/> }
        </button>
      </span>
    </div>  
  );
};

export default index;