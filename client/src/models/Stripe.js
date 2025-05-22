export const getPublicKey = async () => {
  const req = await fetch(`http://localhost:3000/stripe/config/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await req.json();
  return {
    status: req.status,
    publishableKey: data.publishableKey,
  };
};

export const createPaymentIntent = async (cart) => {
  const req = await fetch(
    `http://localhost:3000/stripe/create-payment-intent/`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ cart }),
    }
  );
  const data = await req.json();
  return {
    status: req.status,
    message: data.message,
    clientSecret: data.clientSecret,
  };
};

export const getPaymentIntent = async (paymentId) => {
  const req = await fetch(
    `http://localhost:3000/stripe/retrieve-payment-intent/${paymentId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  const data = await req.json();
  return {
    status: req.status,
    paymentIntent: data.paymentIntent,
  };
};

export const getBalance = async () => {
  const token = localStorage.getItem("token");
  const req = await fetch(`http://localhost:3000/stripe/balance/`, {
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
    balance: data.balance,
  };
};

export const getPayouts = async () => {
  const token = localStorage.getItem("token");
  const req = await fetch(`http://localhost:3000/stripe/payouts/`, {
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
    payouts: data.payouts,
  };
};
