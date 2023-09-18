import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { db, storage } from '../../../firebase';
import { Box, Flex } from '@chakra-ui/react';
import { AiOutlineDelete } from "react-icons/ai";
import { format } from 'date-fns';
import { useUtils } from '../../hooks/useUtils';
import { useStore } from '../../../store';
import TaskProcessCommentEdit from './TaskProcessCommentEdit';
import { deleteObject, ref } from 'firebase/storage';
import { Comment } from '../../../types';

type Props = {
  taskId: string;
  processName: string;
};

const TaskProcessCommentList: FC<Props> = ({ taskId, processName }) => {
  const session = useStore((state) => state.session);
  const [comments, setComments] = useState<Comment[]>([]);
  const { getUserName, showToast } = useUtils();

  useEffect(() => {
    const getProcessComment = async () => {
      const coll = collection(db, "tasks", taskId, processName);
      const q = query(coll, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        setComments(snapshot.docs.map((doc) => (
          { ...doc.data(), id: doc.id } as Comment
        )));
      });
    };
    getProcessComment();
  }, [taskId, processName]);

  const deleteComment = async (taskId: string, processName: string, comment: Comment) => {
    const result = confirm("削除して宜しいでしょうか");
    if (!result) return;

    try {
      const docRef = doc(db, "tasks", taskId, processName, comment.id);
      await deleteDoc(docRef);
      deleteImages(comment);
      showToast("コメントを削除しました", "success");
    } catch (error) {
      console.log("deleteComment", error);
      showToast("削除に失敗しました", "error");
    }
  };

  const deleteImages = (comment: Comment) => {
    const images = comment.images;
    images.forEach(async (image) => {
      const desertRef = ref(storage, image.path);
      await deleteObject(desertRef);
    });
  };

  const onClickImageUrlOpen = (url: string) => {
    window.open(url);
  };

  let title;
  switch (processName) {
    case "reception":
      title = "受付";
      break;
    case "pattern":
      title = "パターン";
      break;
    case "cutting":
      title = "裁断";
      break;
    case "materials":
      title = "資材準備";
      break;
    case "sewing":
      title = "縫製加工";
      break;
    case "finishing":
      title = "仕上げ";
      break;
    case "warehouse":
      title = "倉庫入荷";
  }

  if (comments.length === 0) return;

  return (
    <Box mt={6}>
      <Box fontWeight="bold">{title}</Box>
      {comments.map((comment) => {
        const { id, content, createUser, createdAt } = comment;
        return (
          <Box key={id} mt={3}>
            <Flex align="center" justify="space-between">
              <Box fontStyle="italic">{createdAt && format(createdAt?.toDate(), "yyyy-MM-dd")}</Box>
              {session?.uid === createUser && (
                <Flex gap={3}>
                  <TaskProcessCommentEdit comment={comment} taskId={taskId} />
                  <AiOutlineDelete
                    cursor="pointer"
                    onClick={() => deleteComment(taskId, processName, comment)}
                  />
                </Flex>
              )}
            </Flex>
            <Box>投稿者<Box as="span" ml={1}>{getUserName(createUser)}</Box></Box>
            <Box mt={1} whiteSpace="pre-wrap" fontSize="sm">{content}</Box>
            <Flex mt={1} gap={3} flexWrap="wrap" direction={{ base: "column", md: "row" }} >
              {comment.images.length > 0 && (
                comment.images.map((image) => (
                  <Box flex={1}
                    w={{ base: "full", xl: "33.333%" }}
                    maxW={{ base: "full", xl: "33.333%" }} key={image.path}
                    cursor="pointer"
                    onClick={() => onClickImageUrlOpen(image.url)}
                  >
                    <img src={image.url} />
                  </Box>
                ))
              )}
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};

export default TaskProcessCommentList;