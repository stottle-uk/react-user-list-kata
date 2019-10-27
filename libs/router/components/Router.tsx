import { PageTemplate } from '@pageTemplates';
import { RootState } from '@store';
import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { NavigateToPath, RouterAction } from '../+store/router.actions';
import { getCurrentRoute } from '../+store/router.selectors';
import { RouterConfigRoute } from '../models/router';

interface RouterProps {
  routeData: PageTemplate;
  templateMap: { [key: string]: React.ComponentType<PageTemplate> };
  children: React.ReactElement;
}

interface StoreProps {
  currentRoute?: RouterConfigRoute<PageTemplate>;
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
      {/* <div>
        Template Name: {!!routeData.pageEntry && routeData.pageEntry.template}
      </div> */}
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
