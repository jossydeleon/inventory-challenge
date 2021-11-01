import React from "react";
import { useDispatch } from "react-redux";
import { ICredentials, IUser } from "../types";
import firebaseApp from "../config/firebase";
import {
  actionSetUser,
  actionSetSigningInLoading,
} from "../state/actions/SessionActions";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";

export interface IAuthentication {
  login: any;
  logout: any;
  user: IUser | null;
}

const useAuthentication = () => {
  //Redux
  const dispatch = useDispatch();
  //Firebase Auth object
  const auth = getAuth(firebaseApp);
  //
  const [user, setUser] = React.useState<IUser | null>(null);

  /**
   * Effect to listen for firebase auth changes
   */
  React.useEffect(() => {
    const subscriber = onAuthStateChanged(auth, authStateChanged);
    // Cleanup subscription on unmount
    return () => {
      subscriber();
    };
  }, []);

  /**
   * Dispatch user to the redux store if authenticated
   * @returns
   */
  const authStateChanged = (): User | null => {
    const firebaseUser = auth?.currentUser;

    if (!firebaseUser) {
      dispatch(actionSetUser(null));
      dispatch(actionSetSigningInLoading(false));
      return null;
    }

    //Create custom User(Inventory-Tracker)
    const user: IUser = {
      id: `${firebaseUser.uid}`,
      name: `${firebaseUser.displayName}`,
      email: `${firebaseUser.email}`,
      picture: `${firebaseUser.photoURL}`,
    };

    //Dispatch to state
    setUser(user);
    dispatch(actionSetUser(user));
    dispatch(actionSetSigningInLoading(false));

    return firebaseUser;
  };

  /**
   * Sign in user
   * @param credentials object containing email and password
   */
  const login = async (credentials: ICredentials) => {
    try {
      const { email, password } = credentials;
      dispatch(actionSetSigningInLoading(true));
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error);
      console.log("Error signing in: " + error);
    } finally {
      dispatch(actionSetSigningInLoading(false));
    }
  };

  /**
   * Logout user from session
   */
  const logout = async () => {
    try {
      dispatch(actionSetSigningInLoading(true));
      await signOut(auth);
    } catch (error) {
      console.log("Error signing out: " + error);
    } finally {
      dispatch(actionSetSigningInLoading(false));
    }
  };

  return {
    login,
    logout,
    user,
  };
};

export default useAuthentication;
