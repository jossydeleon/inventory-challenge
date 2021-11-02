import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import { WindowToolbar } from "../components/WindowToolbar";
import { TableIcons } from "../components/util/TableIcons";
import { Add, DeleteOutline, VisibilityOutlined } from "@material-ui/icons";
import { AlertDialog, AlertStateProps } from "../components/AlertDialog";
import { IProduct } from "../types";
import toast from "react-hot-toast";
import ProductModal from "./modal/ProductModal";
import { convertToCurrency } from "../util/Helper";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../state/Store";
import {
  actionDeleteProduct,
  actionEditProduct,
} from "../state/actions/DatabaseActions";
import {
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  makeStyles,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  table: {
    "& .MuiPaper-root": {
      borderRadius: 14,
    },
  },
  bold: {
    fontWeight: "bold",
  },
  itemName: {
    color: "black",
  },
}));

const Products: React.FC = () => {
  //Hook Styles
  const classes = useStyles();

  //State to handle open/close Dialog
  const [openModalProduct, setOpenModalProduct] = useState(false);

  //State to handle dialog
  const [dialog, setDialog] = useState<AlertStateProps>({
    open: false,
    title: "",
    message: "",
  });

  //State to handle product selected
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  //Redux
  const dispatch = useDispatch();
  const { products, loadingProducts } = useSelector(
    (state: RootStore) => state.database
  );

  /**
   * Open modal event, with information or empty
   * @param {*} value
   */
  const handleOpenModalProduct = (product?: IProduct) => {
    if (product) {
      setSelectedProduct(product);
    }
    setOpenModalProduct(true);
  };

  /**
   * Close modal event and nullify object event
   */
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setOpenModalProduct(false);
  };

  /**
   * Display Snackbar
   * @param {*} hasError boolean to decide type of message
   * @param {*} message message to display
   */
  const displaySnackbar = (hasError: boolean, message: string) => {
    if (hasError) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  /**
   * Ask user if wants to delete event
   */
  const askDeleteProduct = (product: IProduct) => {
    setDialog({
      open: true,
      title: "Remove",
      message: `Are you sure you want to delete this item: ${product.name}?`,
      actions: {
        negative: {
          label: "No",
          action: () => setDialog({ ...dialog, open: false }),
        },
        positive: {
          label: "Yes, delete it",
          action: async () => {
            try {
              handleDeleteProduct(product);
              setDialog({ ...dialog, open: false });
            } catch (error) {
              console.log(error);
            }
          },
        },
      },
    });
  };

  /**
   * Handle change in product trackeable
   * @param event
   * @param product Product to update
   */
  const handleTrackeable = (
    event: React.ChangeEvent<HTMLInputElement>,
    product: IProduct
  ) => {
    dispatch(
      actionEditProduct({
        ...product,
        trackeable: !product.trackeable,
      })
    );
  };

  /**
   * Delete product from table
   * @param {*} product Product selected
   */
  const handleDeleteProduct = async (product: IProduct) => {
    if (product) {
      try {
        dispatch(actionDeleteProduct(product?.id + ""));
      } catch (error) {}
    }
  };

  /*
   * Callback to comunicate child with parent (Modal)
   */
  const onResponseCallback = (hasError: boolean, message: string) => {
    displaySnackbar(hasError, message);
  };

  //Header
  const Header = <WindowToolbar title="Products" />;

  //Table columns
  const columns = [
    {
      title: "Item",
      field: "name",
      render: (rowData: IProduct) => (
        <ListItem>
          <ListItemAvatar>
            <Avatar src={rowData.picture || ""} />
          </ListItemAvatar>

          <ListItemText primary={rowData.name} />
        </ListItem>
      ),
    },
    {
      title: "SKU",
      render: (rowData: IProduct) => {
        return (
          <ListItem>
            <ListItemText primary={rowData.sku} />
          </ListItem>
        );
      },
    },
    {
      title: "Category",
      field: "category",
      render: (rowData: IProduct) => {
        return (
          <ListItem>
            <ListItemText primary={rowData.category} />
          </ListItem>
        );
      },
    },
    {
      title: "Stock",
      render: (rowData: IProduct) => {
        return (
          <ListItem>
            <ListItemText primary={`${rowData.stock}`} />
          </ListItem>
        );
      },
    },
    {
      title: "Price",
      render: (rowData: IProduct) => {
        return (
          <ListItem>
            <ListItemText primary={`$${convertToCurrency(rowData.price)}`} />
          </ListItem>
        );
      },
    },
    {
      title: "Track?",
      render: (rowData: IProduct) => {
        return (
          <Switch
            color="primary"
            checked={rowData?.trackeable || false}
            onChange={(e) => handleTrackeable(e, rowData)}
            name="trackeable"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        );
      },
    },
  ];

  //Table Sms
  const TableProducts = (
    <div className={classes.table}>
      <MaterialTable
        title="Products"
        icons={TableIcons}
        columns={columns}
        data={products}
        //isLoading={loadingProducts}
        localization={{
          header: {
            actions: "Actions",
          },
          body: {
            emptyDataSourceMessage: "There are not products on inventory",
          },
        }}
        actions={[
          {
            icon: () => <Add />,
            tooltip: "Add Product",
            isFreeAction: true,
            onClick: () => handleOpenModalProduct(),
          },
          {
            icon: () => <VisibilityOutlined fontSize="small" />,
            tooltip: "View Product",
            onClick: (_, product) =>
              handleOpenModalProduct(product as IProduct),
          },
          {
            icon: () => <DeleteOutline fontSize="small" />,
            tooltip: "Delete Product",
            onClick: (_, product) => askDeleteProduct(product as IProduct),
          },
        ]}
        options={{
          pageSize: 10,
          search: true,
          searchFieldAlignment: "left",
          showTitle: false,
          actionsColumnIndex: -1,
          rowStyle: {
            backgroundColor: "#fff",
          },
          headerStyle: {
            backgroundColor: "#37474f",
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
          },
          toolbar: true,
        }}
      />
    </div>
  );

  return (
    <Container>
      {/** First Row */}
      <Grid container spacing={3} style={{ alignItems: "center" }}>
        {Header}
      </Grid>

      {/** Third Row */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12}>
          {TableProducts}
        </Grid>
      </Grid>

      {/** Dialog to create product */}
      {openModalProduct && selectedProduct && (
        <ProductModal
          open={openModalProduct}
          data={selectedProduct}
          onCallback={onResponseCallback}
          onClose={handleCloseModal}
        />
      )}

      <AlertDialog
        show={dialog.open}
        title={dialog.title}
        message={dialog.message}
        negativeButton={dialog?.actions?.negative}
        positiveButton={dialog?.actions?.positive}
        onCloseCallback={() => {
          setDialog({ ...dialog, open: false });
        }}
      />
    </Container>
  );
};

export default Products;
