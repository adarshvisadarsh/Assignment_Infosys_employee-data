import React from 'react';
import '../style/Header.css';

function Header({ title, subtitle, subtitle1 }) {
  return (
    <div className="header">
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      {subtitle1 && <p>{subtitle1}</p>}
    </div>
  );
}

export default Header;
