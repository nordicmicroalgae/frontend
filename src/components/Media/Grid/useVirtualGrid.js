import { useEffect, useState } from 'react';

import estimateVisibleRange from './helpers/estimateVisibleRange';


function useVirtualGrid({ data, layout, ref }) {
  const totalItems = data.length;

  const [visibleRange, setVisibleRange] = useState({
    startRow: undefined,
    endRow: undefined,
    rowCount: undefined,
  });

  const updateVisibleRange = () => {
    const { startRow, endRow } = estimateVisibleRange(
      ref.current,
      layout.itemHeight + layout.itemSpacing,
    );

    const rowCount = Math.max(
      Math.min(
        endRow - startRow,
        Math.floor(totalItems / layout.columnCount)
      ),
      1
    );

    setVisibleRange({startRow, endRow, rowCount});
  };

  useEffect(() => {
    const handleScroll = _e => updateVisibleRange();

    window.addEventListener('scroll', handleScroll);

    updateVisibleRange();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [data, layout]);


  const items = data.slice(
    visibleRange.startRow * layout.columnCount - layout.columnCount,
    (visibleRange.endRow * layout.columnCount) + layout.columnCount,
  );

  return { items, visibleRange };
}


export default useVirtualGrid;
