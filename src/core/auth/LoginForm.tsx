import React, { useCallback } from 'react'
import { Flex, Button, Text } from '@chakra-ui/react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
// import { FcGoogle } from 'react-icons/fc'
// import { AiOutlineFacebook, AiOutlineMail } from 'react-icons/ai'
// import { Icon } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { colorScheme, toaster } from '../../shared/UIsettings'
import app from '../../base'

import { formModeProps } from './SingUp'

export const LoginForm = ({ setMode, onClose }: formModeProps) => {
  const { register, errors, handleSubmit } = useForm({
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  const toast = useToast()
  const onSubmit = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(onClose)
      } catch (error) {
        toast({
          title: 'Nie udało się zalogować.',
          description: error.message,
          status: 'error',
          position: toaster.position,
          duration: toaster.duration,
          isClosable: true,
        })
      }
    },
    [],
  )
  return (
    <>
      <Flex direction="column" justifyContent="center">
        <Flex className="form" py={2} flexDirection="column">
          <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Adres e-mail</FormLabel>
              <Input
                type="email"
                name="email"
                ref={register({
                  required: 'Adres email jest obowiązkowy.',
                  pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Format adresu e-mail jest niepoprawny.',
                  },
                })}
              />
              {errors.email && (
                <Text fontSize="xs" color="red.500" p={1}>
                  {errors.email.message}
                </Text>
              )}
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Hasło</FormLabel>
              <Input
                type="password"
                name="password"
                ref={register({
                  required: 'Hasło jest obowiązkowe.',
                  minLength: {
                    value: 5,
                    message: 'Hasło musi być dłuższe niż 5 liter.',
                  },
                })}
              />
              {errors.password && (
                <Text fontSize="xs" color="red.500" p={1}>
                  {errors.password.message}
                </Text>
              )}
            </FormControl>
          </form>
        </Flex>
        <Flex direction="row" justifyContent="space-between" w="full" my={2}>
          <Button
            variant="outline"
            colorScheme={colorScheme.secondary}
            onClick={(e) => setMode('choose')}
          >
            Powrót
          </Button>
          <Button
            variant="outline"
            colorScheme={colorScheme.primary}
            type="submit"
            form="login-form"
          >
            Zaloguj się
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
