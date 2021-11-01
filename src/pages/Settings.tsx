import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { WindowToolbar } from "../components/WindowToolbar";
import { PATTERN_EMAIL } from "../constants/validations";
import { RootStore } from "../state/Store";
import { actionSetTrackerEmail } from "../state/actions/SettingsActions";
import toast from "react-hot-toast";
import {
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  card: {
    minWidth: 380,
    width: 480,
    borderRadius: 16,
    padding: 20,
  },
  content: {
    padding: "1rem 1.5rem 1.5rem",
  },
  description: {
    paddingBottom: 20,
  },
  button: {
    marginTop: 20,
  },
}));

const Settings: React.FC = () => {
  //Hook Styles
  const classes = useStyles();
  //hook for validation
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  //Redux
  const dispatch = useDispatch();
  const { email } = useSelector((state: RootStore) => state.settings);

  /**
   * Effect to set tracker email in textfield if exists
   */
  useEffect(() => {
    if (email) {
      reset({ email });
    }
  }, []);

  /**
   * Save email in localstorage
   */
  const handleSaveEmail = (data: { email: string }) => {
    dispatch(actionSetTrackerEmail(data.email));
    toast.success(`Email has been set successfully`);
  };

  return (
    <Container>
      {/** First Row */}
      <Grid container spacing={3} style={{ alignItems: "center" }}>
        <WindowToolbar title="Settings" />
      </Grid>

      {/** Second Row */}
      <Grid container spacing={3}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography className={classes.description}>
              This email account will be used to receive notifications about
              products that are subscribed to the out of stock list.
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              type="text"
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

            <Button
              color="primary"
              type="submit"
              variant="contained"
              className={classes.button}
              fullWidth
              onClick={handleSubmit(handleSaveEmail)}
            >
              Save
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default Settings;
