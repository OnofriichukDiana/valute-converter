export const fetcher = (
  url = process.env.REACT_APP_BACKEND_URL || "",
  init?: RequestInit
) => fetch(url, init).then((res) => res.json());
