import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
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
// import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Login = () => {
    const router = useRouter();
    const { signIn } = useAuth();
    const [method, setMethod] = useState('email');

    const formik = useFormik({
        initialValues: {
            email: 'SGD.jereyes@NES.cl',
            password: 'Password123!',
            submit: null
        },
        validationSchema: Yup.object({
        email: Yup
            .string()
            .email('Must be a valid email')
            .max(255)
            .required('Email es requerido'),
        password: Yup
            .string()
            .max(255)
            .required('Password es requerido')
        }),
        onSubmit: async (values, helpers) => {
        try {
            console.log("estamos logueando");
            
            await signIn(values.email, values.password);
            router.push('/');
        } catch (err) {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: (err as any).message });
            helpers.setSubmitting(false);
        }
        }
    });

    const handleMethodChange = useCallback((event: any, value: any) => {
            setMethod(value);
        },[]
    );

//   const handleSkip = useCallback(
//     () => {
//       auth.skip();
//       router.push('/');
//     },
//     [auth, router]
//   );

  return (
    <>
        <Head>
            <title>
            Login SGD
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
                                Acceso
                            </Typography>
                            <ConfigTheme from='login' sx={{marginLeft: 2, padding: 1}}/>
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
                            <TextField
                                error={!!(formik.touched.password && formik.errors.password)}
                                fullWidth
                                helperText={formik.touched.password && formik.errors.password}
                                label="Password"
                                name="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.password}
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
                            Continue
                        </Button>
                    </form>
                </div>
                </Box>
            </Box>
        </LoginLayout>
    </>
  );
};

export default Login;
