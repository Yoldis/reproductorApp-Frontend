import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppMusic from './AppMusic'
import './index.css'


const theme = extendTheme({
  colors: {
    background: "#515151", // Cambia el color de fondo
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} >
      <AppMusic />
    </ChakraProvider>
  </React.StrictMode>
);
