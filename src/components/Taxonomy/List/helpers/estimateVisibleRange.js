function estimateVisibleRange(parentElement, itemHeight) {
  const scrollOffset = {
    top: window.scrollY,
    bottom: window.innerHeight + window.scrollY
  };

  const parentOffset = {
    top: parentElement.offsetTop,
    bottom: parentElement.offsetHeight + parentElement.offsetTop
  };

  let startIndex = 0, endIndex = 0;

  if (parentOffset.top <= scrollOffset.bottom
    && parentOffset.bottom >= scrollOffset.top) {
    startIndex = Math.max(
      Math.floor((scrollOffset.top - parentOffset.top) / itemHeight), 0
    );
    endIndex = startIndex + Math.ceil(
      (Math.min(parentOffset.bottom, scrollOffset.bottom) -
       Math.max(parentOffset.top, scrollOffset.top)) / itemHeight
    ) - 1;
  }

  return [startIndex, endIndex];
}

export default estimateVisibleRange;
