import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Layout from '../components/layout'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function TermsList() {
  const { data, error } = useSWR('/api/terms', fetcher)

  if (error) return <div>Failed to load</div>

  return (
    <Layout>
      <Grid container spacing={2}>
        {data ? (
          data.map((term) => (
            <Grid item xs={12} md={6} lg={4} key={term.ref['@ref'].id}>
              <Paper>
                <p>
                  <Link href="/terms/[id]" as={`/terms/${term.ref['@ref'].id}`}>
                    <a>{term.data.term}</a>
                  </Link>
                </p>
                <p>{term.data.meaning}</p>
              </Paper>
            </Grid>
          ))
        ) : (
          <div>No data</div>
        )
        }
      </Grid>
      <Link href="/" as={'/'}>Back</Link>
    </Layout>
  )

}