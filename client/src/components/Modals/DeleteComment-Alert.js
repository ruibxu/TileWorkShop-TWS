import React, {useState, useContext, useEffect} from "react";
import GlobalCommentStoreContext from "../../store/CommentStore";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Text,
    Button
  } from '@chakra-ui/react'

const DeleteCommentAlert = (props) => {
  const { commentStore } = useContext(GlobalCommentStoreContext)

  const deleteComment = () => {
    console.log(commentStore.commentMarkedForDeletion)
    commentStore.deleteMarkedComment()
    props.onClose()
  }

  return (
      <AlertDialog
        isOpen={props.isOpen}
        leastDestructiveRef={props.cancelRef}
        onClose={props.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' color='purple'>
              Delete Comment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={props.cancelRef} onClick={props.onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={deleteComment} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}

export default DeleteCommentAlert;