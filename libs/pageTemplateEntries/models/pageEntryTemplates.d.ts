import { Images, List } from '@lists';

export interface Dictionary<T> {
  [key: string]: T;
}

export interface Entry {
  type:
    | 'ItemEntry'
    | 'ItemDetailEntry'
    | 'ListEntry'
    | 'ListDetailEntry'
    | 'UserEntry'
    | 'TextEntry'
    | 'ImageEntry'
    | 'CustomEntry'
    | 'PeopleEntry';
  id: string;
  template: string;
  title: string;
  customFields?: Dictionary<string>;
  list?: List;
  images?: Images;
}

export interface NomralisedEntry extends Entry {
  list: List;
}

const t = [
  {
    title: 'Cinelists',
    page: 'List Detail',
    template: 'LH1',
    type: 'ListDetailEntry',
    hasList: false
  },
  {
    title: 'Cinelists',
    page: 'List Detail',
    template: 'CS5',
    type: 'ListDetailEntry',
    hasList: false
  },

  {
    title: 'Home',
    page: 'Home',
    template: 'Hero (Full Screen)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Home',
    page: 'Home',
    template: 'P2',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Home',
    page: 'Home',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Home',
    page: 'Home',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Home',
    page: 'Home',
    template: '4:3 Block (Reduced)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Home',
    page: 'Home',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Home',
    page: 'Home',
    template: '4:3 Block (Reduced)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Filmes de Ação',
    page: 'Category',
    template: 'Editorial Image',
    type: 'ImageEntry',
    hasList: false
  },
  {
    title: 'Filmes de Ação',
    page: 'Category',
    template: 'Sub Genres (Custom)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Filmes de Ação',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Filmes de Ação',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Filmes de Ação',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Filmes de Ação',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Filmes de Ação',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Filmes de Ação',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Filmes de Ação',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Filmes de Ação',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Resident Evil 5: Retribuição',
    page: 'Movie Detail',
    template: 'DH1',
    type: 'ItemDetailEntry',
    hasList: false
  },
  {
    title: 'Resident Evil 5: Retribuição',
    page: 'Movie Detail',
    template: 'D10',
    type: 'ItemDetailEntry',
    hasList: false
  },
  {
    title: 'Resident Evil 5: Retribuição',
    page: 'Movie Detail',
    template: 'D4',
    type: 'ItemDetailEntry',
    hasList: false
  },
  {
    title: 'Resident Evil 5: Retribuição',
    page: 'Movie Detail',
    template: 'D6',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: 'Text Heading',
    type: 'TextEntry',
    hasList: false
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  },
  {
    title: 'Gêneros',
    page: 'Category',
    template: '2:3 Poster (Standard)',
    type: 'ListEntry',
    hasList: true
  }
];

console.log(t.filter(r => !r.hasList));
