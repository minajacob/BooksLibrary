declare module App.Library { 
    export interface ISearchAuthor {
      numFound: number;
      start: number;
      numFoundExact: boolean;
      docs: IAuthor[];
    }
    
    export interface IAuthor {
      alternate_names?: string[] | null;
      birth_date?: string | null;
      death_date?: string | null;
      key: string;
      name: string;
      top_subjects: string[];
      top_work: string;
      type: string;
      work_count: number;
      _version_: number;
    }

    export interface ISearchBook {
      numFound:      number;
      start:         number;
      numFoundExact: boolean;
      docs:          IBookDoc[];
      num_found:     number;
      q:             string;
      offset:        null;
    }

    export interface IBookDoc {
      author_name:            string[];
      author_key:            string[];
      cover_i:                number;
      edition_count:          number;
      first_publish_year:     number;
      key:                    string;
      number_of_pages_median: number;
      title:                  string;
    }
}

