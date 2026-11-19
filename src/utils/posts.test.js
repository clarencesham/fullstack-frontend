import { filterPostsByAuthor } from './posts'

test('only returns posts owned by the requested user', () => {
  const posts = [
    { id: 1, author_id: 7 },
    { id: 2, author_id: 8 },
    { id: 3, author_id: 7 }
  ]

  expect(filterPostsByAuthor(posts, 7).map(post => post.id)).toEqual([1, 3])
})
