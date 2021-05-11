import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Layout from '../components/layout'
import styles from '../../styles/Term.module.css'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function TermsList() {
  const { data, error } = useSWR('/api/terms', fetcher)

  console.log(data)

  if (error) return <div>Failed to load</div>

  return (
    <Layout>
      <Grid container spacing={2}>
        {data ? (
          data.map((term) => (
            <Grid item xs={12} key={term.ref['@ref'].id}>
              <div className={styles.card}>
                <div className={styles.cardLeft}>
                  <h4 className={styles.h4List}>{term.data.term}</h4>
                  <p className={styles.pList}>{term.data.meaning}</p>
                </div>
                <div className={styles.cardRight}>
                  <Link href="/terms/[id]" as={`/terms/${term.ref['@ref'].id}`}>
                    <Button className={styles.findOutMoreButton}>Read more</Button>
                  </Link>
                </div>
              </div>
            </Grid>
          ))
        ) : (
          <div>No data</div>
        )
        }
      </Grid>
    </Layout>
  )

}