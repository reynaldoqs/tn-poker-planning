export const setItem = (obj: unknown, key: string) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

export const getItem = <T = unknown>(key: string) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data) as T;
  return null;
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
