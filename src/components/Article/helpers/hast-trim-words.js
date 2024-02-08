export default function trimWords(htmlAST, options) {
  const config = {
    size: 50,
    ellipsis: '\u2026',
    ...(options ?? {}),
  };

  let readSize = 0;

  let overflowingTextNode;

  function trim(node) {
    if (node.type === 'text') {
      const words = node.value.split(/\s/).filter(w => w);

      readSize = readSize + words.length;

      if (readSize > config.size) {
        const truncatedWords = words.slice(
          0,
          words.length - (readSize - config.size)
        );
        overflowingTextNode = {
          ...node,
          value: truncatedWords.join(' '),
        };
        return overflowingTextNode;
      }
    }

    const replacementNode = {...node};

    if (Array.isArray(node.children)) {
      const children = [];
      let index = -1;

      while (++index < node.children.length) {
        const result = trim(node.children[index]);

        if (result) {
          children.push(result);
        }

        if (overflowingTextNode) {
          break;
        }
      }
      replacementNode.children = children;
    }

    return replacementNode;
  }

  const result = trim(htmlAST);

  if (overflowingTextNode) {
    overflowingTextNode.value += config.ellipsis;
  }

  return structuredClone(result);
}
