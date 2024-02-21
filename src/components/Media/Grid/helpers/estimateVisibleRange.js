function estimateVisibleRange(parentElement, itemHeight) {
  const scrollOffset = {
    top: window.scrollY,
    bottom: window.innerHeight + window.scrollY,
  };

  const parentOffset = {
    top: parentElement.offsetTop,
    bottom: parentElement.offsetHeight + parentElement.offsetTop,
  };

  let startRow = 0, endRow = 0;

  if (parentOffset.top <= scrollOffset.bottom
    && parentOffset.bottom >= scrollOffset.top) {

    startRow = Math.max(
      Math.floor(
        (scrollOffset.top - parentOffset.top) / itemHeight
      ),
      1
    );

    endRow = startRow + (
      Math.ceil(
        (Math.min(parentOffset.bottom, scrollOffset.bottom) -
         Math.max(parentOffset.top, scrollOffset.top))
        / itemHeight
      )
    );
  }

  return { startRow, endRow };
}

export default estimateVisibleRange;
