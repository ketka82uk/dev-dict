import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import EditForm from '../../components/updateTerm'

const fetcher = (url) => fetch(url).then((r) => r.json())

const UpdateTerm = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(`/api/terms/${id}`, fetcher)

  if (error) return <div>failed to load</div>

  return (
    <div>
      {data ? <EditForm defaultValues={data} id={id} /> : <div>loading...</div>}
    </div>
  )
}

export default UpdateTerm