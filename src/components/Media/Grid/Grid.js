import React from 'react';
import PropTypes from 'prop-types';

import getKey from 'Utilities/getKey';
import useGridLayout from './useGridLayout';
import useVirtualGrid from './useVirtualGrid';
import Attributes from 'Components/Attributes';
import Picture from 'Components/Media/Picture';


const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      previewUrl: PropTypes.string,
      thumbnailUrl: PropTypes.string,
      attributes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
          ]),
        })
      )
    })
  ),
  size: PropTypes.arrayOf(
    PropTypes.number,
  ),
  spacing: PropTypes.number,
  virtual: PropTypes.bool,
  ItemWrapper: PropTypes.elementType,
};



const DefaultController = ({data, children}) => {
  return children({items: data});
};

const VirtualController = ({
  data,
  layout,
  gridRef,
  children
}) => {
  const { items, visibleRange } = (
    useVirtualGrid({data, layout, ref: gridRef})
  );
  return children({
    items,
    styleProps: {
      '--virtual-grid-start-row':
        visibleRange.startRow,
      '--virtual-grid-end-row':
        visibleRange.endRow,
      '--virtual-grid-row-count':
        visibleRange.rowCount,
    },
  });
};


const Grid = ({
  data,
  size = [160, 200],
  spacing = 5,
  virtual = true,
  ItemWrapper = ({children}) => children,
}) => {
  const { layout, ref } = useGridLayout({ data, size, spacing });

  const Controller = virtual
    ? VirtualController
    : DefaultController;

  const isMissing = data.length === 0

  return (
    <Controller data={data} layout={layout} gridRef={ref}>
      {({ items, styleProps }) => (
        <div
          ref={ref}
          className={virtual
            ? 'media-grid-container media-grid-virtual'
            : 'media-grid-container'
          }
          style={{
            '--grid-width':
              layout.gridWidth,
            '--grid-height':
              layout.gridHeight,
            '--grid-item-width':
              layout.itemWidth,
            '--grid-item-height':
              layout.itemHeight,
            '--grid-item-spacing':
              layout.itemSpacing,
            '--grid-column-count':
              layout.columnCount,
            '--grid-row-count':
              layout.rowCount,
            ...(styleProps ?? {})
          }}
        >
          <div
            className={
              items.length > layout.columnCount
                ? 'media-grid media-grid-multi-rows'
                : 'media-grid media-grid-single-row'
            }
          >
          {isMissing && (
            <div className="is-missing">
              <p>No media available for this taxon.</p>
            </div>
          )}
            {items.map(item => (
              <div
                className="media-grid-item"
                key={getKey('media-grid-item', item.key)}
              >
                <ItemWrapper data={item}>
                  <Picture
                    src={item.thumbnailUrl}
                    backgroundImage={item.previewUrl}
                    width={layout.itemWidth}
                    Placeholder={() => null}
                  />
                  {item.attributes && (
                    <Attributes list={item.attributes} />
                  )}
                </ItemWrapper>
              </div>
            ))}
          </div>
        </div>
      )}
    </Controller>
  );
};

Grid.propTypes = propTypes;


export default Grid;
