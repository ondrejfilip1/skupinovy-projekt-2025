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
