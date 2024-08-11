declare module App.Library {
    export interface IBookSubject {
        key:                string;
        name:               string;
        subject_type:       string;
        work_count:         number;
        ebook_count:        number;
        works:              IBook[];
        authors:            IAuthor[];
        publishers:         IPublisher[];
        subjects:           ISubject[];
        people:             IPeople[];
        places:             IPlace[];
        times:              ITime[];
        publishing_history: number[];
    }
    
    export interface IAuthor extends ISharedElement {
        birth_date: string;
    }
    export interface ISubject extends ISharedElement { }
    export interface IPeople extends ISharedElement { }
    export interface IPlace extends ISharedElement { }
    export interface ITime extends ISharedElement { }

    private interface ISharedElement {
        count: number;
        name:  string;
        key:   string;
    }
    
    export interface IPublisher {
        count: number;
        name:  string;
    }
    
    export interface IBook {
        key:           string;
        title:         string;
        edition_count: number;
        authors:       IBookAuthor[];
        has_fulltext:  boolean;
        ia:            string;
        cover_id:      number;
        covers: number[];
        first_publish_year: number;
    }
    
    export interface IBookAuthor {
        name: string;
        key:  string;
    }
    
}
