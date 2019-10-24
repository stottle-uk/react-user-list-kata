import { getIsLoading, GetListNextPageStart, List, ListsAction } from '@lists';
import { Link } from '@router';
import { RootState } from '@store';
import React, { useRef, useState } from 'react';
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

type AllProps = OwnProps & StoreProps & DispatchProps;

const ScrollHorizontal = ({ listt, isLoading, getMore, ...rest }: AllProps) => {
  const containerEl = useRef<HTMLDivElement>(null);
  const [scrollInfo, setScrollInfo] = useState({
    startOfList: true,
    endOfList: false,
    scrollX: 0,
    styles: {
      transform: 'translateX(0)',
      transition: 'transform 0.3s'
    }
  });

  function setState(el: HTMLDivElement, direction: '<' | '>') {
    const scrollX =
      direction === '<'
        ? scrollInfo.scrollX - el.clientWidth
        : scrollInfo.scrollX + el.clientWidth;
    const startOfList = scrollX === 0;
    const endOfList = scrollX >= el.scrollWidth - el.clientWidth;
    setScrollInfo({
      startOfList,
      endOfList,
      scrollX,
      styles: {
        ...scrollInfo.styles,
        transform: `translateX(-${scrollX}px)`
      }
    });
  }

  const onRightClick = () => {
    if (containerEl.current && !scrollInfo.endOfList) {
      setState(containerEl.current, '>');
    }
  };

  const onLeftClick = () => {
    if (containerEl.current && !scrollInfo.startOfList) {
      setState(containerEl.current, '<');
    }
  };

  return (
    <div className="horizontal-scroller">
      {!scrollInfo.startOfList && (
        <div className="left-arrow" onClick={onLeftClick}>
          Left
        </div>
      )}
      <div {...rest} ref={containerEl} style={scrollInfo.styles} />
      {!scrollInfo.endOfList && (
        <div className="right-arrow" onClick={onRightClick}>
          Right
        </div>
      )}
      {scrollInfo.endOfList && (
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
