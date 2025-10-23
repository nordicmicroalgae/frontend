import { useEffect, useRef, useState } from 'react';


function useGridLayout({ data, size, spacing }) {
  const ref = useRef();

  const totalItems = data.length;

  const [itemWidth, itemHeight] = size;

  const [layout, setLayout] = useState({
    columnCount: undefined,
    rowCount: undefined,
    gridWidth: undefined,
    gridHeight: undefined,
    itemSpacing: undefined,
    itemWidth,
    itemHeight,
  });

  const updateLayout = () => {
    const gridWidth = ref.current.offsetWidth;

    let columnCount = Math.round(
      gridWidth / (itemWidth + spacing)
    );

    let remainingSpace = (
      gridWidth - (columnCount * (itemWidth + spacing))
    );

    if (remainingSpace + spacing < 0) {
      columnCount = columnCount - 1;
      remainingSpace = (
        gridWidth - (columnCount * (itemWidth + spacing))
      );
    }

    const rowCount = Math.ceil(totalItems / columnCount);

    const itemSpacing = Math.round(
      (gridWidth - (columnCount * itemWidth)) / (columnCount + 1)
    );

    const gridHeight = Math.round(
      rowCount * (itemHeight + itemSpacing)
    );

    setLayout(prev => ({
      ...prev,
      columnCount, rowCount, gridWidth, gridHeight, itemSpacing,
    }));
  };

  useEffect(() => {
    const handleResize = _e => updateLayout();

    window.addEventListener('resize', handleResize);

    updateLayout();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [totalItems, itemWidth, itemHeight, spacing]);

  return { layout, ref };
}


export default useGridLayout;
