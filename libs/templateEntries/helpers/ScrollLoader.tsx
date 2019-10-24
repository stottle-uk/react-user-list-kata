import {
  getIsLoading,
  GetListNextPageStart,
  ListsAction,
  Paging
} from '@lists';
import { RootState } from '@store';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fromEvent } from 'rxjs';
import { filter, tap, throttleTime } from 'rxjs/operators';

export interface OwnProps extends React.HTMLProps<HTMLDivElement> {
  page: Paging;
}

interface StoreProps {
  isLoading: boolean;
}

interface DispatchProps {
  getMore: (paging: Paging) => void;
}

type AllProps = OwnProps & StoreProps & DispatchProps;

const ScrollLoader = ({ page, isLoading, getMore, ...rest }: AllProps) => {
  const getMoreEl = useRef<HTMLDivElement>(null);

  const isNearBottom = () =>
    !isLoading &&
    !!page.next &&
    window &&
    !!getMoreEl.current &&
    getMoreEl.current.getBoundingClientRect().bottom <=
      window.innerHeight / 0.5;

  const watchBottomEffect = () => {
    const subscription = fromEvent(document, 'scroll')
      .pipe(
        filter(() => isNearBottom()),
        throttleTime(200),
        tap(() => getMore(page))
      )
      .subscribe();

    return () => subscription.unsubscribe();
  };
  useEffect(watchBottomEffect, [page, isLoading]);

  return <div {...rest} ref={getMoreEl} />;
};

const mapStateToProps = ({ lists }: RootState): StoreProps => ({
  isLoading: getIsLoading(lists)
});

const mapDispatchToProps = (
  dispatch: Dispatch<ListsAction>
): DispatchProps => ({
  getMore: (paging: Paging) => dispatch(new GetListNextPageStart({ paging }))
});

export default connect<StoreProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(ScrollLoader);
