import { gql } from '@apollo/client';

export const ME = gql`
query me {
    me {
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