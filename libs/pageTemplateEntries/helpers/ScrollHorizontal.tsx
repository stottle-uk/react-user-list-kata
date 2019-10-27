import { Link } from '@router';
import React, { CSSProperties, useRef, useState } from 'react';

export interface OwnProps extends React.HTMLProps<HTMLDivElement> {
  path: string;
}

interface OwnState {
  startOfList: boolean;
  endOfList: boolean;
  scrollX: number;
  styles: CSSProperties;
}

const ScrollHorizontal: React.FC<OwnProps> = ({ path, ...rest }) => {
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
          <Link href={path}>More!!!</Link>
        </div>
      )}
    </div>
  );
};

export default ScrollHorizontal;
