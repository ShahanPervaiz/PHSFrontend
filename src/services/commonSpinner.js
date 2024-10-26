import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import './commonspinner.css'
const CommonSpinner = () => {
  return (
    <div className="spinner-overlay flex flex-col items-center justify-center" style={{ height: '100vh' }}>
      <ColorRing
        visible={true}
        height="50"
        width="50"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
      />
      <span className="text-blue-500 mt-2 text-lg">Loading...</span> {/* Blue colored loading text */}
    </div>
  );
};

export default CommonSpinner;
