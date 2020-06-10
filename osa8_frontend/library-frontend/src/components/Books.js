import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Books = ({ show, books_from_db, genres}) => {
  const [books, setBooks] = useState(books_from_db)
  const [genre, setGenre] = useState('')

  const [filteredBooks, { loading, data }] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: "no-cache"
  })

  useEffect(() => {
    if (data && data.allBooks) {
      setBooks(data.allBooks)      
    }
  }, [data, setBooks])


  if (loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  function fgenres(e) {
    if (!e.target.value) {
      setBooks(books_from_db)
      setGenre('')
    } else {
      setGenre(e.target.value)
    }
  }

  return (
    <div>
      <h2>books</h2>
  {genre.length === 0 ? null : <p>in genre <b>{genre}</b> </p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
      {genres.map(genre => 
        <button key={genre} value={genre} onClick={(event) => { fgenres(event); filteredBooks({ variables: { genre }}) }}>{genre}</button>
        )}
        <button onClick={(event) => { fgenres(event); filteredBooks({ variables: {  }}) }}>all genres</button>
      </div>
    </div>
  )
}

export default Books