export function selectByCollection(state, collection) {
  return state?.filter(
    facts => facts.collection.toLowerCase() === collection
  );
}

export function selectCollectionByProvider(state, collection, provider) {
  return state?.find(facts =>
    Object.entries({ collection, provider }).every(
      ([key, value]) => facts[key].toLowerCase() === value.toLowerCase()
    )
  );
}
