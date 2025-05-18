export const createResponse = async (dataObj) => {
  const token = localStorage.getItem("token");
  const req = await fetch(`http://localhost:3000/stories/create`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(dataObj),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data,
  };
};
