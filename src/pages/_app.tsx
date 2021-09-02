import '@styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <React.StrictMode>
            <Component {...pageProps} />
        </React.StrictMode>
    )
}

export default MyApp
