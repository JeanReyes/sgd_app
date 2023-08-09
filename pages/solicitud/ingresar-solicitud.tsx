import React, { useState, useEffect } from 'react'
import { Layout } from '../../components/layouts'
import { Grid, Divider, Card, CardHeader, CardContent, TextField, Stack, useMediaQuery, MenuItem, Typography, Box } from '@mui/material';
import { TableDefault } from '../../components/ui/Tables/Table';
import { ItemSolicitud } from '../../interface/Sgd';
import { AddItem } from '../../components/solicitud/add/addItem/AddItem';
import { CalculateSolicitud } from '../../components/solicitud/add/calculateSolicitud/CalculateSolicitud';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formatDateToDdMmYyyy } from '../../utils/methods';

const headerSolicitud = ['N°','Cantidad', 'Unidad de Medida', 'Detalle o Descripción', 'Clasificación Presupuestaria', 'Precio Unitario', 'Precio total', '']

const initItem = {
    numero_solicitud: '',
    tipo_compra: '',
    fecha_ingreso: '2023-08-03',
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

    const [items, setItems] = useState<ItemSolicitud[]>([]);
    const [editItem, setEditItem] = useState({} as {item: ItemSolicitud, index: number})

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

    const handleEditItem = (item: ItemSolicitud, index: number) => {
        setEditItem({item, index})  
    }

    const handleSetEditItem = (value: {item: ItemSolicitud, index: number}) => {
        const newArray = items
        newArray[value.index] = value.item
        console.log("newArray", newArray);
        
        setItems(() => {
            return [...newArray]
        })
    }

    // useEffect(() => {
    //     console.log("values", values);
    // },[values])
    
    return (
        <Layout>
            <Card>
                <CardHeader title={'Nueva Solicitud de compra'}/>
                <Divider />
                <CardContent>
                <Stack component="form" noValidate spacing={3}>
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
                                        // color="warning"
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
                                        id="date" 
                                        label="Fecha de ingreso"
                                        name="fecha_ingresos"
                                        type="date"
                                        variant="standard" 
                                        disabled
                                        value={values.fecha_ingreso}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid lg={4} md={4} sm={12} xs={12} item>
                                    <TextField 
                                        sx={{
                                            width: '100%',
                                            paddingRight:2
                                        }}
                                        id="standard-basic" 
                                        label="Área" 
                                        variant="standard" 
                                        name='area'
                                        value={values.area}
                                        onChange={handleChange}
                                    />     
                                </Grid>
                                <Grid lg={4} md={4} sm={12} xs={12} item>
                                    <TextField 
                                    sx={{
                                        width: '100%'
                                    }}
                                    id="standard-basic" 
                                    name='unidad'
                                    label="Unidad" 
                                    variant="standard" 
                                    value={values.unidad}
                                    onChange={handleChange}/>
                                
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid lg={6} md={6} sm={6} xs={12} item>
                            <Grid container spacing={2} sx={{display:'flex', justifyContent:'end'}}>
                                <Grid lg={6} md={6} sm={6} xs={12} item>
                                    <Box sx={{padding: .5, marginBottom: 1, border: .5}}>
                                        <Typography fontSize={12} variant='h4'>Compra agil menor a 10 utm</Typography>
                                    </Box>
                                    <Card sx={{padding: .5, maxHeight: 150, border: .5, overflowY: 'scroll'}}>
                                        <CardContent>
                                            <Typography fontSize={16} >Requisitos a considerar</Typography>
                                            <Typography fontSize={12}> - Debe adjuntar programa Municipal</Typography>
                                            <Typography fontSize={12}> - Debe adjuntar Subprograma Municipal</Typography>
                                            <Typography fontSize={12}> - Debe adjuntar mínimo 3 cotizaciones</Typography>
                            
                                        </CardContent>
                                    </Card>
                                    <Typography
                                         variant='h6'
                                         sx={{marginTop: 3}}
                                    >
                                        Valor UTM del día: $ 63.326
                                    </Typography>
                                </Grid>
                            </Grid>  
                        </Grid>         
                    </Grid>
                    {/* row */}
                    <AddItem addItems={handleAddItem} editItem={editItem} handleSetEditItem={handleSetEditItem}/>  
                    {/* table*/}
                    <TableDefault header={headerSolicitud} items={items} handleRemoveItem={handleRemoveItem} handleEditItem={handleEditItem}/>

                    {/* calculate */}
                    <CalculateSolicitud items={items}/>
                </Stack>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default Solicitud
