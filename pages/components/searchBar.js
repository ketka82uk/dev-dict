import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import SearchIcon from '@material-ui/icons/Search'
import AppsIcon from '@material-ui/icons/Apps'
import styles from '../../styles/Search.module.css'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [termData, setTermData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/terms', fetcher)
      setTermData(data)
    }
    fetchData()
  }, [])

  function filteredData() {
    return termData.filter(term => {
      return (term.data.term.toLowerCase() === searchQuery.toLowerCase())
    })
  }

  return (
    <div className={styles.searchBar}>

      <Paper className={styles.paper}>
        <IconButton type="submit" className="x" aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={styles.inputBase}
          placeholder="Search for an acronym"
          inputProps={{ 'aria-label': 'search for acronym' }}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <Divider className="x" orientation="vertical" />
          X
        <Divider className="x" orientation="vertical" />
        <Link href="/terms/all_terms">
          <IconButton type="submit" className="x" aria-label="search">
            <AppsIcon />
          </IconButton>
        </Link>
      </Paper>

      <div className="x">
        {filteredData().map((term) => {
          return <div key={term.ref['@ref'].id}>
            <p>{term.data.term} - {term.data.meaning}</p>
          </div>
        })}
      </div>

    </div>
  )
}