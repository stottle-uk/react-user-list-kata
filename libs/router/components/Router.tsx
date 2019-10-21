import { RootState } from 'libs/store/setup/store.modal';
import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { NavigateToPath, RouterAction } from '../+store/router.actions';
import { getCurrentRoute } from '../+store/router.selectors';
import { RouterConfigRoute } from '../types/router';

interface RouterProps<T> {
  routeData: T;
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
  currentRoute
}: AllProps<T>) =>
  currentRoute ? <currentRoute.template {...routeData} /> : children;

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
