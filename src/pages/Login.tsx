import { Box, Button, Container, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useUtils } from "../hooks/useUtils";

type Inputs = {
  email: string,
  password: string,
};


const Login = () => {
  const {showToast} = useUtils()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    signIn(data);
  };

  const signIn = (data: Inputs) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        showToast(`ログインに成功しました。${userCredential.user.email}`,"success")
        navigate("/dashboard");
      }).catch((error) => {
        showToast(`ログインに失敗しました。`,"success")
        console.log(error);
      });
  };

  return (
    <Flex justify="center" align="center" minH="100vh">
      <Container p={6} maxW={350} bg="white" rounded="md" boxShadow="md">
        <form onSubmit={handleSubmit(onSubmit)}>

          <Stack spacing={6}>
            <Box fontSize="2xl" textAlign="center">login</Box>
            <Box>
              <Text >email</Text>
              <Input mt={1} type="email" placeholder="email"
                {...register('email', { required: true })} />
              {errors.email && <Box color="red.400">emailを入力してください。</Box>}
            </Box>
            <Box>
              <Text >password</Text>
              <Input mt={1} type="password" placeholder="password"
                {...register('password', { required: true })} />
              {errors.password && <Box color="red.400">passwordを入力してくださ。</Box>}
            </Box>
            <Button type="submit" colorScheme="yellow" color="white">ログイン</Button>
          </Stack>
        </form>
      </Container>
    </Flex>


  );
};

export default Login;