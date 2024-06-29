import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth, setToken } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const checkAuth = async () => {
      // check if token exists
      if (token) {
        const authResponse = await fetch('/api/session', {
          headers: {
            token
          }
        });

        // on successful authentication
        if (authResponse.ok) {
          const {username} = await authResponse.json();
          dispatch(setUser({username}));
        }
      } 
      // on authentication fail
      else {
        toast.info("User not authenticated");
      }
    }

    checkAuth();
  }, [token]);

  return user;
};

export default useAuthSession;
