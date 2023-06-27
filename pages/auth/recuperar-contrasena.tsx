
import Head from 'next/head';
import{ useState } from 'react'
import { LoginLayout } from '../../components/layouts';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Contraseña = () => {
    const router = useRouter();
    const { signIn } = useAuth();
    const [method, setMethod] = useState('email');

    const formik = useFormik({
        initialValues: {
            email: 'nes@company.cl',
            submit: null
        },
        validationSchema: Yup.object({
        email: Yup
            .string()
            .email('Must be a valid email')
            .max(255)
            .required('Email es requerido')
        }),
        onSubmit: async (values, helpers) => {
        try {
            console.log("estamos cambiando contraseña");
            
            // await signIn(values.email, values.password);
            router.push('/auth/cambiar-contrasena/');
        } catch (err) {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: (err as any).message });
            helpers.setSubmitting(false);
        }
        }
    });
    return (
        <>
            <Head>
                <title>
                    Recuperar contraseña
                </title>
            </Head>
            <LoginLayout>
                < Box
                    sx={{
                    backgroundColor: 'background.paper',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 550,
                            px: 3,
                            py: '100px',
                            width: '100%'
                        }}
                    >
                    <div>
                        <Stack
                            spacing={1}
                            sx={{ mb: 3 }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography variant="h4">
                                    Restablecer contraseña 
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack
                            spacing={1}
                            sx={{ mb: 3 }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography>
                                Introduzca su correo electrónico para enviarle las instrucciones para restablecer su contraseña de manera segura.  
                                </Typography>
                            </Box>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={formik.handleSubmit}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    fullWidth
                                    helperText={formik.touched.email && formik.errors.email}
                                    label="Email Address"
                                    name="email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="email"
                                    value={formik.values.email}
                                />
                            </Stack>
                            {formik.errors.submit && (
                                <Typography
                                    color="error"
                                    sx={{ mt: 3 }}
                                    variant="body2"
                                >
                                    {formik.errors.submit}
                                </Typography>
                            )}
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                            >
                                Enviar
                            </Button>
                        </form>
                    </div>
                    </Box>
                </Box>
            </LoginLayout>
        </>
      );
}

export default Contraseña