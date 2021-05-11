import React from 'react'
import Layout from './components/layout'
import Image from 'next/image'


const Home = () => {

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