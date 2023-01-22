import { useEffect, useState } from 'react';

import estimateVisibleRange from './helpers/estimateVisibleRange';


function useVirtualList({ list, refs, itemHeight }) {

  const [ virtualList, setVirtualList ] = useState(
    list.map(({group, items}) => ({
      group,
      virtual: {height: items.length * itemHeight}
    }))
  );

  const [ virtualListItems, setVirtualListItems ] = useState(
    list.reduce((itemsByGroup, {group, items}) => ({
      ...itemsByGroup,
      [group]: [],
    }), {})
  );

  const updateVirtualList = () => setVirtualList(
    list.map(({ group, items }) => ({
      group,
      virtual: {height: items.length * itemHeight},
    }))
  );

  useEffect(() => {
    const handleResize = _e => updateVirtualList();
    const handleScroll = _e => updateVirtualList();

    updateVirtualList();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    }
  }, [ list ]);


  useEffect(() => {
    setVirtualListItems(
      list.reduce((itemsByGroup, { group, items }) => {
        const [ startIndex, endIndex ] = estimateVisibleRange(
          refs.current[group],
          itemHeight
        );
        return {
          ...itemsByGroup,
          [group]: items
            .slice(startIndex, endIndex)
            .map((item, index) => ({
              item,
              virtual: {
                height: itemHeight,
                top: (startIndex + index) * itemHeight,
              }
            }))
        }
      }, {})
    )
  }, [ virtualList ]);

  return virtualList.map(virtualListGroup => ({
    ...virtualListGroup,
    items: virtualListItems[virtualListGroup.group] || [],
  }));
}

export default useVirtualList;
