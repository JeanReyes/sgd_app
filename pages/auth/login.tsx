import Head from "next/head";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { LoginLayout } from "../../components/layouts";
import { useAuth } from "../../hooks/useContext";
import { ConfigTheme } from "../../components/configTheme/ConfigTheme";
import { ModalBase, ModalBaseMethods } from "../../components/ui/modal/Modal";
import { useRef } from "react";
import { autenticate } from "../../utils/api-client";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const childRef = useRef<ModalBaseMethods>(null);

  const formik = useFormik({
    initialValues: {
      rut: "17629581",
      password: "contraseña",
      submit: null,
    },
    validationSchema: Yup.object({
      rut: Yup.string().max(255).required("Dni es requerido"),
      password: Yup.string().max(255).required("Password es requerido"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await autenticate<{
          rut: string;
          password: string;
        }>({
          rut: values.rut,
          password: values.password,
        });

        if (response.data.change_password) {
          childRef.current?.handleOpen();
          return;
        }

        signIn();
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: "Datos de acceso incorrectos" });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleRecoveryPass = () => {
    router.push("/auth/recuperar-contrasena/");
  };

  return (
    <>
      <Head>
        <title>Login SGD</title>
      </Head>
      <LoginLayout>
        <Box
          sx={{
            backgroundColor: "background.paper",
            flex: "1 1 auto",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: "100px",
              width: "100%",
            }}
          >
            <div>
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h4">Acceso</Typography>
                  <ConfigTheme
                    from="login"
                    sx={{ marginLeft: 2, padding: 1 }}
                  />
                </Box>
              </Stack>
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.rut && formik.errors.rut)}
                    fullWidth
                    helperText={formik.touched.rut && formik.errors.rut}
                    label="DNI"
                    name="rut"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.rut}
                  />
                  <TextField
                    error={
                      !!(formik.touched.password && formik.errors.password)
                    }
                    fullWidth
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
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
                  Continuar
                </Button>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleRecoveryPass}
                  // variant="contained"
                >
                  ¿Olvidaste tu contraseña ?
                </Button>
              </form>
            </div>
          </Box>
        </Box>
      </LoginLayout>
      <ModalBase ref={childRef}>
        <div>
          <h3>
            Cambiar Contraseña{" "}
            <Link href={"/auth/cambiar-contrasena"}>Aqui</Link>
          </h3>
        </div>
      </ModalBase>
    </>
  );
};

export default Login;
