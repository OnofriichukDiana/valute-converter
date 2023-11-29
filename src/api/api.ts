export const fetcher = (
  url = process.env.REACT_APP_BACKEND_URL || "",
  init?: RequestInit
) => {
  let counter = Number(localStorage.getItem("apiRequestCounter"));

  if (!counter) {
    counter = 1;
  }
  counter++;

  localStorage.setItem("apiRequestCounter", counter.toString());

  if (counter >= 5) {
    localStorage.setItem("apiRequestCounter", "0");
    const simulatedError = {
      status: 500,
      statusText: "Internal Server Error",
      message: "Simulated server error",
    };

    throw simulatedError;
  }

  return fetch(url, init).then((res) => res.json());
};
