import React, { useState, useEffect } from 'react';

const index = ({
  current,
  listPerPage,
  startFunction
}) => {
  const [totalPages, setTotalPages] = useState(Math.ceil(current.context.data.totalRows / listPerPage))
  const [pages, setPages] = useState(Array.from({length: totalPages}, (_, i) => i + 1))

  function handleStartFunction(e, k) {
    if (k < 1 || k > pages.length ) return

    const offset = ( k - 1 ) * listPerPage
    startFunction({
      ...current.context.params,
      currentPage: k,
      offset
    })
  }

  useEffect(() => {
  }, [])

  return (
      <nav className="paginate-container" aria-label="Pagination" style={{ maxWidth: '100%'}}>
        <div className="pagination" style={{display: 'flex', flexDirection: 'row'}}>
          <a 
            className="previous_page" 
            rel="previous" 
            aria-label="Previous Page" 
            aria-disabled={current.context.params.currentPage === 1}
            onClick={e => handleStartFunction(e, current.context.params.currentPage - 1)}            
          >
            Previous
          </a>
          <div style={{flexGrow: 1}}>
            {
              pages &&
              pages.map((page, i) => {
                return current.context.params.currentPage === (i + 1) ?
                  <em aria-current="page" key={i + 1}>{i + 1}</em>
                :
                  <a key={i + 1}
                    onClick={ e => handleStartFunction(e, (i + 1)) }
                  >{ i + 1 }</a>
              })
            }
          </div>
          <a 
            className="next_page" 
            rel="next" 
            aria-label="Next Page" 
            aria-disabled={current.context.params.currentPage === pages.length}
            onClick={e => handleStartFunction(e, current.context.params.currentPage + 1)}
          >
              Next
          </a>
        </div>
      </nav>
  );
};

export default index;