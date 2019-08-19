import gql from 'graphql-tag';

export const  queryBooks = gql`
      query books($skip:Int!,$take:Int!,$id:Int,$name:String,$author:String){
        books(pagination:{skip:$skip,take:$take},filter:{id:$id,name:$name,author:$author}){
            totalCount
            skip
            take
            rows{
                id
                name
                chapters{
                    totalCount
                    rows{
                        id
                        name
                        index
                    }
                }
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
      }`

export const createBook = gql`
    mutation createBook($name:String!, $authorId:Int!,$picture:String!,$alias:String!,$userId:Int!){
        createBook(input:{name:$name,authorId:$authorId,picture:$picture,alias:$alias,userId:$userId}){
            id
        }
    }
`

export const delBook = gql`
    mutation deleteBook($ids:[Int!]!){
        deleteBook(input:{ids:$ids})
    }
`

export const updateBook = gql`
    mutation updateBook($id:Int!,$name:String, $authorId:Int,$picture:String,$alias:String,$userId:Int){
        updateBook(input:{id:$id,name:$name,authorId:$authorId,picture:$picture,alias:$alias,userId:$userId}){
            id
        }
    }
`

export const addBookChapters = gql`
    mutation addBookChapters($chapterIds: [Int!]!,$bookId: Int!){
        addBookChapters(input:{chapterIds:$chapterIds,bookId:$bookId})
    }
`

export const removeBookChapters = gql`
    mutation removeBookChapters($chapterIds: [Int!]!,$bookId: Int!){
        removeBookChapters(input:{chapterIds:$chapterIds,bookId:$bookId})
    }
`
