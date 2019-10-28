import { RootState } from '@store';
import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { NavigateToPath, RouterAction } from '../+store/router.actions';
import { getCurrentRoute } from '../+store/router.selectors';
import { RouteData, RouterConfigRoute } from '../models/router';

interface RouterProps {
  routeData: RouteData;
  templateMap: Dictionary<React.ComponentType<RouteData>>;
  children: React.ReactElement;
}

interface StoreProps {
  currentRoute?: RouterConfigRoute<RouteData>;
}

interface DispatchProps {
  navigateUrl: (path: string) => void;
}

type AllProps = StoreProps & DispatchProps & RouterProps;

export const Router: React.FC<AllProps> = ({
  routeData,
  children,
  templateMap,
  currentRoute
}) => {
  const Template = currentRoute && templateMap[currentRoute.template];
  return Template ? <Template data={routeData.data} /> : children;
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
