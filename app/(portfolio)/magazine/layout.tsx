import React from 'react';
import './styles.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="magazine-portfolio">
      {children}
    </div>
  );
};

export default Layout;
