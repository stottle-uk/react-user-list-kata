import { PageTemplateData } from '@pageEntries';
import { RootState } from 'libs/store/setup/store.modal';
import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { NavigateToPath, RouterAction } from '../+store/router.actions';
import { getCurrentRoute } from '../+store/router.selectors';
import { RouterConfigRoute } from '../types/router';

interface RouterProps {
  routeData: PageTemplateData;
  templateMap: { [key: string]: React.ComponentType<PageTemplateData> };
  children: React.ReactElement;
}

interface StoreProps {
  currentRoute?: RouterConfigRoute<PageTemplateData>;
}

interface DispatchProps {
  navigateUrl: (path: string) => void;
}

type AllProps = StoreProps & DispatchProps & RouterProps;

export const Router: React.FC<AllProps> = ({
  children,
  routeData,
  templateMap,
  currentRoute
}) => {
  const Template = currentRoute && templateMap[currentRoute.template];
  return Template ? (
    <>
      <div>
        Template Name: {!!routeData.pageEntry && routeData.pageEntry.template}
      </div>
      <Template {...routeData} />
    </>
  ) : (
    children
  );
};

const mapStateToProps = ({ router }: RootState): StoreProps => ({
  currentRoute: getCurrentRoute(router)
});

const mapDispatchToProps = (
  dispatch: Dispatch<RouterAction>
): DispatchProps => ({
  navigateUrl: (path: string) => dispatch(new NavigateToPath({ path }))
});

export default connect<StoreProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Router);
