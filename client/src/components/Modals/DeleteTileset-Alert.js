import React, { useState, useContext, useEffect } from "react";
import GlobalEditStoreContext from "../../store/EditStore";
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

const DeleteTilesetAlert = (props) => {
  const { editStore } = useContext(GlobalEditStoreContext)

  const deleteTileset = () => {
    console.log(editStore.tilesetMarkedForDeletion._id)
    editStore.deleteMarkedTileset()
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
            Delete {(editStore.tilesetMarkedForDeletion) ? (editStore.tilesetMarkedForDeletion.name) : ""} ?
          </AlertDialogHeader>

          <AlertDialogBody textColor={"red"}  >
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={props.cancelRef} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={deleteTileset} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteTilesetAlert;