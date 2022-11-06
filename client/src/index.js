import React from 'react';
import ReactDOM from 'react-dom';
import TWS from './TWS';
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
ReactDOM.render(
  <AuthContextProvider>
    <GlobalStoreContextProvider>
      <React.StrictMode>
        <ChakraProvider>
          <TWS />
        </ChakraProvider>
      </React.StrictMode>
    </GlobalStoreContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')

);

reportWebVitals();