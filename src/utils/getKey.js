export default function getKey(...args) {
  const parts = args.map(value => {
    value = value.toString();
    value = value.toLowerCase();
    value = value.replace(/[^a-z0-9\-]/g, '');
    value = value.substring(0, 32);
    return value;
  });

  return parts.join('-');
}
