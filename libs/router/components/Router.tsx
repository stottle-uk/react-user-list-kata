import { RootState } from 'libs/store/setup/store.modal';
import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { NavigateToPath, RouterAction } from '../+store/router.actions';
import { getCurrentRoute } from '../+store/router.selectors';
import { RouterConfigRoute } from '../types/router';

interface RouterProps<T> {
  routeData: T;
  templateMap: { [key: string]: React.ComponentType };
  children: React.ReactElement;
}

interface StoreProps<T> {
  currentRoute?: RouterConfigRoute<T>;
}

interface DispatchProps {
  navigateUrl: (path: string) => void;
}

type AllProps<T> = StoreProps<T> & DispatchProps & RouterProps<T>;

export const Router = <T extends {}>({
  children,
  routeData,
  templateMap,
  currentRoute
}: AllProps<T>) => {
  const Template = currentRoute && templateMap[currentRoute.template];
  return Template ? <Template {...routeData} /> : children;
};
const mapStateToProps = <T extends {}>({
  router
}: RootState): StoreProps<T> => ({
  currentRoute: getCurrentRoute(router)
});

const mapDispatchToProps = (
  dispatch: Dispatch<RouterAction>
): DispatchProps => ({
  navigateUrl: (path: string) => dispatch(new NavigateToPath({ path }))
});

export default connect<StoreProps<any>, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Router);
