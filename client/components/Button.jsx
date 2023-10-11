import React from 'react';

const Button = ({ onClick, text, idOverride }) => {
  return (
    <div id={`${idOverride ? idOverride : ''}`} className='buttonMain'>
      <button 
        className='buttonInput' 
        onClick={(e) => {
          if (onClick) onClick(e); 
        }}>
        {text}
      </button>
    </div>
  );
}

export default Button;