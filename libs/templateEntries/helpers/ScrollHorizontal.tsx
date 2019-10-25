import { getIsLoading, GetListNextPageStart, List, ListsAction } from '@lists';
import { Link } from '@router';
import { RootState } from '@store';
import React, { CSSProperties, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

export interface OwnProps extends React.HTMLProps<HTMLDivElement> {
  listt: List;
}

interface StoreProps {
  isLoading: boolean;
}

interface DispatchProps {
  getMore: (paging: List) => void;
}

interface OwnState {
  startOfList: boolean;
  endOfList: boolean;
  scrollX: number;
  styles: CSSProperties;
}

type AllProps = OwnProps & StoreProps & DispatchProps;

const ScrollHorizontal = ({ listt, isLoading, getMore, ...rest }: AllProps) => {
  const containerEl = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<OwnState>({
    startOfList: true,
    endOfList: false,
    scrollX: 0,
    styles: {
      transform: 'translateX(0)',
      transition: 'transform 0.3s'
    }
  });

  function updateState(el: HTMLDivElement, direction: '<' | '>') {
    const scrollX =
      direction === '<'
        ? state.scrollX - el.clientWidth
        : state.scrollX + el.clientWidth;
    const startOfList = scrollX === 0;
    const endOfList = scrollX >= el.scrollWidth - el.clientWidth;
    setState({
      startOfList,
      endOfList,
      scrollX,
      styles: {
        ...state.styles,
        transform: `translateX(-${scrollX}px)`
      }
    });
  }

  const onRightClick = () => {
    if (containerEl.current && !state.endOfList) {
      updateState(containerEl.current, '>');
    }
  };

  const onLeftClick = () => {
    if (containerEl.current && !state.startOfList) {
      updateState(containerEl.current, '<');
    }
  };

  return (
    <div className="horizontal-scroller">
      {!state.startOfList && (
        <div className="left-arrow" onClick={onLeftClick}>
          Left
        </div>
      )}
      <div {...rest} ref={containerEl} style={state.styles} />
      {!state.endOfList && (
        <div className="right-arrow" onClick={onRightClick}>
          Right
        </div>
      )}
      {state.endOfList && (
        <div className="right-arrow" onClick={onRightClick}>
          <Link href={listt.path}>More!!!</Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ lists }: RootState): StoreProps => ({
  isLoading: getIsLoading(lists)
});

const mapDispatchToProps = (
  dispatch: Dispatch<ListsAction>
): DispatchProps => ({
  getMore: (paging: any) => dispatch(new GetListNextPageStart({ paging }))
});

export default connect<StoreProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(ScrollHorizontal);
