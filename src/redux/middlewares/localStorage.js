const localStorage = (_store) => (next) => (action) => {
  const response = next(action);
  const { meta } = action;

  if (meta && meta.localStorage !== undefined) {
    const { key, value } = meta.localStorage;

    if (
      key &&
      value &&
      value !== undefined &&
      value !== null &&
      key !== undefined &&
      key !== null
    ) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  return response;
};

export default localStorage;
