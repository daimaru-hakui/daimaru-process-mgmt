import { useEffect } from "react";
import { UserInfo, onAuthStateChanged } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import Navbar from "../components/Navbar";
import { Box, Grid } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useStore } from "../../store";
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { Coefficient, User } from "../../types";
import { Staff } from "../../types";
import Loading from "../Loading";

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
        addUser(user);
      } else {
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

  const setStaffs = useStore((state) => state.setStaffs);
  useEffect(() => {
    const getStaffs = async () => {
      const staffscol = collection(db, "staffs");
      const snapShot = await getDocs(staffscol);
      setStaffs(
        snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Staff))
      );
    };
    getStaffs();
  }, [setStaffs]);

  const setCoefficients = useStore((state) => state.setCoefficients);
  useEffect(() => {
    const getCoefficients = async () => {
      const coll = collection(db, "coefficients");
      const q = query(coll, orderBy("order", "desc"));
      const snapShot = await getDocs(q);
      setCoefficients(
        snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Coefficient))
      );
    };
    getCoefficients();
  }, [setCoefficients]);

  return (
    <>
      <Loading />
      <Grid
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
    </>
  );
};

export default DashboardLayout;