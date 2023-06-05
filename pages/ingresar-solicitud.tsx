import React, { useState, useEffect } from 'react'
import { Layout } from '../components/layouts'
import { Grid, Divider, Card, CardHeader, CardContent, TextField, Button, useMediaQuery, MenuItem } from '@mui/material';
import { TableDefault } from '../components/ui/Tables/Table';
import { ItemSolicitud } from '../interface/Sgd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AddItem } from '../components/solicitud/ingresarSolicitud/AddItem';


const headerSolicitud = ['N°','Cantidad', 'Unidad de Medida', 'Detalle o Descripción', 'Clasificación Presupuestaria', 'Precio Neto']

const initItem = {
    quantity: '',
    unidad_medida: '',
    detail: '',
    classification: '',
    precio: ''
}

const Solicitud = () => {

    const lgMd = useMediaQuery((theme) => (theme as any).breakpoints.up('md'));
    const [items, setItems] = useState<ItemSolicitud[]>([]);

    const handleAddItem = (values:ItemSolicitud ) => {
        setItems((prev) => {
            return [
                ...prev,
                values
            ]
        })
    }

    return (
        <Layout>
            <Card>
                <CardHeader title={'Nueva Solicitud de compra'}/>
                <Divider />
                <CardContent>
                    <Grid sx={{width: '100%', paddingBottom: 4}} container>
                        <Grid lg={6} md={6} sm={12} xs={12} item>
                            <TextField 
                                sx={{
                                    width: '100%'
                                }}
                                id="standard-basic" label="Solicitud de compra N° xxx" variant="standard" 
                            //   value={}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    console.log(event.target.value);
                                
                                }}/>

                        </Grid>
                    </Grid>
                    {/* datos generales */}
                    <Grid sx={{width: '100%', paddingBottom: 4}} container>

                        <Grid lg={2} md={2} sm={12} xs={12} item>
                            <TextField 
                                sx={{
                                    width: '100%',
                                    paddingRight:2
                                }}
                                id="standard-basic" label="Fecha de ingreso:" variant="standard" 
                            //   value={}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    console.log(event.target.value);

                            }}/>
                            
                        </Grid>
                        <Grid lg={2} md={2} sm={12} xs={12} item>
                            <TextField 
                                sx={{
                                    width: '100%',
                                    paddingRight:2
                                }}
                                id="standard-basic" label="Área" variant="standard" 
                            //   value={}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    console.log(event.target.value);
                                    
                            }}/>     
                        </Grid>
                        <Grid lg={2} md={2} sm={12} xs={12} item>
                            <TextField 
                            sx={{
                                width: '100%'
                            }}
                            id="standard-basic" label="Unidad" variant="standard" 
                        //   value={}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                console.log(event.target.value);
                            
                            }}/>
                         
                        </Grid>
                    </Grid>
                    {/* row */}
                    <AddItem addItems={handleAddItem}/>  
                    {/* table*/}
                    <TableDefault header={headerSolicitud} items={items}/>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default Solicitud
