import { useEffect } from "react";
import { UserInfo, onAuthStateChanged } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import Navbar from "../components/Navbar";
import { Box, Grid } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useStore } from "../../store";
import { collection, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { User } from "../../types";

const DashboardLayout = () => {
  const isSidebar = useStore((state) => state.isSidebar);
  const setSession = useStore((state) => state.setSession);
  const setUsers = useStore((state) => state.setUsers);
  const navigate = useNavigate();
  const templateColsbase = "1fr";
  const templateColsMd = isSidebar ? "300px 1fr" : "0 1fr";

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
        console.log(user);
        addUser(user);
      } else {
        console.log(user);
        navigate('/login');
      }
    });
  }, [navigate, setSession]);

  const addUser = async (user: UserInfo) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return;
    setDoc(docRef, {
      username: user.email,
      email: user.email,
      isAdmin: false,
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const usersRef = collection(db, "users");
      onSnapshot(usersRef, (snapshot) => (
        setUsers(
          snapshot.docs.map((doc) => (
            { ...doc.data(), id: doc.id } as User
          )))
      ));
    };
    getUsers();
  }, [setUsers]);



  return (
    <Grid
      // templateColumns="repeat(1,1fr)"
      gridTemplateColumns={{ base: templateColsbase, md: templateColsMd }}
      transition="0.5s"
    >
      <Sidebar />
      <Grid as="main" alignContent="start">
        <Navbar />
        <Box p={{ base: 6, md: 12 }} w="full" overflow="hidden">
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardLayout;