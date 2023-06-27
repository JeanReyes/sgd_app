import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { LoginLayout } from '../../components/layouts';
import { useAuth } from '../../hooks/useContext';
import { ConfigTheme } from '../../components/configTheme/ConfigTheme';
import Link from 'next/link';

const CambiarContraseña = () => {
    const router = useRouter();
    const { signIn } = useAuth();
    const [method, setMethod] = useState('email');

    const formik = useFormik({
        initialValues: {
            password: 'nes@company.cl',
            password2: 'Password123!',
            submit: null
        },
        validationSchema: Yup.object({
        password: Yup
            .string()
            .email('Must be a valid email')
            .max(255)
            .required('Email es requerido'),
        password2: Yup
            .string()
            .max(255)
            .required('Password es requerido')
        }),
        onSubmit: async (values, helpers) => {
        try {
            console.log("estamos logueando");
            
            // await signIn(values.email, values.password);
            // router.push('/');
        } catch (err) {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: 'Datos de acceso incorrectos' });
            helpers.setSubmitting(false);
        }
        }
    });

    const handleRecoveryPass = () => {
        router.push('/auth/recuperar-contrasena/')
    }

  return (
    <>
        <Head>
            <title>
                Cambiar contraseña
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
                                Cambiar Contraseña
                            </Typography>
                        </Box>
                    </Stack>
                    <form
                        noValidate
                        onSubmit={formik.handleSubmit}
                    >
                        <Stack spacing={3}>
                            <TextField
                                error={!!(formik.touched.password && formik.errors.password)}
                                fullWidth
                                helperText={formik.touched.password && formik.errors.password}
                                label="Introduzca su nueva contraseña"
                                name="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.password}
                            />
                            <TextField
                                error={!!(formik.touched.password2 && formik.errors.password2)}
                                fullWidth
                                helperText={formik.touched.password2 && formik.errors.password2}
                                label="Repita su nueva contraseña"
                                name="password2"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.password2}
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
                            Cambiar Contraseña
                        </Button>
                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <Link href={'/auth/login/'}>Inicia sesión</Link>
                            <Typography
                                // color="error"
                                sx={{ mt: 3, ml: 1 }}
                                variant="body2"
                            >
                                con tu nueva contraseña
                            </Typography>
                        </Box>
                    </form>
                </div>
                </Box>
            </Box>
        </LoginLayout>
    </>
  );
};

export default CambiarContraseña;
