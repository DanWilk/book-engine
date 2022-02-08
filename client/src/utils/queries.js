import { gql } from 'graphql';

export const ME = gql`
query Me {
    Me {
      username
      _id
      email
      password
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;