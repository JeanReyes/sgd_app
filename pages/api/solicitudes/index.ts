// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Solicitud } from "../../../interface/Sgd";

const calculate = {
  total_neto: "100",
  iva: "19",
  total_bruto: "119",
  destino: "mi casa",
  programa: "San Cli",
  observacion: "data fake",
};

const Items = [
  {
    quantity: "2",
    unidad_medida: "kilo",
    detail: "campras varias",
    classification: "clasificación",
    precio: "100",
  },
  {
    quantity: "2",
    unidad_medida: "kilo",
    detail: "campras varias",
    classification: "clasificación",
    precio: "100",
  },
  {
    quantity: "2",
    unidad_medida: "kilo",
    detail: "campras varias",
    classification: "clasificación",
    precio: "100",
  },
  {
    quantity: "2",
    unidad_medida: "kilo",
    detail: "campras varias",
    classification: "clasificación",
    precio: "100",
  },
  {
    quantity: "2",
    unidad_medida: "kilo",
    detail: "campras varias",
    classification: "clasificación",
    precio: "100",
  },
  {
    quantity: "2",
    unidad_medida: "kilo",
    detail: "campras varias",
    classification: "clasificación",
    precio: "100",
  },
];

const SolicitudStates = [
  {
    unidad: "(1) VºBº Unidad Requirientes",
    fecha: "12/12/2023",
    firma: "definir firma",
    observacion: "Esta es una observación",
    status: "aprovado",
  },
  {
    unidad: "(2) VºBº Dirección U.",
    fecha: "13/12/2023",
    firma: "definir firma",
    observacion: "Esta es una observación",
    status: "aprovado",
  },
  {
    unidad: "(3) VºBº Administrador Municipal.",
    fecha: "13/12/2023",
    firma: "definir firma",
    observacion: "Esta es una observación",
    status: "aprovado",
  },
  {
    unidad: "(4) VºBº Dirección de control.",
    fecha: "13/12/2023",
    firma: "definir firma",
    observacion: "Esta es una observación",
    status: "aprovado",
  },
  {
    unidad: "(5) VºBº Departamento de Contabilidad, Finanzas y Presupuesto",
    fecha: "13/12/2023",
    firma: "definir firma",
    observacion: "Esta es una observación",
    status: "aprovado",
  },
  {
    unidad: "(6) VºBº Dirección de Administración y Finanzas.",
    fecha: "13/12/2023",
    firma: "definir firma",
    observacion: "Esta es una observación",
    status: "revision",
  },
  {
    unidad: "(7) VºBº Dirección de Asesoria Jurídica.",
    fecha: "13/12/2023",
    firma: "definir firma",
    observacion: "Esta es una observación",
    status: "pendiente",
  },
  {
    unidad: "(8) VºBº Unidad de Compras.",
    fecha: "13/12/2023",
    firma: "definir firma",
    observacion: "Esta es una observación",
    status: "pendiente",
  },
];

const Solicitudes = [
  {
    id: "1234",
    fecha_creacion: "12/12/2023",
    creador: "Clitobars Gonzalez",
    numero_solicitud: "40235",
    area: "Administracion",
    firma: "Firma xxx",
    status: SolicitudStates,
    items: Items,
    calculate: calculate,
  },
  {
    id: "12",
    fecha_creacion: "12/12/2023",
    creador: "Clitobars Gonzalez",
    numero_solicitud: "40235",
    area: "Administracion",
    firma: "Firma xxx",
    status: SolicitudStates,
    items: Items,
    calculate: calculate,
  },
  {
    id: "1213",
    fecha_creacion: "12/12/2023",
    creador: "Clitobars Gonzalez",
    numero_solicitud: "40235",
    area: "Administracion",
    firma: "Firma xxx",
    status: SolicitudStates,
    items: Items,
    calculate: calculate,
  },
];

type Data = {
  data: Solicitud[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("solicitudes");

  res.status(200).json({
    data: Solicitudes,
  });
}
