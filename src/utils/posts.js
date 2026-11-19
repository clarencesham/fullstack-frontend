export const filterPostsByAuthor = (posts, userID) => (
  posts.filter(post => Number(post.author_id) === Number(userID))
)
