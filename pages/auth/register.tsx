import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoginLayout } from "../../components/layouts";
import { register } from "../../utils/api-client";
import { IRegister } from "../../interface/Auth";
import { ModalBase, ModalBaseMethods } from "../../components/ui/modal/Modal";
import { useRef } from "react";

const Page = () => {
  const childRef = useRef<ModalBaseMethods>(null);
  const formik = useFormik({
    initialValues: {
      correo: "",
      nombres: "",
      apellidos: "",
      dni: "",
      role: "ADMIN",
      submit: null,
    },
    validationSchema: Yup.object({
      correo: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      nombres: Yup.string().max(255).required("Nombres son requeridos"),
      apellidos: Yup.string().max(255).required("Apellidos son requeridos"),
      dni: Yup.string().max(255).required("Dni es requerido"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await register<IRegister>({
          nombres: values.nombres,
          apellidos: values.apellidos,
          correo: values.correo,
          dni: values.dni,
          role: values.role,
        });

        if (!response.status.hasError) {
          childRef.current?.handleOpen();
        }
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Registro de Usuario</title>
      </Head>
      <LoginLayout>
        <Box
          sx={{
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
                <Typography variant="h4">Register SGD</Typography>
                <Typography color="text.secondary" variant="body2">
                  ¿Ya tienes una cuenta? &nbsp;
                  <Link
                    component={NextLink}
                    href="/auth/login"
                    underline="hover"
                    variant="subtitle2"
                  >
                    Login SGD
                  </Link>
                </Typography>
              </Stack>
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.nombres && formik.errors.nombres)}
                    fullWidth
                    helperText={formik.touched.nombres && formik.errors.nombres}
                    label="Nombres"
                    name="nombres"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.nombres}
                  />
                  <TextField
                    error={
                      !!(formik.touched.apellidos && formik.errors.apellidos)
                    }
                    fullWidth
                    helperText={
                      formik.touched.apellidos && formik.errors.apellidos
                    }
                    label="Apellidos"
                    name="apellidos"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.apellidos}
                  />
                  <TextField
                    error={!!(formik.touched.correo && formik.errors.correo)}
                    fullWidth
                    helperText={formik.touched.correo && formik.errors.correo}
                    label="Correo"
                    name="correo"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.correo}
                  />
                  <TextField
                    error={!!(formik.touched.dni && formik.errors.dni)}
                    fullWidth
                    helperText={formik.touched.dni && formik.errors.dni}
                    label="DNI"
                    name="dni"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.dni}
                  />
                  <TextField
                    sx={{ width: "100%", position: "relative", bottom: 4 }}
                    id="standard-select-currency"
                    label="ROL"
                    defaultValue={"ADMIN"}
                    select
                    name="rol"
                    value={formik.values.role}
                    error={!!(formik.values.role && formik.errors.role)}
                    helperText={formik.values.role && formik.errors.role}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                    <MenuItem value={"MANAGER"}>MANAGER</MenuItem>
                  </TextField>
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
                  Continue
                </Button>
              </form>
            </div>
          </Box>
        </Box>
      </LoginLayout>
      <ModalBase ref={childRef}>
        <div>
          <h3>Usuario Registrado con éxito </h3>
        </div>
      </ModalBase>
    </>
  );
};

export default Page;
