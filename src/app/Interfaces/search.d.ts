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
}

