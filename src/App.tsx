import React from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { theme } from "./theme/theme-style";
import { Toaster } from "react-hot-toast";
import { Navigator } from "./router/Navigator";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import Store, { persistor } from "./state/Store";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ReduxProvider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Toaster position="top-right" reverseOrder={false} />
            <Navigator />
          </MuiThemeProvider>
        </AuthProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
