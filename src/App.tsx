import * as React from 'react'
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Flex,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Logo } from './Logo'
import { Header } from './core/header/Header'

export const App = () => (
    <ChakraProvider theme={theme}>
        <Flex direction="column">
            <Header></Header>
            <Box textAlign="center" fontSize="xl">
                <Grid minH="100vh" p={3}>
                    <ColorModeSwitcher justifySelf="flex-end" />
                    <VStack spacing={16}>
                        <Logo h="40vmin" pointerEvents="none" />
                        <Text>
                            Edit <Code fontSize="xl">src/App.tsx</Code> and save
                            to reload.
                        </Text>
                        <Link
                            color="teal.500"
                            href="https://chakra-ui.com"
                            fontSize="2xl"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn Chakra
                        </Link>
                    </VStack>
                </Grid>
            </Box>
        </Flex>
    </ChakraProvider>
)
