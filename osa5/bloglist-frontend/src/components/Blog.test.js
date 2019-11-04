import React from 'react'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'


test('blog is rendered correctly', () => {
	const blog = {
		title: "testi blogi",
		author: "testaaja",
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