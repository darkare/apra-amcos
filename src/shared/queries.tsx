import { gql } from '@apollo/client'

export const PHOTO_LIST_GQL = gql`
  query PhotosQuery($options: PageQueryOptions) {
    photos(options: $options) {
      data {
        id
        title
        url
        thumbnailUrl
      }
      meta {
        totalCount
      }
    }
  }
`