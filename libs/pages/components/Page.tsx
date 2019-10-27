import { PageTemplate, templateMap } from '@pageEntries';
import { Router } from '@router';
import { RootState } from 'libs/store/setup/store.modal';
import React from 'react';
import { connect } from 'react-redux';
import { getPageData2 } from '../+store/pages.selectors';

interface StoreProps {
  pageData: PageTemplate;
}

const Page: React.FC<StoreProps> = ({ pageData }) => (
  <Router routeData={pageData} templateMap={templateMap}>
    <>
      <h1>Not Found</h1>
      Template: {pageData.template}
    </>
  </Router>
);

const mapStateToProps = ({ pages, router, lists }: RootState): StoreProps => ({
  pageData: getPageData2({ ...pages, ...router, ...lists })
});

export default connect<StoreProps, {}, {}, RootState>(mapStateToProps)(Page);
