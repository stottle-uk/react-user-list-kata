import { GetListNextPageStart, ListsAction, Paging } from '@lists';
import { RootState } from '@store';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export interface OwnProps extends React.HTMLProps<HTMLSpanElement> {
  page: Paging;
}

interface DispatchProps {
  getMore: (paging: Paging) => void;
}

type AllProps = OwnProps & DispatchProps;

const GetMore = ({ page, getMore, ...rest }: AllProps) => {
  return page && page.next ? (
    <span {...rest} onClick={() => getMore(page)} />
  ) : (
    <></>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch<ListsAction>
): DispatchProps => ({
  getMore: (paging: Paging) => dispatch(new GetListNextPageStart({ paging }))
});

export default connect<{}, DispatchProps, {}, RootState>(
  undefined,
  mapDispatchToProps
)(GetMore);
