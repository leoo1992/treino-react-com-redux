export default function getLocalStorage(key, init= null) {
  try {
    const response = JSON.parse(localStorage.getItem(key));

    if (response && response !== null && response !== undefined) {
      return response;
    } else {
      return init;
    }
  } catch (error) {
    return init;
  }
}
