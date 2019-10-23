import { List } from '@lists';
import { Dictionary } from '@pageEntries'; // todo - this shouldn't be here as pageEntries also depends on this module!
import P2PageEntry from './components/P2TemplateEntry';

export const pageTemplateEntries: Dictionary<React.ComponentType<List>> = {
  P2: P2PageEntry,
  H7: P2PageEntry,
  '2:3 Poster (Standard)': P2PageEntry,
  // '3:1 Hero (Standard)': HeroStandard3x1,
  '2:3 Poster (Block Hero)': P2PageEntry,
  D6: P2PageEntry
  // CS5: CS5TemplateEntry,
  // CS1: CS1TemplateEntry,
  // LH1: LH1TemplateEntry
};
