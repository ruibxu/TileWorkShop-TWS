import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
  } from '@chakra-ui/react'

const DeniedAlert = (props) => {
    const {onClose, isOpen, message, header} = props


    return (<AlertDialog
                onClose={onClose}
                isOpen= {isOpen}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                    
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {header}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {message}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button  colorScheme='purple' onClick={onClose}>
                            Okay
                            </Button>
                        </AlertDialogFooter>
                
                    </AlertDialogContent>
                </AlertDialogOverlay>
    </AlertDialog>)
}

export default DeniedAlert