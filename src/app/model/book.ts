import { User } from './user';

export class Dictionary{
    id:number;
    word:string;
    phonetic:string;
    definition:string;
    translation:string;
    pos:string;
    collins:string;
    oxford:string;
    tag:string;
    bnc:string;
    frq:string;
    exchange:string;
    detail:string;
    audio:string;
}

export class Phrase {
    id:number;
    content:string;
    translation:string;
}

export class Author {
    id: number;
    name: string;

}

export class Chapter{
    id: number;
    index:number;
    name:string;
    content:string;
    phrases:Dictionary[];
    cet4Words:Dictionary[];
    cet6Words:Dictionary[];
    kyWords:Dictionary[];
    toefiWords:Dictionary[];
    ieltsWords:Dictionary[];
    greWords:Dictionary[];
    bookId:number ;
}

export class Book {
    id: number;
    name: string;
	authors: Author[];
	picture: string;
	alias: string;
	user: User;
    userId: number;
    authorId: number;
	chapters: Chapter[];
	createdAt: string ;
}