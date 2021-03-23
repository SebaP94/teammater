import * as React from 'react'
import { useState } from 'react'
import { Flex, Button, Box, Text } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { MdAccountCircle } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'
import { colorScheme, border } from '../../shared/UIsettings'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { RegisterForm } from './RegisterForm'

type signInModes = 'choose' | 'register' | 'login'

export const SignUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [mode, setMode] = useState<'choose' | 'register' | 'login'>('choose')

  const renderModes = (mode: signInModes) =>
    ({
      choose: <LoginOrRegister setMode={setMode}></LoginOrRegister>,
      login: <LoginForm setMode={setMode}></LoginForm>,
      register: <RegisterForm setMode={setMode}></RegisterForm>,
    }[mode])

  const onCloseHandler = () => {
    setMode('choose')
    onClose()
  }

  const onOpenLogin = () => {
    setMode('login')
    onOpen()
  }

  const onOpenRegister = () => {
    setMode('register')
    onOpen()
  }

  return (
    <div>
      <Flex justifyContent="flex-end" px={4} py={2}>
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            colorScheme={colorScheme.primary}
            borderRadius={border.radius}
            rightIcon={
              <Icon as={MdAccountCircle} boxSize={8} color="cyan.700" />
            }
          >
            Gość
          </MenuButton>

          <ColorModeSwitcher></ColorModeSwitcher>
          <MenuList>
            <MenuItem onClick={() => onOpenLogin()}>Zaloguj się</MenuItem>
            <MenuItem onClick={() => onOpenRegister()}>Zarejestruj</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Modal isOpen={isOpen} onClose={onCloseHandler}>
        <ModalOverlay />
        <ModalContent p={2}>
          <ModalHeader>{getTitle(mode)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderModes(mode)}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

const getTitle = (mode: signInModes) => {
  const titles: Record<signInModes, string> = {
    choose: 'Zaloguj się',
    register: 'Zarejestruj się',
    login: 'Zaloguj sei',
  }
  return titles[mode]
}

export type formModeProps = { setMode: (mode: signInModes) => void }

const LoginOrRegister = ({ setMode }: formModeProps) => (
  <Flex direction="column">
    <Button
      w="full"
      variant="outline"
      colorScheme={colorScheme.primary}
      mr={3}
      my={2}
      onClick={(e) => setMode('login')}
    >
      <Text fontSize="lg">Zaloguj</Text>
    </Button>
    <Button
      my={2}
      w="full"
      variant="outline"
      colorScheme={colorScheme.secondary}
      onClick={(e) => setMode('register')}
    >
      <Text fontSize="lg">Zarejestruj się</Text>
    </Button>
  </Flex>
)

const LoginForm = ({ setMode }: formModeProps) => (
  <Flex direction="column">
    <Flex className="form" py={8}>
      Login form
    </Flex>
    <Flex direction="row" justifyContent="space-between" w="full">
      <Button
        variant="outline"
        colorScheme={colorScheme.primary}
        onClick={(e) => setMode('choose')}
      >
        Zaloguj
      </Button>
      <Button
        variant="outline"
        colorScheme={colorScheme.secondary}
        onClick={(e) => setMode('choose')}
      >
        Powrót
      </Button>
    </Flex>
  </Flex>
)
