import React, { createContext, useContext, useState, ReactNode } from 'react';
import Router from 'next/router';

interface ErrorContextProps {
  error: any;
  handleError: (error: any) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<any>(null);

  const handleError = (error: any) => {
    setError(error);
    //console.log(error);
    if (error.status === 403) {
      Router.push('/auth/login');
    } else if (error.status === 500) {
      Router.push('/error/500');
    } else {
      // Handle other status codes if needed
    }
  };

  return (
    <ErrorContext.Provider value={{ error, handleError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = (): ErrorContextProps => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
