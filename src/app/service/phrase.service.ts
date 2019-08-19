import gql from 'graphql-tag';

export const  queryPhrases = gql`
      query phrases($skip:Int!,$take:Int!,$content:String){
        phrases(pagination:{skip:$skip,take:$take},filter:{content:$content}){
            totalCount
            skip
            take
            rows{
                id
                content
                translation
            }
        }
      }`

export const createPhrase = gql`
    mutation createPhrase($content:String!,$translation:String!){
        createPhrase(input:{content:$content,translation:$translation})
    }
`

export const deletePhrase = gql`
    mutation deletePhrase($ids:[Int!]!){
        deletePhrase(input:{ids:$ids})
    }
`

export const updatePhrase = gql`
    mutation updatePhrase($id:Int!,$content:String,$translation:String){
        updatePhrase(input:{id:$id,content:$content,translation:$translation})
    }
`

