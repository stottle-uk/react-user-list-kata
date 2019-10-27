import { RootState } from '@store';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BackStart, RouterAction } from '../+store/router.actions';

interface OwnProps extends React.HTMLProps<HTMLButtonElement> {}

interface DispatchProps {
  back: () => void;
}

type AllProps = DispatchProps & OwnProps;

const Back = ({ children, back, type, ...rest }: AllProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    back();
  };

  return (
    <button type="button" onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch<RouterAction>
): DispatchProps => ({
  back: () => dispatch(new BackStart())
});

export default connect<{}, DispatchProps, OwnProps, RootState>(
  undefined,
  mapDispatchToProps
)(Back);
