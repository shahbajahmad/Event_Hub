import React from 'react';
import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
     <Sidebar/>

      {/* Main Content */}
      <main className="flex-grow p-4 ">
        {children}
      </main>
    </div>
  );
}
