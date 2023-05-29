import React, { useState, useEffect } from 'react'
import { Layout } from '../components/layouts'
import { Grid, Divider, Card, CardHeader, CardContent, TextField, Button, useMediaQuery, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { TableDefault } from '../components/ui/Tables/Table';
import { ItemSolicitud } from '../interface/Sgd';
import { useFormik } from 'formik';
import * as Yup from 'yup';


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
    const [item, setItem] = useState(initItem);
    const [ disabledButton, setDisabledButton ] = useState(true)

    const { values, errors, touched, handleChange, handleBlur, resetForm } = useFormik({
        initialValues: initItem,
        validationSchema: Yup.object({
        quantity: Yup
            .number()
            .max(100)
            .required('campo requerido'),
        unidad_medida: Yup
            .string()
            .required('Unidad de medida requerido'),
        detail: Yup
            .string()
            .required('Detalle requerido'),
        classification: Yup
            .string()
            .required('Clasificación requerido'),
        precio: Yup
            .string()
            .required('Precio requerido'),
        }),
        onSubmit: async (values, helpers) => {
        try {
            console.log("estamos enviando form");
            
            // await signIn(values.email, values.password);
            // router.push('/');
        } catch (err) {
            // helpers.setStatus({ success: false });
            // helpers.setErrors({ submit: (err as any).message });
            // helpers.setSubmitting(false);
        }
        }
    });

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setItem((prev)=> {
    //         return {
    //             ...prev,
    //             [event.target.name]: event.target.value
    //         }
    //     })  
    // }
    const handleAddItem = () => {

        if(Object.keys(errors).length) {
            return;  
        } else {     
            setDisabledButton(true) 
            setItems((prev) => {
                return [
                    ...prev,
                    values
                ]
            })
            resetForm()
        } 
    }

    useEffect(() => {
        console.log("values", values);
        
        if(Object.keys(errors).length === 0 && Object.keys(touched).length !== 0) {
            setDisabledButton(false) 
        } else {
            setDisabledButton(true)
        }
        
    }, [errors])

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
                    <Grid sx={{display:'flex', width: '100%', paddingBottom: 4}} container>
                        <Grid lg={1} md={1} sm={12} xs={12} item>
                            <TextField 
                                sx={{ width: '100%', paddingRight:2 }}
                                id="standard-basic" label="Cantidad" variant="standard"
                                name='quantity'
                                value={values.quantity}
                                error={!!(touched.quantity && errors.quantity)}
                                helperText={touched.quantity && errors.quantity}
                                onBlur={handleBlur}
                                onChange={handleChange}/>
                                
                                
                        </Grid>
                        <Grid lg={2} md={2} sm={12} xs={12} item>
                            {/* <TextField 
                                sx={{width: '100%', paddingRight:2}}
                                id="standard-basic" label="Unidad de Medida" variant="standard" 
                                name='unidad_medida'
                                value={values.unidad_medida}
                                error={!!(touched.unidad_medida && errors.unidad_medida)}
                                helperText={touched.unidad_medida && errors.unidad_medida}
                                onBlur={handleBlur}
                                onChange={handleChange}/>     */}
                            <TextField
                                sx={{width: '100%', paddingRight:2, position: 'relative', bottom: 4 }}
                                id="standard-select-currency"
                                // id="standard-select-currency-native"
                                label="Unidad de Medida"
                                defaultValue={'kilo'}
                                select
                                variant="standard"
                                name='unidad_medida'
                                value={values.unidad_medida}
                                error={!!(touched.unidad_medida && errors.unidad_medida)}
                                helperText={touched.unidad_medida && errors.unidad_medida}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            >
                            
                                <MenuItem value={'kilo'}>kilo</MenuItem>
                                <MenuItem value={'kilo2'}>Kilo2</MenuItem>
                                <MenuItem value={'litro'}>Litro</MenuItem>
                                <MenuItem value={'litro2'}>Litro2</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid lg={4} md={4} sm={12} xs={12} item>
                            <TextField 
                                sx={{ width: '100%', paddingRight:2 }}
                                id="standard-basic" label="Detalle o Descripción" variant="standard" 
                                name='detail'
                                value={values.detail}
                                error={!!(touched.detail && errors.detail)}
                                helperText={touched.detail && errors.detail}
                                onBlur={handleBlur}
                                onChange={handleChange}/>
                                
                        </Grid>
                        <Grid lg={3} md={3} sm={12} xs={12} item>
                            <TextField 
                                sx={{ width: '100%', paddingRight:2 }}
                                id="standard-basic" label="Clasificación Presupuestaria" variant="standard" 
                                name='classification'
                                value={values.classification}
                                error={!!(touched.classification && errors.classification)}
                                helperText={touched.classification && errors.classification}
                                onBlur={handleBlur}
                                onChange={handleChange}/>     
                        </Grid>
                        <Grid lg={1} md={1} sm={12} xs={12} item>
                            <TextField 
                                sx={{ width: '100%'}}
                                id="standard-basic" label="Precio Neto" variant="standard" 
                                name='precio'
                                value={values.precio}
                                error={!!(touched.precio && errors.precio)}
                                helperText={touched.precio && errors.precio}
                                onBlur={handleBlur}
                                onChange={handleChange}/>        
                        </Grid>
                    <Grid lg={1} md={1} sm={12} xs={12} sx={{ paddingLeft: lgMd ? 2 : 0}}>
                        <Button sx={{width:'100%', m:0, marginTop: lgMd ? 0 : 2}} disabled={disabledButton} variant="contained" onClick={handleAddItem}>Ingresar</Button>  
                    </Grid>
                    </Grid>    
                    {/* table*/}
                    <TableDefault header={headerSolicitud} items={items} initItem={initItem}/>
                </CardContent>
            </Card>
        </Layout>
    )
}

export default Solicitud
