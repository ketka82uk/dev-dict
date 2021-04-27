import React from 'react'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import styles from '../../styles/Layout.module.css'
import SearchBar from './searchBar'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>{'{'}dev_dict{'}'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
              <div className={styles.mainLeftSide}>
                <div className={styles.titleBox}>
                  <h1>{'{'}dev_dict{'}'}</h1>
                  <h3>Breaking down developer acronyms one letter at a time...</h3>
                  <SearchBar />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={styles.mainRightSide}>
                {children}
              </div>
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer>
        <small>Cathy J Thomas | 2021</small>
        <small>Powered by Next.js, FaunaDB and Vercel</small>
      </footer>
    </>
  )
}

export default Layout
