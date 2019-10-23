import { pagesEpicsAsArray } from './+store/pages.epics';

export * from './+store/pages.actions';
export * from './+store/pages.reducer';
export { default as Page } from './components/Page';
export * from './services/PagesService';
export const pagesEpics = pagesEpicsAsArray;
