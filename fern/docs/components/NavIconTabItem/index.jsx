import React from 'react';

const NavIconTabItem = ({ 
  icon: Icon, 
  label, 
  iconSize = 16,
  fontWeight = '600'
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div className='custom-icon-tab-item'>
        <Icon size={iconSize} />
      </div>
      <span style={{ fontWeight: fontWeight }}>{label}</span>
    </div>
  );
};

export default NavIconTabItem; 