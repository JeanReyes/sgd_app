import { Inter } from '@next/font/google'
import { Layout } from '../components/layouts'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth/AuthContext';
import { Button, Card, CardContent, FormControl, FormLabel, Grid, Paper, Typography } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    // defimos el layout de la app
    return (
        <Layout> 
              <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>
                            <Typography variant='h3'>Bienvenido a SGD </Typography>
                        </FormLabel>
                        <Grid>
                            <Typography> 
                                Elija una opción:
                            </Typography>

                            <Button variant="contained" >Contained</Button>
                            <Button variant="text">Crear documento</Button>
                            <Button variant="outlined">Outlined</Button>    
                        </Grid>
                    </FormControl>
                </CardContent>
            </Card>
        </Layout>
    )
}
