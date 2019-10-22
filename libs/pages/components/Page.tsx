import { PageTemplateData, templateMap } from '@pageEntries';
import { Router } from '@router';
import { RootState } from 'libs/store/setup/store.modal';
import React from 'react';
import { connect } from 'react-redux';
import { getPageData } from '../+store/pages.selectors';

interface StoreProps {
  pageData: PageTemplateData;
}

const Page: React.FC<StoreProps> = ({ pageData }) => (
  <Router routeData={pageData} templateMap={templateMap}>
    <span>Not Found</span>
  </Router>
);

const mapStateToProps = ({ pages, router }: RootState): StoreProps => ({
  pageData: getPageData({ ...pages, ...router })
});

export default connect<StoreProps, {}, {}, RootState>(mapStateToProps)(Page);
