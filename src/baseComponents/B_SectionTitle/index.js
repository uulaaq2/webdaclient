import React, { Children } from 'react';

const index = ({ children }) => {
  return (
      <div style={{ fontSize: '1.5rem'}}>{ children }</div>
  );
};

export default index;