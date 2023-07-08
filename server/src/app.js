const express = require('express');
const app = express();
const port = 8080;

const statusItem =  [
    {
          unidad: '(1) VºBº Unidad Requirientes',
          fecha: '12/12/2023',
          firma: 'definir firma',
          observacion: 'Esta es una observación',
          status: 'aprovado'
      },
      {
          unidad: '(2) VºBº Dirección U.',
          fecha: '13/12/2023',
          firma: 'definir firma',
          observacion: 'Esta es una observación',
          status: 'aprovado'
      },
      {
          unidad: '(3) VºBº Administrador Municipal.',
          fecha: '13/12/2023',
          firma: 'definir firma',
          observacion: 'Esta es una observación',
          status: 'aprovado'
      },
      {
          unidad: '(4) VºBº Dirección de control.',
          fecha: '13/12/2023',
          firma: 'definir firma',
          observacion: 'Esta es una observación',
          status: 'aprovado'
      },
      {
          unidad: '(5) VºBº Departamento de Contabilidad, Finanzas y Presupuesto',
          fecha: '13/12/2023',
          firma: 'definir firma',
          observacion: 'Esta es una observación',
          status: 'aprovado'
      },
      {
          unidad: '(6) VºBº Dirección de Administración y Finanzas.',
          fecha: '13/12/2023',
          firma: 'definir firma',
          observacion: 'Esta es una observación',
          status: 'revision'
      },
      {
          unidad: '(7) VºBº Dirección de Asesoria Jurídica.',
          fecha: '13/12/2023',
          firma: 'definir firma',
          observacion: 'Esta es una observación',
          status: 'pendiente'
      },
      {
          unidad: '(8) VºBº Unidad de Compras.',
          fecha: '13/12/2023',
          firma: 'definir firma',
          observacion: 'Esta es una observación',
          status: 'pendiente'
      }
]

const ItemsFake = [
{
    id: '1234',
    fecha_creacion: '12/12/2023',
    creador: 'Clitobars Gonzalez',
    numero_solicitud: '40235',
    area: 'Administracion',
    firma: 'Firma xxx',
    status: statusItem
},
{
    id: '12',
    fecha_creacion: '12/12/2023',
    creador: 'Clitobars Gonzalez',
    numero_solicitud: '40235',
    area: 'Administracion',
    firma: 'Firma xxx',
    status: statusItem
},
{
    id: '1213',
    fecha_creacion: '12/12/2023',
    creador: 'Clitobars Gonzalez',
    numero_solicitud: '40235',
    area: 'Administracion',
    firma: 'Firma xxx',
    status: statusItem
}
]

const item = {
    id: '1234',
    fecha_creacion: '12/12/2023',
    creador: 'Clitobars Gonzalez',
    numero_solicitud: '40235',
    area: 'Administracion',
    firma: 'Firma xxx',
    status: statusItem
}
  
//solicitud

app.get('/solicitudes', (req, res) => {
    res.status(200).json({
        data: ItemsFake
    })
});

app.get('/solicitudes/:id', (req, res) => {
    const id = req.params.id;
    const solicitud = ItemsFake.find(s => s.id === id);
    if (!solicitud) {
       return res.status(404).json({ error: 'Solicitud no encontrada' });
    } 
    
    res.status(200).json(solicitud);

});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});