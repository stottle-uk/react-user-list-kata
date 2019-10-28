import { pagesEpicsAsArray } from './+store/pages.epics';

export * from './+store/pages.actions';
export * from './+store/pages.epics';
export * from './+store/pages.reducer';
export * from './+store/pages.selectors';
export { default as templateRenderer } from './components/templateRenderer';
export * from './services/PagesService';

export const pagesEpics = pagesEpicsAsArray;
