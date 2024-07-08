import { THEMES } from "./contants";

//BACKEND
("auth/authenticate");
export interface IResponseAuth {
  status: StatusAuth;
  data: DataReponseAuth;
}

export interface StatusAuth {
  hasError: boolean;
  code: number;
}

export interface DataReponseAuth {
  access_token: string | null;
  refresh_token: string | null;
  message: string;
  change_password?: boolean;
}

const response: IResponseAuth = {
  status: {
    hasError: false,
    code: 200,
  },
  data: {
    access_token:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzYyOTU4MSIsImlhdCI6MTcyMDM5NzY0MSwiZXhwIjoxNzIxMDAyNDQxfQ.AdUKPvBoNRe-yUAos28cc6SA0aQRdG7uvBoyBNBRCdo",
    refresh_token:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNzYyOTU4MSIsImlhdCI6MTcyMDM5NzY0MSwiZXhwIjoxNzIwNDg0MDQxfQ.Pu9hzMNL2r4ESdjPQ5fFieCylNj69A8qsBZ8MA5xFko",
    message: "Cambia tu password Aquí!! www.nescorp.cl/sisbuy/changeFirstPass",
    change_password: true,
  },
};

//FRONTEND
export interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
}

export interface IRegister {
  nombres: string;
  apellidos: string;
  correo: string;
  dni: string;
  role: string;
}

export type ThemeSgd = "light" | "dark";
