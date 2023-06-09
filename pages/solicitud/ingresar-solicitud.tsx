import React, { useState, useEffect } from 'react'
import { Layout } from '../../components/layouts'
import { Grid, Divider, Card, CardHeader, CardContent, TextField, Button, useMediaQuery, MenuItem, Typography } from '@mui/material';
import { TableDefault } from '../../components/ui/Tables/Table';
import { ItemSolicitud } from '../../interface/Sgd';
import { AddItem } from '../../components/solicitud/ingresarSolicitud/AddItem';
import { CalculateSolicitud } from '../../components/solicitud/calculateSolicitud/CalculateSolicitud';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const headerSolicitud = ['N°','Cantidad', 'Unidad de Medida', 'Detalle o Descripción', 'Clasificación Presupuestaria', 'Precio Neto', '']

const initItem = {
    numero_solicitud: '',
    tipo_compra: '',
    fecha_ingreso: '',
    area: '',
    unidad: '',
    afecto: '',
    total_neto: '',
    iva: '',
    total_buto: '',
    destino: '',
    programa: '',
}

const Solicitud = () => {

    const lgMd = useMediaQuery((theme) => (theme as any).breakpoints.up('md'));

    const [items, setItems] = useState<ItemSolicitud[]>([]);

    const { values, errors, touched, handleChange, handleBlur, resetForm } = useFormik({
        initialValues: initItem,
        validationSchema: Yup.object({
        numero_solicitud: Yup
            .string()
            .required('requerido'),
        tipo_compra: Yup
            .string()
            .required('requerido'),
        fecha_ingreso: Yup
            .string()
            .required('requerido'),
        area: Yup
            .string()
            .required('requerido'),
        unidad: Yup
            .string()
            .required('requerido'),
        }),
        onSubmit: async (values, helpers) => {
            console.log("estamos enviando form");
        }
    });

    const handleAddItem = (values:ItemSolicitud ) => {
        setItems((prev) => {
            return [
                ...prev,
                values
            ]
        })
    }

    const handleRemoveItem = (index: number) => {
        const clone = items
        clone.splice(index, 1)
        setItems(() => {
            return [...clone]
        })
    }

    useEffect(() => {
        console.log("values", values); 
    }, [values])
    

    return (
        <Layout>
            <Card>
                <CardHeader title={'Nueva Solicitud de compra'}/>
                <Divider />
                <CardContent>
                    <Grid sx={{width: '100%', paddingBottom: 2}} container>
                        <Grid sx={{paddingRight: 4}} lg={6} md={6} sm={6} xs={12} item>
                            <Grid sx={{width: '100%', paddingBottom: 4}} container>
                                <Grid lg={6} md={6} sm={12} xs={12} item>
                                    <TextField 
                                        sx={{width: '100%', paddingRight:2 }}
                                        id="standard-basic" label="Solicitud de compra N° xxx" variant="standard" 
                                        name='numero_solicitud'
                                        value={values.numero_solicitud}
                                        onChange={handleChange}
                                        error={!!(touched.numero_solicitud && errors.numero_solicitud)}
                                        helperText={touched.numero_solicitud && errors.numero_solicitud}
                                        color="warning"
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid lg={6} md={6} sm={12} xs={12} item>
                                    <TextField
                                        sx={{width: '100%', position: 'relative', bottom: 4 }}
                                        id="standard-select-currency"
                                        label="Tipo de Compra"
                                        defaultValue={'kilo'}
                                        select
                                        variant="standard"
                                        name='tipo_compra'
                                        value={values.tipo_compra}
                                        error={!!(touched.tipo_compra && errors.tipo_compra)}
                                        helperText={touched.tipo_compra && errors.tipo_compra}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    >
                                    <MenuItem value={'kilo'}>kilo</MenuItem>
                                    <MenuItem value={'kilo2'}>Kilo2</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                            {/* datos generales */}
                            <Grid sx={{width: '100%', paddingBottom: 4}} container>
                                <Grid lg={4} md={4} sm={12} xs={12} item>
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
                                <Grid lg={4} md={4} sm={12} xs={12} item>
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
                                <Grid lg={4} md={4} sm={12} xs={12} item>
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
                        </Grid>
                        <Grid lg={6} md={6} sm={6} xs={12} item>
                            <Grid container spacing={2}>
                                <Grid lg={6} md={6} sm={6} xs={12} item> 
                                    <Card sx={{padding: 1, minHeight: 250, border: .5}} >
                                        <CardContent>
                                            <Typography fontSize={12} variant='h4'>Modalidades de  Compra</Typography>
                                            <Typography fontSize={12}>Trato directo</Typography>
                                            <Typography fontSize={12}>Compra agil</Typography>
                                            <Typography fontSize={12}>Convenio Marco</Typography>
                                            <Typography fontSize={12}>Licitación Privada</Typography>
                                            {/* <Typography fontSize={12}>{'Licitación Pública <=100UTM (L1)'}</Typography>
                                            <Typography fontSize={12}>{'Licitación Pública > 100 UTM y <= 1000 UTM (LE)'}</Typography>
                                            <Typography fontSize={12}>{'Licitación Pública > 1000 UTM y <= 2000 UTM (LP)'}</Typography>
                                            <Typography fontSize={12}>{'Compra excluida del sistema (Art. 53 Ley 19886)'}</Typography>
                                            <Typography fontSize={12}>{'Licitación Pública > 2000 UTM y <= 5000 UTM (LQ)'}</Typography>
                                            <Typography fontSize={12}>{'Licitación Pública > 5000 UTM (LR)'}</Typography> */}
                                            <Typography>mucho texto...</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid lg={6} md={6} sm={6} xs={12} item>
                                    <Card sx={{padding: 1, minHeight: 250, border: .5}}>
                                        <CardContent>
                                            <Typography fontSize={12} variant='h4'>Requisitos a considerar</Typography>
                                            <Typography fontSize={12}>Debe adjuntar programa Municipal</Typography>
                                            <Typography fontSize={12}>Debe adjuntar Subprograma Municipal</Typography>
                                            <Typography fontSize={12}>Debe adjuntar mínimo 3 cotizaciones</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>  
                        </Grid>         
                    </Grid>
                    {/* row */}
                    <AddItem addItems={handleAddItem}/>  
                    {/* table*/}
                    <TableDefault header={headerSolicitud} items={items} handleRemoveItem={handleRemoveItem}/>

                    {/* calculate */}
                    <CalculateSolicitud items={items}/>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default Solicitud
