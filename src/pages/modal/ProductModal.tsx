import React, { useEffect, useState } from "react";
import ToolbarModal from "../../components/ToolbarModal";
import FormContainer from "../../components/FormContainer";
import { Edit, Save } from "@material-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { IProduct } from "../../types";
import { useDispatch } from "react-redux";
import { SmartButtons } from "../../components/SmartButton";
import NumberFormat from "react-number-format";
import { PATTERN_ALPHA, PATTERN_NUMBERS } from "../../constants/validations";
import {
  actionAddProduct,
  actionEditProduct,
} from "../../state/actions/DatabaseActions";

import {
  TextField,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
} from "@material-ui/core";
import styled from "styled-components";

interface ModalProps {
  open: boolean;
  onClose: () => any;
  onCallback: (hasError: boolean, message: string) => any;
  data?: IProduct | undefined | null;
}

const useStyles = makeStyles(() => ({
  rootDialog: {
    borderRadius: 13,
  },
}));

const PictureContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const Picture = styled.img`
  width: 250px;
  object-fit: contain;
`;

const ProductModal: React.FC<ModalProps> = ({
  open,
  onClose,
  onCallback,
  data,
}) => {
  //Hook style
  const classes = useStyles();
  //hook for validation
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IProduct>({
    mode: "onBlur",
  });

  //State to know when edit or save product
  const [isEditable, setIsEditable] = useState(false);
  //State to enable/disable form
  const [formDisabled, setFormDisabled] = useState(false);

  //Redux
  const dispatch = useDispatch();

  /**
   * Effect to check if data has been received from props
   * and populate form
   */
  useEffect(() => {
    if (data) {
      setFormDisabled(true);
      setIsEditable(true);
      //Populate form with data
      reset(data);
    }
  }, [data]);

  /**
   * Send product to the server to be created
   */
  const submitProduct = async (data: IProduct) => {
    let hasError = false;
    let message = "Product was saved successfully";
    setFormDisabled(true);

    try {
      if (isEditable) {
        dispatch(actionEditProduct(data));
      } else {
        dispatch(actionAddProduct({ ...data, trackeable: false }));
      }
    } catch (error) {
      hasError = true;
      message = "There was an error trying to add the product";
      setFormDisabled(false);
    } finally {
      onCallback(hasError, message);
      if (!hasError) {
        onClose();
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.rootDialog }}
    >
      <ToolbarModal
        title={"Create Product"}
        progress={false}
        onClose={onClose}
        rigthComponent={
          <SmartButtons
            buttons={[<Edit />, <Save />]}
            actions={[
              () => setFormDisabled(false),
              handleSubmit(submitProduct),
            ]}
            condition={!!data && formDisabled}
          />
        }
      />

      <DialogContent>
        <div
          style={{
            padding: "10px",
          }}
        >
          <FormContainer>
            <form>
              <Grid container spacing={2}>
                {data?.picture && (
                  <PictureContainer>
                    <Picture src={data.picture} alt={data.name} />
                  </PictureContainer>
                )}
                <Grid item xs={12} sm={12} lg={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    id="name"
                    label="Name"
                    placeholder="Name"
                    autoCapitalize="sentence"
                    error={errors.name ? true : false}
                    helperText={errors.name && errors.name.message}
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is mandatory",
                      },
                      pattern: {
                        value: PATTERN_ALPHA,
                        message: "Only alphanumeric characteres",
                      },
                      maxLength: {
                        value: 30,
                        message: "You have exceeded the character limit",
                      },
                    })}
                    disabled={formDisabled}
                  />
                </Grid>

                <Grid item xs={12} sm={12} lg={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    id="category"
                    label="Category"
                    placeholder="Category"
                    autoCapitalize="sentence"
                    error={errors.category ? true : false}
                    helperText={errors.category && errors.category.message}
                    {...register("category", {
                      required: {
                        value: true,
                        message: "Category is mandatory",
                      },
                      pattern: {
                        value: PATTERN_ALPHA,
                        message: "Only alphanumeric characteres",
                      },
                      maxLength: {
                        value: 30,
                        message: "You have exceeded the character limit",
                      },
                    })}
                    disabled={formDisabled}
                  />
                </Grid>

                <Grid item xs={12} sm={12} lg={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    id="email"
                    label="SKU"
                    placeholder="SKU"
                    error={errors.sku ? true : false}
                    helperText={errors.sku && errors.sku.message}
                    {...register("sku", {
                      required: {
                        value: true,
                        message: "SKU is mandatory",
                      },
                    })}
                    disabled={formDisabled}
                  />
                </Grid>

                <Grid item xs={12} sm={6} lg={6}>
                  <Controller
                    name={"stock"}
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Stock is required",
                      },
                      pattern: {
                        value: PATTERN_NUMBERS,
                        message: "Only digits are allow",
                      },
                    }}
                    render={({ field: { value } }) => (
                      <NumberFormat
                        id="stock"
                        variant="outlined"
                        // @ts-ignore
                        size="small"
                        label="Current Stock"
                        placeholder="Current Stock"
                        value={value}
                        allowNegative={false}
                        decimalScale={0}
                        customInput={TextField}
                        onValueChange={(values) => {
                          const { floatValue } = values;
                          if (floatValue) {
                            setValue("stock", floatValue);
                          } else {
                            setValue("stock", 0);
                          }
                        }}
                        disabled={formDisabled}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} lg={6}>
                  <Controller
                    name="price"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Price is required",
                      },
                    }}
                    render={({ field: { value } }) => (
                      <NumberFormat
                        id="price"
                        variant="outlined"
                        // @ts-ignore
                        size="small"
                        label="Price"
                        placeholder="Price"
                        value={value}
                        allowNegative={false}
                        decimalScale={2}
                        isNumericString
                        prefix="$"
                        customInput={TextField}
                        onValueChange={(values) => {
                          const { floatValue } = values;
                          if (floatValue) {
                            setValue("price", floatValue);
                          } else {
                            setValue("price", 0);
                          }
                        }}
                        disabled={formDisabled}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} lg={12}>
                  <TextField
                    variant="outlined"
                    multiline
                    size="small"
                    id="picture"
                    label="Picture"
                    placeholder="Link Picture"
                    error={errors.picture ? true : false}
                    helperText={errors.picture && errors.picture.message}
                    {...register("picture")}
                    disabled={formDisabled}
                  />
                </Grid>
              </Grid>
            </form>
          </FormContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
