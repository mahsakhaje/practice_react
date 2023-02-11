import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import "../index.css";

const schema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required().min(4),
});

export default function Login() {
  let navigate = useNavigate();

  function handleRegister() {
    navigate("/play");
  }

  return (
    <div className="p-6  m-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg  items-center space-x-4 flex flex-col space-y-4">
      <Formik
        validationSchema={schema}
        initialValues={{ username: "", password: "" }}
        onSubmit={(data) => {
          localStorage.setItem("userInfo", JSON.stringify(data));
          handleRegister();
        }}
      >
        {({ getFieldProps, touched, errors }) => (
          <Form className="items-center justify-center space-y-2">
            <p className="text-xl font-medium text-red">login</p>
            <p>username</p>
            <TextField
              id="outlined-basic"
              label="username"
              variant="outlined"
              {...getFieldProps("username")}
              error={Boolean(touched.username && errors.username)}
              helperText={errors.username}
              sx={{m:2}}
            />
            <p>password</p>
            <TextField
              id="outlined-basic"
              label="password"
              variant="outlined"
              type="password"
              sx={{m:2}}

              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={errors.password}
            />
            <p></p>
            <Button type="submit" variant="contained">
              confirm
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
