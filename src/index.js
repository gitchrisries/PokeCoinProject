import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ChakraProvider} from '@chakra-ui/react'
import {MantineProvider} from '@mantine/core';
import {LoggedContextProvider} from "./contexts/LoggedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={{colorScheme: 'dark'}}>
                <ChakraProvider>
                    <LoggedContextProvider>
                        <App/>
                    </LoggedContextProvider>
                </ChakraProvider>
            </MantineProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
