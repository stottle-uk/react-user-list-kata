import { GetListNextPageStart, ListsAction, Paging } from '@lists';
import { RootState } from '@store';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';

export interface OwnProps extends React.HTMLProps<HTMLSpanElement> {
  page: Paging;
}

interface DispatchProps {
  getMore: (paging: Paging) => void;
}

type AllProps = OwnProps & DispatchProps;

const GetMore = ({ page, getMore, ...rest }: AllProps) => {
  const getMoreEl = useRef<HTMLSpanElement>(null);

  const isNearBottom = () =>
    window &&
    !!getMoreEl.current &&
    getMoreEl.current.getBoundingClientRect().bottom <=
      window.innerHeight / 0.6;

  const watchBottomEffect = () => {
    const subscription = fromEvent(document, 'scroll')
      .pipe(
        debounceTime(200),
        filter(() => isNearBottom()),
        tap(() => getMore(page))
      )
      .subscribe();

    return () => subscription.unsubscribe();
  };
  useEffect(watchBottomEffect, [page]);

  return page && page.next ? (
    <span {...rest} ref={getMoreEl} onClick={() => getMore(page)} />
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
