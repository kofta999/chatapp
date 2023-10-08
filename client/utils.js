function sendAuthenticatedRequest(url, method, data = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  let options;
  if (method === "GET") {
    options = {
      method: method,
      headers: headers,
    };
  } else {
    options = {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    };
  }
  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));
}
