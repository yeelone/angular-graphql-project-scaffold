import gql from 'graphql-tag';

export const  queryAuthors = gql`
      query authors($skip:Int!,$take:Int!,$name:String){
        authors(pagination:{skip:$skip,take:$take},filter:{name:$name}){
            totalCount
            skip
            take
            rows{
                id
                name
            }
        }
      }`

export const  queryAuthorsWithBook = gql`
      query authors($skip:Int!,$take:Int!,$name:String){
        authors(pagination:{skip:$skip,take:$take},filter:{name:$name}){
            totalCount
            skip
            take
            rows{
                id
                name
                books{
                    id
                    name
                    authors{
                        rows{
                            id
                            name
                        }
                    }
                    picture
                    alias
                }
            }
        }
      }`


export const createAuthor = gql`
    mutation createAuthor($name:String!){
        createAuthor(input:{name:$name}){id}
    }
`

export const deleteAuthor = gql`
    mutation deleteAuthor($ids:[Int!]!){
        deleteAuthor(input:{ids:$ids})
    }
`

export const updateAuthor = gql`
    mutation updateAuthor($id:Int!,$name:String){
        updateAuthor(input:{id:$id,name:$name}){id}
    }
`

export const createAuthorAndBookRelationship = gql`
    mutation createAuthorAndBookRelationship($bookIds: [Int!]!,$authorId: Int!){
        createAuthorAndBookRelationship(input:{bookIds:$bookIds,authorId:$authorId})
    }
`

export const removeAuthorAndBookRelationship = gql`
    mutation removeAuthorAndBookRelationship($chapterIds: [Int!]!,$bookId: Int!){
        removeAuthorAndBookRelationship(input:{bookIds:$bookIds,authorId:$authorId})
    }
`
