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
