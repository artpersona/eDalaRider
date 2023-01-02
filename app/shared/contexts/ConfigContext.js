import React, {createContext, useContext, useState, useMemo} from 'react';

export const ConfigContext = createContext();

const ConfigProvider = ({children}) => {
  //   States
  const [drawerStatus, setDrawerStatus] = useState(false);

  // End States

  const payload = {
    drawerStatus,
    setDrawerStatus,
  };

  return (
    <ConfigContext.Provider value={useMemo(() => payload, [drawerStatus])}>
      {children}
    </ConfigContext.Provider>
  );
};

export default React.memo(ConfigProvider);
export const useConfigContext = () => useContext(ConfigContext);
