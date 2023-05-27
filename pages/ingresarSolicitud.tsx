import React, { useEffect, useState } from 'react'
import { Layout } from '../components/layouts'
import { Grid, Divider, Card, CardHeader, CardContent, TextField, Button, useTheme, useMediaQuery } from '@mui/material';
import { TableDefault } from '../components/ui/Tables/Table';
import { ItemSolicitud } from '../interface/Sgd';
import { NewModal } from '../components/ui/newModal/Modal';

const headerSolicitud = ['N°','Cantidad', 'Unidad de Medida', 'Detalle o Descripción', 'Clasificación Presupuestaria', 'Precio Neto']


const Solicitud = () => {

    const theme = useTheme();
    const lgMd = useMediaQuery((theme) => (theme as any).breakpoints.up('md'));
    const initItem = {
        quantity: '',
        unidad_medida: '',
        detail: '',
        classification: '',
        precio: ''
    }

    const [items, setItems] = useState<ItemSolicitud[]>([]);
    const [item, setItem] = useState(initItem);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItem((prev)=> {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })  
    }
    const handleAddItem = () => {
        setItems((prev) => {
            return [
                ...prev,
                item
            ]
        })
        setItem(initItem)
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
                    <Grid sx={{width: '100%', paddingBottom: 4}} container>
                        <Grid lg={1} md={1} sm={12} xs={12} item>
                            <TextField 
                                sx={{ width: '100%', paddingRight:2 }}
                                id="standard-basic" label="Cantidad" variant="standard"
                                name='quantity'
                                value={item.quantity}
                                onChange={handleChange}/>
                                
                        </Grid>
                        <Grid lg={2} md={2} sm={12} xs={12} item>
                            <TextField 
                                sx={{width: '100%', paddingRight:2}}
                                id="standard-basic" label="Unidad de Medida" variant="standard" 
                                name='unidad_medida'
                                value={item.unidad_medida}
                                onChange={handleChange}/>     
                        </Grid>
                        <Grid lg={4} md={4} sm={12} xs={12} item>
                            <TextField 
                                sx={{ width: '100%', paddingRight:2 }}
                                id="standard-basic" label="Detalle o Descripción" variant="standard" 
                                name='detail'
                                value={item.detail}
                                onChange={handleChange}/>
                                
                        </Grid>
                        <Grid lg={3} md={3} sm={12} xs={12} item>
                            <TextField 
                                sx={{ width: '100%', paddingRight:2 }}
                                id="standard-basic" label="Clasificación Presupuestaria" variant="standard" 
                                name='classification'
                                value={item.classification}
                                onChange={handleChange}/>     
                        </Grid>
                        <Grid lg={1} md={1} sm={12} xs={12} item>
                            <TextField 
                                sx={{ width: '100%'}}
                                id="standard-basic" label="Precio Neto" variant="standard" 
                                name='precio'
                                value={item.precio}
                                onChange={handleChange}/>        
                        </Grid>
                        <Grid lg={1} md={1} sm={12} xs={12} item sx={{display:'flex', paddingLeft: lgMd ? 2 : 0}}>
                            <Button sx={{width:'100%', marginTop: lgMd ? 0 : 2}} variant="contained" onClick={handleAddItem}>Ingresar</Button>  
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
