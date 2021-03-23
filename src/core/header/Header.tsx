import { Flex, Button, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'
import { AuthContext } from '../auth/Auth'
import { SignUp } from '../auth/SingUp'
import { User } from '@firebase/auth-types'
import app from '../../base'
import { useToast, Icon } from '@chakra-ui/react'
import { toaster, colorScheme, border } from '../../shared/UIsettings'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { MdAccountCircle } from 'react-icons/md'

export const Header = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <Flex alignItems="center" w="full" px={4} justify="flex-end">
      {currentUser ? <UserBox user={currentUser} /> : <SignUp></SignUp>}
      <ColorModeSwitcher />
    </Flex>
  )
}

type UserBoxProps = { user: User }
const UserBox = ({ user }: UserBoxProps) => {
  const toast = useToast()

  const onSignOut = () => {
    app
      .auth()
      .signOut()
      .then(() => {
        toast({
          title: 'Zostałeś poprawnie wylogowany',
          status: 'info',
          duration: toaster.duration,
          isClosable: true,
          position: toaster.position,
        })
      })
  }
  return (
    <Flex justifyContent="flex-end" px={4} py={2}>
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          colorScheme={colorScheme.primary}
          borderRadius={border.radius}
          rightIcon={<Icon as={MdAccountCircle} boxSize={8} color="cyan.700" />}
        >
          {user.displayName ? user.displayName : user.email}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => onSignOut()}>Wyloguj</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
