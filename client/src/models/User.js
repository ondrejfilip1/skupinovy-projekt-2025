export const login = async (formData) => {
  const req = await fetch(`http://localhost:3000/user/login/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await req.json();

  if (req.status === 200) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("isAdmin", data.user.isAdmin);
    return {
      status: req.status,
      message: data.message,
      user: data.user,
    };
  }
  return {
    status: req.status,
    message: data.message,
  };
};

export const register = async (formData) => {
  const req = await fetch(`http://localhost:3000/user/register/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await req.json();

  if (req.status === 200) {
    console.log(data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.payload.username);
    localStorage.setItem("isAdmin", data.payload.isAdmin);
    return {
      status: req.status,
      message: data.message,
      user: data.user,
    };
  }
  return {
    status: req.status,
    message: data.message,
  };
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const req = await fetch("http://localhost:3000/user", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  const req = await fetch(`http://localhost:3000/user/${id}`, {
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
