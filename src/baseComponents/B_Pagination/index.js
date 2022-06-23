import React from 'react';

const index = ({
  current,
  startFunction  
}) => {
  return (
    <nav className="paginate-container" aria-label="Pagination">
      <div className="pagination">
        <em aria-current="page">1</em>
        <a href="#url" aria-label="Page 2">2</a>
        <a href="#url" aria-label="Page 3">3</a>
        <span className="gap">…</span>
        <a href="#url" aria-label="Page 8">8</a>
        <a href="#url" aria-label="Page 9">9</a>
        <a href="#url" aria-label="Page 10">10</a>
        <a className="next_page" rel="next" href="#url" aria-label="Next Page">Next</a>
      </div>
    </nav>
  );
};

export default index;