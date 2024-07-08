import { IResponseAuth } from "../interface/Auth";

const getDataFakeAuth = (dataApi: any) => {
  return {
    status: {
      hasError: false,
      code: 200,
    },
    data: {
      ...dataApi,
      change_password: true,
    },
  };
};

const getDataFakeRegister = (dataApi: any) => {
  return {
    status: {
      hasError: false,
      code: 200,
    },
    data: dataApi,
  };
};

export const autenticate = async <T>(data: T): Promise<IResponseAuth> => {
  const headers = {
    "Content-Type": "application/json",
  };

  const reponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/authenticate`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }
  );

  return {
    ...getDataFakeAuth(await reponse.json()),
  };

  // return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${url}`, {
  //   method,
  //   headers,
  //   body: JSON.stringify(data),
  // });
};

export const register = async <T>(data: T) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const reponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    }
  );

  return {
    ...getDataFakeRegister(await reponse.json()),
  };
};

export const cambiarContraseña = async (newPassword: string) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const reponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api`, {
    method: "POST",
    headers,
    body: JSON.stringify({ password: newPassword }),
  });
};
