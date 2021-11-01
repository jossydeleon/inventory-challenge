import React from "react";
import {
  TextField,
  Grid,
  Paper,
  LinearProgress,
  Container,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Logo } from "../components/logo/Logo";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootStore } from "../state/Store";
import { useAuth } from "../context/AuthContext";
import { ICredentials } from "../types";
import { PATTERN_EMAIL } from "../constants/validations";

const defaultValues = {
  email: "",
  password: "",
};

const useStyles = makeStyles({
  textLogo: {
    textAlign: "center",
    color: "black",
  },
});

const Login: React.FC = () => {
  //Style
  const classes = useStyles();
  //Redux
  const { isLoading } = useSelector((state: RootStore) => state.session);

  //Hook Auth
  const { login } = useAuth();

  //hook for validation
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: defaultValues,
  });

  /**
   * Handle submit when user tap button login
   * @param {*} e
   */
  const handleSubmitLogin = async (data: ICredentials) => {
    try {
      await login(data);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        toast.error(`Wrong user or password`);
      } else {
        toast.error("There was a problem trying to authenticate");
      }
    }
  };

  return (
    <div className="jdl-login-root">
      <Container
        className="jdl-login-container"
        style={{ padding: 10 }}
        maxWidth="xs"
      >
        {isLoading && <LinearProgress />}

        <Paper elevation={5} style={{ padding: 30 }}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h2 className={classes.textLogo}>Inventory Tracker System</h2>
                  <Logo width={180} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Email"
                    fullWidth
                    error={errors.email ? true : false}
                    helperText={errors.email && errors.email.message}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is mandatory",
                      },
                      pattern: {
                        value: PATTERN_EMAIL,
                        message: "Email is invalid",
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="password"
                    placeholder="Password"
                    fullWidth
                    error={errors.password ? true : false}
                    helperText={errors.password && errors.password.message}
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is mandatory",
                      },
                    })}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
                onClick={handleSubmit(handleSubmitLogin)}
              >
                Sign in
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};
export default Login;
