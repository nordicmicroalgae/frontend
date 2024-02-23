function formatDate(dateString) {
  return (new Date(dateString)).toLocaleDateString();
}

export default formatDate;
