import React from 'react';

const RequiredLabel = ({ children }) => (
     <label className="label has-text-black">
          {children}
          <span style={{ color: 'red' }}>*</span>
     </label>
);

export default RequiredLabel;
