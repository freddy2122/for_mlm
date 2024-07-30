import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomizationContext = createContext();

export function CustomizationProvider({ children }) {
  const [backgroundColor, setBackgroundColor] = useState(
    localStorage.getItem('backgroundColor') || ''
  );
  const [logoColor, setLogoColor] = useState(
    localStorage.getItem('logoColor') || 'blue'
  );
  const [topBarColor, setTopBarColor] = useState(
    localStorage.getItem('topBarColor') || 'blue2'
  );
  const [sideBarColor, setSideBarColor] = useState(
    localStorage.getItem('sideBarColor') || ''
  );
  const [customSidebarOpen, setCustomSidebarOpen] = useState(
    localStorage.getItem('customSidebarOpen') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('logoColor', logoColor);
    localStorage.setItem('topBarColor', topBarColor);
    localStorage.setItem('sideBarColor', sideBarColor);
    localStorage.setItem('customSidebarOpen', customSidebarOpen);
  }, [backgroundColor, logoColor, topBarColor, sideBarColor, customSidebarOpen]);

  const contextValue = {
    backgroundColor,
    logoColor,
    topBarColor,
    sideBarColor,
    customSidebarOpen,
    setBackgroundColor,
    setLogoColor,
    setTopBarColor,
    setSideBarColor,
    setCustomSidebarOpen,
  };

  return (
    <CustomizationContext.Provider value={contextValue}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  return useContext(CustomizationContext);
}
