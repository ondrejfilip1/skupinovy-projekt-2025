export const login = async (username, password) => {
  const req = await fetch(`http://localhost:3000/user/login/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  const data = await req.json();

  if (req.status === 200) {
    localStorage.setItem("token", data.token);
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

export const login = async (username, password) => {
  const req = await fetch(`http://localhost:3000/user/register/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  const data = await req.json();

  if (req.status === 200) {
    localStorage.setItem("token", data.token);
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
