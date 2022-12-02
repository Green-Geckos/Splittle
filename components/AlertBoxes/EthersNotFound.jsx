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
                Metamask not found
            </AlertDialogHeader>

            <AlertDialogBody>
                Make sure to install Metamask in your browser.
            </AlertDialogBody>

            <AlertDialogFooter>
            <Button colorScheme='blue' onClick={props.onClose} ml={3}>
                Ok
            </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
};

export default EthersNotFound;