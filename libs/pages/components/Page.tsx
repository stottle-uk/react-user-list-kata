import { PageTemplate, templateMap } from '@pageTemplates';
import { Router } from '@router';
import { RootState } from '@store';
import React from 'react';
import { connect } from 'react-redux';
import { getPageEntries } from '../+store/pages.selectors';

interface StoreProps {
  pageEntries: PageTemplate;
}

const Page: React.FC<StoreProps> = ({ pageEntries }) => (
  <Router routeData={pageEntries} templateMap={templateMap}>
    <>
      <h1>Not Found</h1>
      Template: {pageEntries.template}
    </>
  </Router>
);

const mapStateToProps = ({ pages, router, lists }: RootState): StoreProps => ({
  pageEntries: getPageEntries({ ...pages, ...router, ...lists })
});

export default connect<StoreProps, {}, {}, RootState>(mapStateToProps)(Page);
