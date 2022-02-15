import Head from 'next/head';
import styles from "./MDXPage.module.scss";
import React from 'react';

interface MDXProps {
    children: React.ReactNode;
    meta: {
        title: string,
        description: string
    };
}

const MDXPage = ({children, meta}: MDXProps) => {

    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={meta.description}/> 
            </Head>
            <section role="content" aria-label={meta.title} className={styles.section}>
                <div className={styles.content}>{children}</div>
            </section>
        </>
    )

}