import React from "react";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
  } from '@chakra-ui/react'

const EthersNotFound = (props) => {
    return <AlertDialog
        isOpen={props.isOpen}
        onClose={props.onClose}
    >
        <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
            <Button onClick={props.onClose}>
                Cancel
            </Button>
            <Button colorScheme='red' onClick={props.onClose} ml={3}>
                Delete
            </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
};

export default EthersNotFound;