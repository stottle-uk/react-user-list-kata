import { RootState } from '@store';
import React from 'react';
import { connect } from 'react-redux';
import { getCurrentRoute } from '../+store/router.selectors';
import { RouteData, RouterConfigRoute } from '../models/router';

interface RouterProps {
  routeData: RouteData;
  templateMap: Dictionary<React.ComponentType<RouteData>>;
  notFoundRender: (route: RouterConfigRoute) => React.ReactNode;
  children?: React.ReactNode;
}

interface StoreProps {
  currentRoute?: RouterConfigRoute;
}

type AllProps = StoreProps & RouterProps;

export const Router: React.FC<AllProps> = ({
  routeData,
  notFoundRender,
  templateMap,
  children,
  currentRoute
}) => {
  const render = () => {
    const Template = currentRoute && templateMap[currentRoute.template];
    if (Template) {
      return <Template data={routeData.data} />;
    }
    if (currentRoute) {
      return notFoundRender(currentRoute);
    }
    return children;
  };

  return <>{render()}</>;
};

const mapStateToProps = ({ router }: RootState): StoreProps => ({
  currentRoute: getCurrentRoute(router)
});

export default connect<StoreProps, {}, {}, RootState>(mapStateToProps)(Router);
