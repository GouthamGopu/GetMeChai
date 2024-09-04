"use client"; // Add this directive to enable Client Component features

import React, { useEffect } from 'react';
import Dashboard from '../components/Dashboard';


const Page = () => {
  useEffect(() => {
    document.title = "Dashboard - Get Me Chai";
  }, []);
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default Page;
