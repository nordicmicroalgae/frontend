export default function parseQueryString(queryString) {
  const parsedQuery = {};

  if (queryString.startsWith('?')) {
    queryString = queryString.slice(1);
  }

  if (queryString.endsWith('&')) {
    queryString = queryString.slice(0, -1);
  }

  if (queryString.length < 1) {
    return parsedQuery;
  }

  queryString.split('&').forEach(paramString => {
    let [ paramName, paramValue ] = paramString.split('=');

    if (paramValue == null) {
      paramValue = true;

      if (paramName.startsWith('-')) {
        paramName = paramName.slice(1);
        paramValue = false;
      }
    } else if (paramValue.includes(',')) {
      paramValue = paramValue.split(',').map(
        paramValueItem => decodeURIComponent(paramValueItem).trim()
      );
    } else {
      paramValue = decodeURIComponent(paramValue).trim();
    }

    paramName = decodeURIComponent(paramName);

    if (paramName.length < 1) {
      throw new Error(
        'Query parameter names MUST be a non-zero length string'
      );
    }

    if (parsedQuery[paramName] != null) {
      throw new Error(
        'Query parameter names MUST must be unique and only occur once'
      );
    }

    parsedQuery[paramName] = paramValue;
  });

  return parsedQuery;
}
