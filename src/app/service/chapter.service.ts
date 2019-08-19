import gql from 'graphql-tag';

export const  queryChapters = gql`
      query chapters($ids:[Int!],$index:Int){
        chapters(filter:{ids:$ids,index:$index}){
            id
            index
            name
            content
            phrases{
                totalCount
                skip
                take
                rows{
                    id
                    word
                    phonetic
                    definition
                    translation
                    pos
                    collins
                    oxford
                    tag
                    bnc
                    frq
                    exchange
                    detail
                    audio                       
                }
            }
            cet4Words{
                totalCount
                skip
                take
                rows{
                    id
                    word
                    phonetic
                    definition
                    translation
                    pos
                    collins
                    oxford
                    tag
                    bnc
                    frq
                    exchange
                    detail
                    audio                       
                }
            }
            cet6Words{
                totalCount
                skip
                take
                rows{
                    id
                    word
                    phonetic
                    definition
                    translation
                    pos
                    collins
                    oxford
                    tag
                    bnc
                    frq
                    exchange
                    detail
                    audio                       
                }
            }
            kyWords{
                totalCount
                skip
                take
                rows{
                    id
                    word
                    phonetic
                    definition
                    translation
                    pos
                    collins
                    oxford
                    tag
                    bnc
                    frq
                    exchange
                    detail
                    audio                       
                }
            }
            toefiWords{
                totalCount
                skip
                take
                rows{
                    id
                    word
                    phonetic
                    definition
                    translation
                    pos
                    collins
                    oxford
                    tag
                    bnc
                    frq
                    exchange
                    detail
                    audio                       
                }
            }
            ieltsWords{
                totalCount
                skip
                take
                rows{
                    id
                    word
                    phonetic
                    definition
                    translation
                    pos
                    collins
                    oxford
                    tag
                    bnc
                    frq
                    exchange
                    detail
                    audio                       
                }
            }
            greWords{
                totalCount
                skip
                take
                rows{
                    id
                    word
                    phonetic
                    definition
                    translation
                    pos
                    collins
                    oxford
                    tag
                    bnc
                    frq
                    exchange
                    detail
                    audio                       
                }
            }
        }
      }`



export const createChapter = gql`
    mutation createChapter($index:Int!,$name:String!,$content:String!,$phraseIds: [Int!],$bookId: Int!){
        createChapter(input:{index:$index,name:$name,content:$content,phraseIds: $phraseIds,bookId: $bookId}){id}
    }
`

export const deleteChapter = gql`
    mutation deleteChapter($ids:[Int!]!){
        deleteChapter(input:{ids:$ids})
    }
`

export const updateChapter = gql`
    mutation updateChapter($id:Int!,$index:Int,$name:String,$content:String,$phraseIds: [Int!]){
        updateChapter(input:{id:$id,index:$index,name:$name,content:$content,phraseIds: $phraseIds}){
            id
        }
    }
`

export const createChapterAndCet4DictionaryRelationship = gql`
    mutation createChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        createChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:cet4})
    }
`
export const createChapterAndCet6DictionaryRelationship = gql`
    mutation createChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        createChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:cet6})
    }
`
export const createChapterAndKyDictionaryRelationship = gql`
    mutation createChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        createChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:ky})
    }
`
export const createChapterAndToefiDictionaryRelationship = gql`
    mutation createChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        createChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:toefi})
    }
`
export const createChapterAndIeltsDictionaryRelationship = gql`
    mutation createChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        createChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:ielts})
    }
`
export const createChapterAndGreDictionaryRelationship = gql`
    mutation createChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        createChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:gre})
    }
`
export const createChapterAndPhraseDictionaryRelationship = gql`
    mutation createChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        createChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:phrase})
    }
`

export const removeChapterAndCet4DictionaryRelationship = gql`
    mutation removeChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        removeChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:"cet4"})
    }
`
export const removeChapterAndCet6DictionaryRelationship = gql`
    mutation removeChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        removeChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:"cet6"})
    }
`
export const removeChapterAndKyDictionaryRelationship = gql`
    mutation removeChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        removeChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:"ky"})
    }
`
export const removeChapterAndToefiDictionaryRelationship = gql`
    mutation removeChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        removeChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:"toefi"})
    }
`
export const removeChapterAndIeltsDictionaryRelationship = gql`
    mutation removeChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        removeChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:"ielts"})
    }
`
export const removeChapterAndRreDictionaryRelationship = gql`
    mutation removeChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        removeChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:"gre"})
    }
`
export const removeChapterAndPhraseDictionaryRelationship = gql`
    mutation removeChapterAndDictionaryRelationship($chapterId: Int!,$dictId: [Int!]!){
        removeChapterAndDictionaryRelationship(input:{chapterId:$chapterId,dictId:$dictId,level:"phrase"})
    }
`


export const analysis = gql`
    query analysis($chapterId:Int!) {
        analysis(input:{chapterId:$chapterId}){
            totalCount
            rows{
                id
                word
                phonetic
                definition
                translation
                pos
                collins
                oxford
                tag
                bnc
                frq
                exchange
                detail
                audio 
            }
        }
    }
`
