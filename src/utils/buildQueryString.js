export default function buildQueryString(query) {
  const queryParamStrings = [];

  Object.keys(query).sort().forEach(paramName => {
    let paramValue = query[paramName];

    let paramNameString = encodeURIComponent(paramName);
    let paramValueString = undefined;

    if (paramValue === true || paramValue === false) {
      if (paramValue === false) {
        paramNameString = `-${paramNameString}`;
      }
    } else if (Array.isArray(paramValue)) {
      paramValueString = paramValue.map(
        paramValueItem => encodeURIComponent(paramValueItem)
      ).join(',');
    } else {
      paramValueString = encodeURIComponent(paramValue);
    }

    if (paramValueString == null) {
      queryParamStrings.push(paramNameString);
    } else {
      queryParamStrings.push(`${paramNameString}=${paramValueString}`);
    }

  });

  return queryParamStrings.join('&');
}
