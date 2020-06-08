import React from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '../queries'

const Recommend = ({ show, books_from_db }) => {
  let books = books_from_db
  const current_user = useQuery(CURRENT_USER)

  if (!show) {
    return null
  }

  if (current_user.loading) {
    return <div>loading...</div>
  } else if (current_user.data.me.favoriteGenre) {
    books = books_from_db.filter(b => b.genres.find(genre => genre === current_user.data.me.favoriteGenre))
  }
  
  return (
    <div>
      <h2>recommendations</h2>
  {current_user.data.me.favoriteGenre !== null ? 
  <p>books in your favorite genre <b>{current_user.data.me.favoriteGenre}</b> </p> : null}

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
    </div>
  )
}

export default Recommend