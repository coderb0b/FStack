import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BORN } from '../queries'

const Authors = (props) => {
  let [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')
  
  let authors = useQuery(ALL_AUTHORS)

  const [ changeBorn ] = useMutation(SET_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (authors.loading) {
    return <div>loading...</div>
  }
  
  if (!props.show) {
    return null
  }
  
  const submit = async (event) => {
    event.preventDefault()
    
    if (author.length === 0) {
      author = authors.data.allAuthors[0].name
    }

    changeBorn({ variables: {author, born} })

    setAuthor('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name
            <select value={author} onChange={({ target }) => setAuthor(target.value)}>
            {authors.data.allAuthors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
          )}
            </select>
          </div>
          <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
