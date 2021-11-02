import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { WindowToolbar } from "../components/WindowToolbar";
import { PATTERN_EMAIL } from "../constants/validations";
import { RootStore } from "../state/Store";
import toast from "react-hot-toast";
import { sendEmailReport } from "../util/Helper";
import {
  Container,
  Grid,
  makeStyles,
  TextField,
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

const Debug: React.FC = () => {
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
  const handleSendEmail = async (data: { email: string }) => {
    try {
      await sendEmailReport(
        {
          id: "22232",
          name: "Strawberry",
          stock: 2,
          sku: "332dd",
          price: 20,
          category: "Fruit",
          trackeable: false,
        },
        data.email
      );
      toast.success(`Email has been sent successfully`);
    } catch (error) {
      toast.error(`Something happend: ` + error);
      console.log(error);
    }
  };

  return (
    <Container>
      {/** First Row */}
      <Grid container spacing={3} style={{ alignItems: "center" }}>
        <WindowToolbar title="Debug" />
      </Grid>

      {/** Second Row */}
      <Grid container spacing={3}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
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
              onClick={handleSubmit(handleSendEmail)}
            >
              Send Email
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default Debug;
