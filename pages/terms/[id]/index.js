import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Layout from '../../components/layout'
import Link from 'next/link'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Container from '@material-ui/core/Container'


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
      {data ? (
        <Container>
          <h2>{data.term}</h2>
          <h4 className="num">{data.meaning}</h4>
          <p className="num">{data.description}</p>
          <p className="num">{data.url}</p>
          <div className="paper-footer">
            <Link href="/terms/[id]/update" as={`/terms/${id}/update`}>
              <a className="editButton">Edit</a>
            </Link>
            <IconButton aria-label="edit" onClick={handleDelete}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Container>
      ) : (
        <div>loading...</div>
      )}
      <Link href="/" as={'/'}>
        <Button variant="outlined">Go back</Button>
      </Link>
    </Layout>
  )
}

export default Term