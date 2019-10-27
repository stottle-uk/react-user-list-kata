import { RootState } from '@store';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigateToPath, RouterAction } from '../+store/router.actions';

interface OwnProps extends React.HTMLProps<HTMLAnchorElement> {}

interface DispatchProps {
  navigateToPath: (path: string) => void;
}

type AllProps = DispatchProps & OwnProps;

const Link = ({ href, children, navigateToPath, ...rest }: AllProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault();
    navigateToPath(event.currentTarget.pathname);
  };

  return (
    <a {...rest} onClick={handleClick} href={href}>
      {children}
    </a>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch<RouterAction>
): DispatchProps => ({
  navigateToPath: (path: string) => dispatch(new NavigateToPath({ path }))
});

export default connect<{}, DispatchProps, OwnProps, RootState>(
  undefined,
  mapDispatchToProps
)(Link);
