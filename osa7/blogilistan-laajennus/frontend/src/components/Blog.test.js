import React from 'react'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'


test('blog is rendered correctly', () => {
  const blog = {
    title: 'testi blogi',
    author: 'testaaja',
    likes: 2
  }

  const component = render(
	  <SimpleBlog blog={blog} />
  )


  expect(component.container).toHaveTextContent(
	  'testi blogi'
  )

  expect(component.container).toHaveTextContent(
	  'testaaja'
  )

  expect(component.container).toHaveTextContent(
	  'blog has 2 likes'
  )
})

test('clicking the like button twice calls event handler two times', async () => {
  const blog = {
    title: 'testi blogi',
    author: 'testaaja',
    likes: 2
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
	  <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})


test('blog is rendered, only title and author is visible before clicking title', () => {
  const blog = {
    title: 'testi blogi',
    author: 'testaaja',
    likes: 2,
    user: {
      id: '5daeba502e79752014a17b93',
      name: 'Heimo Vesa',
      username: 'heimo'
    }
  }

  const user = {
    id: '5daeba502e79752014a17b93',
    name: 'Heimo Vesa',
    username: 'heimo'
  }


  const component = render (
	  <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')

  const button = component.container.querySelector('.clickable')
  fireEvent.click(button)
  expect(div).toHaveStyle('')
})



