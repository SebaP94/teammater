import * as React from 'react'
import { useState } from 'react'
import { Flex, Button, ButtonGroup, Text } from '@chakra-ui/react'
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
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from '@chakra-ui/react'

type signInModes = 'choose' | 'register' | 'login'

export const SignUpForm = () => {
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
            <MenuItem onClick={(e) => onOpenLogin()}>Zaloguj się</MenuItem>
            <MenuItem onClick={(e) => onOpenRegister()}>Zarejestruj</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Modal isOpen={isOpen} onClose={onCloseHandler}>
        <ModalOverlay />
        <ModalContent p={2}>
          <ModalHeader>Zaloguj się</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderModes(mode)}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

type formModeProps = { setMode: (mode: signInModes) => void }

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
      <Text fontSize="lg">Zarejestruj</Text>
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
const RegisterForm = ({ setMode }: formModeProps) => (
  <Flex direction="column">
    <Flex className="form" py={8}>
      Register form
    </Flex>
    <Flex direction="row" justifyContent="space-between" w="full" my={2}>
      <Button
        variant="outline"
        colorScheme={colorScheme.primary}
        onClick={(e) => setMode('choose')}
      >
        Zarejestruj
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
