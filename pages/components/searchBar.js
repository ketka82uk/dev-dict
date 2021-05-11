import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import SearchIcon from '@material-ui/icons/Search'
import AppsIcon from '@material-ui/icons/Apps'
import styles from '../../styles/Search.module.css'
import CreateTerm from './createTerm'

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

  console.log(filteredData())
  console.log(searchQuery)

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
        <CreateTerm />
        <Divider className="x" orientation="vertical" />

        <Link href="/terms/all_terms">
          <Tooltip title="All acronyms">
            <IconButton type="submit" className="x" aria-label="see all acronyms">
              <AppsIcon />
            </IconButton>
          </Tooltip>
        </Link>

      </Paper>

      <div className={styles.searchResultBox}>
        {searchQuery && filteredData() && filteredData().map((term) => {
          return <div key={term.ref['@ref'].id} className={styles.searchResult}>
            <p className={styles.searchResultText}>{term.data.term} - {term.data.meaning}</p>
            <Link href="/terms/[id]" as={`/terms/${term.ref['@ref'].id}`}>
              <Button variant="outlined" className={styles.searchButton}>See more</Button>
            </Link>
          </div>
        })}
        {searchQuery && filteredData().length === 0 && <div className={styles.searchResult}>
          <p className={styles.searchResultText}>No acronym found.</p>
        </div>}
      </div>
    </div>
  )
}