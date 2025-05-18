export const getAllGames = async () => {
  const req = await fetch("http://localhost:3000/games", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};

export const getGameById = async (id) => {
  const req = await fetch(`http://localhost:3000/games/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};

export const createGame = async (formData) => {
  const token = localStorage.getItem("token");
  const req = await fetch(`http://localhost:3000/games`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};

export const updateGame = async (id, formData) => {
  const token = localStorage.getItem("token");
  const req = await fetch(`http://localhost:3000/games/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify(formData),
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};

export const deleteGame = async (id) => {
  const token = localStorage.getItem("token");
  const req = await fetch(`http://localhost:3000/games/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
  const data = await req.json();
  return {
    status: req.status,
    payload: data.payload,
    message: data.message,
  };
};
