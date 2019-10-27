import EditorialImage from './components/imageEntry/EditorialImage';
import DH1TemplateEntry from './components/itemEntry/DH1TemplateEntry';
import CS5TemplateEntry from './components/listEntry/CS5TemplateEntry';
import HeroStandard3x1 from './components/listEntry/HeroStandard3x1';
import LH1TemplateEntry from './components/listEntry/LH1TemplateEntry';
import P2PageEntry from './components/listEntry/P2TemplateEntry';
import TextHeading from './components/textEntry/TextHeading';
import {
  ImageEntry,
  ItemEntry,
  ListEntry,
  TextEntry
} from './models/pageEntryTemplates.d';

export * from './models/pageEntryTemplates.d';

export type AllEntryTypes = Dictionary<
  | React.ComponentType<ItemEntry>
  | React.ComponentType<ListEntry>
  | React.ComponentType<ImageEntry>
  | React.ComponentType<TextEntry>
>;

export const pageTemplateEntries: AllEntryTypes = {
  P2: P2PageEntry,
  H7: P2PageEntry,
  '2:3 Poster (Standard)': P2PageEntry,
  '3:1 Hero (Standard)': HeroStandard3x1,
  'Hero (Full Screen)': HeroStandard3x1,
  '2:3 Poster (Block Hero)': P2PageEntry,
  D6: P2PageEntry,
  CS5: CS5TemplateEntry,
  CS1: CS5TemplateEntry,
  LH1: LH1TemplateEntry,
  'Sub Genres (Custom)': LH1TemplateEntry,
  DH1: DH1TemplateEntry,
  'Editorial Image': EditorialImage,
  'Text Heading': TextHeading
};
