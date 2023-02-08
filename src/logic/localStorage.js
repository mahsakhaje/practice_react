export function useLocalStorage(key) {
  const value = localStorage.getItem(key);

  const setValue = (v) => {
    localStorage.setItem(key, v);
  };

  return { value, setValue };
}
