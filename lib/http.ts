export const cruder = (hostname: string) => (resource: string) => {
  const url = `${hostname}/${resource}`;
  return {
    read: async <T = unknown>(path?: string) => {
      const response = await fetch(`${url}${path ? `/${path}` : null}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json() as T;
    },
    create: async <I = unknown, R = I>(data: I) => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json() as R;
    },
  };
};
