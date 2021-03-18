import * as React from 'react'
import { Flex, Button, ButtonGroup } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'

export const SignUpForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            <Flex justifyContent="flex-end">
                <ButtonGroup py={4} px={8}>
                    <Button
                        variant="outline"
                        colorScheme="cyan"
                        onClick={onOpen}
                    >
                        Zaloguj się
                    </Button>
                    <ColorModeSwitcher></ColorModeSwitcher>
                </ButtonGroup>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Zaloguj się</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {' '}
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Zaloguj
                        </Button>
                        <Button variant="ghost">Zarejestruj</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}
