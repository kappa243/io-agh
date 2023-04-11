const daysUntil = (date) => {
  const today = new Date();
  const diff = date.getTime() - today.getTime();
  return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
};

export default daysUntil;