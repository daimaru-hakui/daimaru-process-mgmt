import { Flex, Spinner } from '@chakra-ui/react';
import ReactDom from "react-dom";
import { useStore } from '../store';

const Loading = () => {
  const loading = useStore((state) => state.loading);
  return loading && (ReactDom.createPortal(<Flex w="full" h="100vh" justify="center" align="center" position="fixed" top={0} left={0} zIndex={10000}>
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='yellow.400'
      size='xl'
    />
  </Flex >, document.getElementById('loading')!));
};

export default Loading;