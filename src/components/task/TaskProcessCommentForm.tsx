import { FC, useState } from 'react';
import { Box, Button, Flex, Input, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase';
import { useStore } from '../../../store';
import { PROCESS_LIST } from '../../utils/constants';
import { useUtils } from '../../hooks/useUtils';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

type Props = {
  onClose: () => void;
  defaultValues: Inputs;
  pageType: "NEW" | "EDIT";
};

type Inputs = {
  id: string,
  taskId: string,
  processName: string,
  content: string;
  images: {
    url: string;
    path: string;
  }[];
};

const TaskProcessCommentForm: FC<Props> = ({ onClose, defaultValues, pageType }) => {
  const currentUser = useStore((state) => state.session);
  const setLoading = useStore((state) => state.setLoading);
  const [fileUpload, setFileUpload] = useState<FileList | File[]>([]);
  const { showToast } = useUtils();

  const handleFileChange = (e: any) => {
    if (!e.target.files) return;
    setFileUpload((prev) => [...prev, ...e.target.files]);
  };

  const deletePreview = (idx: number) => {
    if (!fileUpload) return;
    const newArray = Array.from(fileUpload).filter((_, index) => (
      index !== idx
    ));
    setFileUpload(newArray);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    switch (pageType) {
      case "NEW":
        await addProcessComment(data);
        break;
      case "EDIT":
        await updateProcessComment(data);
        break;
    }
    onClose();
  };

  const addImages = async (fileUpload: FileList | File[]) => {
    if (fileUpload.length === 0) return [];
    const imageArray = [];
    for (const file of fileUpload) {
      imageArray.push(await uploadImage(file));
    }
    return imageArray;
  };

  const uploadImage = async (file: File) => {
    const datetime = new Date().getTime();
    const imageRef = ref(storage, `comments/${datetime}_${file.name}`);
    await uploadBytes(imageRef, file);
    return {
      url: await getDownloadURL(imageRef),
      path: imageRef.fullPath
    };
  };

  const addProcessComment = async (data: Inputs) => {
    const result = confirm("登録して宜しいでしょうか");
    if (!result) return;
    setLoading(true);
    const images = await addImages(fileUpload);
    try {
      const docRef = collection(db, "tasks", data.taskId, data.processName);
      await addDoc(docRef, {
        processName: data.processName,
        content: data.content,
        createUser: currentUser?.uid,
        createdAt: serverTimestamp(),
        images: images
      });
      showToast("コメントを投稿しました", "success");
    } catch (error) {
      console.log("addProcessComment", error);
      showToast("コメントの投稿に失敗しました", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateProcessComment = async (data: Inputs) => {
    const result = confirm("更新して宜しいでしょうか");
    if (!result) return;
    setLoading(true);
    const images = await addImages(fileUpload);
    try {
      const docRef = doc(db, "tasks", data.taskId, data.processName, data.id);
      await updateDoc(docRef, {
        content: data.content,
        createUser: currentUser?.uid,
        updatedAt: serverTimestamp(),
        images: [...defaultValues.images, ...images]
      });
      showToast("コメントを更新しました", "success");
    } catch (error) {
      console.log("addProcessComment", error);
      showToast("コメントの編集に失敗しました", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        {pageType === "NEW" && (
          <Box>
            <Text>工程を選択</Text>
            <Select
              mt={1}
              placeholder='工程を選択してください'
              {...register("processName", { required: true })}
              defaultValue={defaultValues.processName}
            >
              {PROCESS_LIST.map((process) => (
                <option key={process.name} value={process.name}>{process.title}</option>
              ))}
            </Select>
            {errors.processName && (
              <Box color="red.400">工程を選択してください</Box>
            )}
          </Box>
        )}
        <Box>
          <Text>内容</Text>
          <Textarea mt={1} {...register("content", { required: true })} />
          <Box>
            {errors.content && (
              <Box color="red.400">内容を入力してください。</Box>
            )}
          </Box>
        </Box>
        {fileUpload && (
          Array.from(fileUpload).map((file: File, idx: number) => (
            <Box key={idx} position="relative">
              <Box position="absolute" top={-2} right={-2} onClick={() => deletePreview(idx)}>
                <AiFillCloseCircle fontSize={24} />
              </Box>
              <img src={URL.createObjectURL(file)} />
            </Box>
          ))
        )}
        <Box>
          <Text>画像</Text>
          <Box mt={1} w="full" h={24} >
            <Box as="label" htmlFor='file' cursor='pointer'>
              <Flex justify="center" align="center" w='full' h={24} border="3px dotted #e5e5e5">
                <AiOutlineCloudUpload fontSize={56} color="gray" />
              </Flex>
            </Box>
          </Box>
          <Input id="file" type="file" multiple mt={1} onChange={handleFileChange} display="none" />
        </Box>
        <Button
          type="submit"
          colorScheme='yellow'
          color='white'
        >
          {pageType === "NEW" ? "登録" : "更新"}
        </Button>
      </Stack>
    </form>
  );
};

export default TaskProcessCommentForm;