import asArray from 'Utilities/asArray';

import fieldMappings from './field-mappings';

function isEmptyValue(value) {
  if (Array.isArray(value)) {
    return value.every(isEmptyValue);
  }
  return [undefined, null, ''].includes(value);
}

export function getFieldKeys() {
  return [...fieldMappings.keys()];
}


export function getAttributeList(attributes, fieldList = getFieldKeys()) {
  return fieldList.reduce((attributeList, key) => {
    const name = fieldMappings.get(key);
    const value = attributes[key] || null;

    if (!isEmptyValue(value)) {
      attributeList = [...attributeList, { name, value }];
    }

    return attributeList;
  }, []);
}


const reversedFieldMapping = new Map(
  [...fieldMappings.entries()].map(
    entry => entry.reverse()
  )
);

export function applyFilters(attributeList, filterList) {
  return attributeList.map(
    ({ name, value }) => {

      const field = reversedFieldMapping.get(name);

      const filtersToApply =
        filterList.filter(
          filter => filter.appliesTo.includes(field)
        );

        if (filtersToApply.length > 0) {
          value = filtersToApply.reduce(
            (previousValue, filter) =>
              asArray(previousValue).map(
                itemValue => filter({
                  field,
                  value: itemValue,
                })
              ),
            value
          );
        }

      return { name, value }
    }
  );
}
