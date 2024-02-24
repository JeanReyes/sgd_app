import React, { useRef } from 'react'
import { Box, Button, Typography, TextField } from '@mui/material';

interface Props {
    requisitos: string[]
}

export const AddFiles = ({requisitos}: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const file = event.target.files[0];
        if (file) {
          // Aquí puedes manejar el archivo cargado, por ejemplo, enviarlo al servidor
          console.log('Archivo cargado:', file);
        }
      };

    return (
    <Box className="hola" sx={{display: 'flex', flexDirection: 'column'}}>
            <table>
                <tbody>
                    {
                        requisitos.map((item, index) => (
                            <tr key={index}>
                                <td> <Typography key={index} fontSize={12}> - { item }</Typography></td>
                                <td>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        style={{ display: 'none' }}
                                        ref={fileInputRef}
                                        onChange={(event) => handleFileInputChange(event)}
                                    />
                                    <Button 
                                        variant="contained" color="primary" onClick={() => fileInputRef.current?.click()}
                                    >
                                        Cargar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        
    </Box>
    )
}
