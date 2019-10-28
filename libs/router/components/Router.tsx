import { RootState } from '@store';
import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { NavigateToPath, RouterAction } from '../+store/router.actions';
import { getCurrentRoute } from '../+store/router.selectors';
import { RouteData, RouterConfigRoute } from '../models/router';

interface RouterProps {
  routeData: RouteData;
  templateMap: Dictionary<React.ComponentType<RouteData>>;
  notFoundRender: (route: RouterConfigRoute) => React.ReactNode;
}

interface StoreProps {
  currentRoute?: RouterConfigRoute;
}

interface DispatchProps {
  navigateUrl: (path: string) => void;
}

type AllProps = StoreProps & DispatchProps & RouterProps;

export const Router: React.FC<AllProps> = ({
  routeData,
  notFoundRender,
  templateMap,
  currentRoute
}) => {
  const Template = currentRoute && templateMap[currentRoute.template];
  return Template ? (
    <Template data={routeData.data} />
  ) : (
    <>{currentRoute && notFoundRender(currentRoute)}</>
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
