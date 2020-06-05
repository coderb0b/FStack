import React, { useState } from 'react'


const Books = ({ show, books_from_db, genres}) => {
  const [books, setBooks] = useState(books_from_db)
  const [genre, setGenre] = useState('')

  if (!show) {
    return null
  }

  function fgenres(e) {
    let filtered_books = books_from_db
    if (!e.target.value) {
      setBooks(filtered_books)
      setGenre('')
    } else {
      filtered_books = books_from_db.filter(b => b.genres.find(genre => genre === e.target.value))
      setBooks(filtered_books)
      setGenre(e.target.value)
    }
  }

  return (
    <div>
      <h2>books</h2>
  {books_from_db !== books ? <p>in genre <b>{genre}</b> </p> : null}

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
        <button key={genre} value={genre} onClick={fgenres}>{genre}</button>
        )}
        <button onClick={fgenres}>all genres</button>
      </div>
    </div>
  )
}

export default Books