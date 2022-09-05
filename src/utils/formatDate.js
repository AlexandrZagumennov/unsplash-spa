const formatDate = date => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('ru', options)
    .format(new Date(date));
};

export default formatDate;