/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import { Layout } from '../../components/layouts'
import { Grid, Divider, Card, CardHeader, CardContent, TextField, Stack, useMediaQuery, MenuItem, Typography, Box, Button } from '@mui/material';
import { TableDefault } from '../../components/ui/Tables/Table';
import { ItemSolicitud } from '../../interface/Sgd';
import { AddItem } from '../../components/solicitud/add/addItem/AddItem';
import { CalculateSolicitud } from '../../components/solicitud/add/calculateSolicitud/CalculateSolicitud';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formatPrice } from '../../utils/methods';
import { ModalBase, ModalBaseMethods } from '../../components/ui/modal/Modal';
import { BaseDrawer, DrawerBaseMethods } from '../../components/ui/drawer/BaseDrawer';
import { AddFiles } from '../../components/ui/drawer/components/AddFiles';

/**
 * la solicitud va a pasar por 3 estados, add-field, add-files, listo
 */

export type Step = 'add-field' | 'add-files'

export interface Calculate {
    neto: number;
    iva: number;
    bruto: number;
}

interface IReglasSolicitud {
    type: string,
    rules: {
        min: number;
        max: number;
    }
    requisitos: string []
}

const headerSolicitud = ['N°','Cantidad', 'Unidad de Medida', 'Detalle o Descripción', 'Clasificación Presupuestaria', 'Precio Unitario', 'Subtotal', '']

const TypeSolicitud1 = {
    type: 'Compra agil menor a 10 utm',
    rules: {
        min: 0,
        max: 10
    },
    requisitos: [
        'Debe adjuntar programa Municipal 1',
        'Debe adjuntar Subprograma Municipal 1'
    ]
}
const TypeSolicitud2 = {
    type: 'Compra ágil mayor a 10 utm y menor a 20 utm',
    rules: {
        min: 10,
        max: 20
    },
    requisitos: [
        'Debe adjuntar programa Municipal 2',
        'Debe adjuntar Subprograma Municipal 2',
        'Debe adjuntar mínimo 3 cotizaciones 2',
        'Debe adjuntar mínimo 3 cotizaciones 2'
    ]
}
const TypeSolicitud3 = {
    type: 'compra ágil mayor a 20 utm y menor a 30 utm',
    rules: {
        min: 20,
        max: 30
    },
    requisitos: [
        'Debe adjuntar programa Municipal 3',
        'Debe adjuntar Subprograma Municipal 3',
        'Debe adjuntar mínimo 3 cotizaciones 3',
        'Debe adjuntar programa Municipal 3',
        'Debe adjuntar Subprograma Municipal 3',
        'Debe adjuntar mínimo 3 cotizaciones 3'
    ]
}

const TypesSolicitud: IReglasSolicitud [] = [
    TypeSolicitud1,
    TypeSolicitud2,
    TypeSolicitud3
]

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
    const [totalCalculate, setTotalCalculate] = useState<Calculate>({} as Calculate)
    const [utm, setUtm] = useState(63326);
    const [clasification, setClasification] = useState(TypesSolicitud[0] as IReglasSolicitud);
    const [step, setStep] = useState<Step>('add-field');
    const childRef = useRef<ModalBaseMethods>(null);
    const refDrawer = useRef<DrawerBaseMethods>(null);
    const [borderStyle, setBorderStyle] = useState({
        border: '.5px solid', // Color y estilo original del borde
        boxShadow: 'none', // Sombra inicial
      });

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

    const isReadyFields = () => {
        if ((Object.keys(clasification).length > 0 && totalCalculate.bruto > 0)) return true;
        return false;
    }

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

    const handleEditItem = ({item, index}: {item: ItemSolicitud, index: number}) => {
        setEditItem({item, index})  
    }

    const handleSetTotalCalculate = (total: Calculate) => {
        setTotalCalculate(() => {
            return total
        })
    }

    const handleSetEditItem = (value: {item: ItemSolicitud, index: number}) => {
        const newItem = items
        newItem[value.index] = value.item
        setItems(() => {
            return [...newItem];
        })
    }

    const applicationClassification = () => {
        const { bruto } = totalCalculate;
        const calculation = (bruto / utm) > 0 ? (bruto / utm) : 0;
        
        if (calculation === 0) return;

        const objetoEnRango = TypesSolicitud.find((item: IReglasSolicitud) => {
            const min = item.rules.min
            const max = item.rules.max
            return calculation >= min && calculation <= max 
        });
        
        if (objetoEnRango) {
            setClasification(objetoEnRango as IReglasSolicitud)
        } else {
            setClasification( {} as IReglasSolicitud) // retorno la primera siempre
        }
    }

    const changeBorderStyle = () => {
        const { bruto } = totalCalculate;
        if (!bruto) return

        if (totalCalculate) {
            setBorderStyle({
                border: '.5px solid #28a745', // Color verde para el borde (éxito)
                boxShadow: '0 0 10px rgba(40, 167, 69, 0.5)', // Sombra verde
            });
            setTimeout(() => {
              setBorderStyle({
                border: '.5px solid', // Volver al color original
                boxShadow: 'none', // Quitar la sombra
              });
            }, 1000); // Cambiar el tiempo a tu preferencia
        }
    }

    const handleModalFiled = () => {
        setStep('add-files')
        childRef.current?.handleOpen()
    }

    const handleOpenDrawer = () => {
        refDrawer.current?.handleSettings()
    }

    useEffect(() => {
        applicationClassification();
    },[totalCalculate])

    useEffect(() => {
        setEditItem({} as {item: ItemSolicitud, index: number})
    },[items])

    useEffect(() => {
        changeBorderStyle();
    }, [clasification])

    return (
        <Layout>
            <Card>
                <CardHeader title={'Nueva Solicitud de compra'}/>
                <Divider />
                <CardContent>
                <Stack component="form" noValidate spacing={3}>
                    {/* HEADER SOLICITUD */}
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
                                    <MenuItem value={'kilo'}>Compra ágil</MenuItem>
                                    <MenuItem value={'kilo2'}>Otro</MenuItem>
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
                                <Grid lg={8} md={10} sm={10} xs={12} item>
                                    <Typography
                                         variant='h6'
                                         sx={{marginBottom: 2}}
                                    >
                                        Valor UTM del día: $ {formatPrice(utm)}
                                    </Typography>
                                  {
                                    ( Object.keys(clasification).length > 0 )
                                    ? <>
                                        <Box sx={{...borderStyle}}>
                                            <Box sx={{padding: .5, marginBottom: 1}}>
                                                <Typography fontSize={14} variant='h4'> {clasification?.type} </Typography>
                                            </Box>
                                            <Card sx={{padding: .5, height: 120, overflowY: 'scroll'}}>
                                                <CardContent>
                                                    <Typography fontSize={14} >Requisitos a considerar</Typography>
                                                    {
                                                        clasification.requisitos?.map((item, index) => (
                                                            <Typography key={index} fontSize={12}> - { item }</Typography>
                                                        ))
                                                    }
                                                    {/* <Typography fontSize={12}> - Debe adjuntar Subprograma Municipal</Typography>
                                                    <Typography fontSize={12}> - Debe adjuntar mínimo 3 cotizaciones</Typography> */}
                                                </CardContent>
                                            </Card>

                                        </Box>
                                    </>
                                     : 'No clasifica para la compra seleccionada'
                                  }
                                </Grid>
                            </Grid>  
                        </Grid>         
                    </Grid>
                    {/* row */}
                    <AddItem addItems={handleAddItem} editItem={editItem} handleSetEditItem={handleSetEditItem}/>  
                    {/* table*/}
                    <TableDefault 
                        header={headerSolicitud} 
                        items={items} 
                        step={step} 
                        handleRemoveItem={handleRemoveItem} 
                        handleEditItem={handleEditItem}
                        isReadyFields={isReadyFields}
                    />

                    {/* calculate */}
                    <CalculateSolicitud 
                        items={items} 
                        step={step} 
                        totalCalculate={totalCalculate} 
                        handleSetTotalCalculate={handleSetTotalCalculate} 
                        handleOpenDrawer={handleOpenDrawer}
                        isReadyFields={isReadyFields}
                    />
                    <Button 
                        variant="contained"
                        disabled={!isReadyFields()}
                        onClick={() => handleModalFiled()}
                    >
                        Agregar Solicitud
                    </Button>
                </Stack>

                </CardContent>
                {/* MODAL ARCHIVOS */}
                <ModalBase ref={childRef}>
                    <Box sx={{textAlign: 'center'}}>
                        <p>Solicitud creada, ahora debe ingresar los documentos asociados</p>
                        <Button onClick={() => childRef.current?.handleClose()}>ok</Button>
                    </Box>
                </ModalBase>

                {/* AGREGAR ARCHIVOS */}
                <BaseDrawer ref={refDrawer} width='700' title={`Requisitos de solicitud`} anchor='right'>
                    <AddFiles requisitos={clasification.requisitos}/>
                </BaseDrawer>
            </Card>
        </Layout>
    )
}

export default Solicitud
