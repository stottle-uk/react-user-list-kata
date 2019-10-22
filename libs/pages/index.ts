import { pagesEpicsAsArray } from './+store/pages.epics';

export * from './+store/pages.actions';
export * from './+store/pages.reducer';
export * from './services/PagesService';
// export { default as Notification } from './components/Notification';
export const pagesEpic = pagesEpicsAsArray;
