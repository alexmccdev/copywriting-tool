import Footer from '@components/Footer'
import Header from '@components/Header'
import Head from 'next/head'
import React from 'react'

interface ILayoutProps {
    title?: string
    template: 'three-col' | 'one-col'
}

const Layout: React.FC<ILayoutProps> = ({ title, template, children }) => {
    return (
        <>
            <Head>
                <title>{`${title ? title + ' | ' : ''} ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
            </Head>
            <Header />
            <main className={template}>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
