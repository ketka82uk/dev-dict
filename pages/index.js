import React from 'react'
import useSWR from 'swr'
import Layout from './components/layout'
import Image from 'next/image'


const fetcher = (url) => fetch(url).then((r) => r.json())

const Home = () => {
  const { data, error } = useSWR('/api/terms', fetcher)

  console.log(data)

  if (error) return <div>failed to load</div>

  return (
    <Layout>
      <Image
        src="/confusedDude.png"
        alt="confused cartoon dude"
        height={600}
        width={250}
      />
    </Layout>
  )
}

export default Home