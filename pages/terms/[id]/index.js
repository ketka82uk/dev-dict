import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from '../../components/layout'
import Link from 'next/link'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Container from '@material-ui/core/Container'
import styles from '../../../styles/Term.module.css'


const fetcher = (url) => fetch(url).then((r) => r.json())

const Term = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(`/api/terms/${id}`, fetcher)

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/terms/${id}/delete`, {
        method: 'DELETE'
      })
      if (res.status === 200) {
        router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (error) return <div>failed to load</div>

  return (
    <Layout>
      <div className={styles.termContainer}>
        {data ? (
          <Container>
            <h2>{data.term}</h2>
            <h4>{data.meaning}</h4>
            <p>{data.description}</p>
            <a href={data.url} aria-label="link to further info" target="_blank" rel="noreferrer">
              <Button className={styles.findOutMoreButton} variant="outlined">Find out more</Button>
            </a>
            <div className={styles.containerFooter}>
              <Link href="/terms/[id]/update" as={`/terms/${id}/update`}>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit">
                    <EditIcon style={{ color: 'whitesmoke' }} />
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteIcon style={{ color: 'whitesmoke' }} />
                </IconButton>
              </Tooltip>
            </div>
          </Container>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </Layout>
  )
}

export default Term