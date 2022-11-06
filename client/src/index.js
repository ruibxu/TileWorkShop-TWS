import React from 'react';
import ReactDOM from 'react-dom';
import TWS from './TWS';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
ReactDOM.render(
    <React.StrictMode>  
      <ChakraProvider>
        <TWS />
      </ChakraProvider>  
    </React.StrictMode>,
    document.getElementById('root')
  );

reportWebVitals();