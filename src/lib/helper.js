const timer = (seconds) => {
  const format = (val) => `0${Math.floor(val)}`.slice(-2);
  var hours = seconds / 3600;
  var minutes = (seconds % 3600) / 60;
  return [minutes, seconds % 60].map(format).join(":");
};

export { timer };
