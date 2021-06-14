import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Heading, Box, Button, Link, Table, Tbody, Tr, Td, } from "@chakra-ui/react"

const Home = () => {

    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/app'), [history]);

    return (
        <div>
            <Table size="sm" >
                <Tbody>
                <Tr>
                    <Td>
                        <Heading
                            as="h1"
                            size="xl"
                            fontWeight="bold"
                            color="primary.800"
                            textAlign={["center", "center", "left", "left"]}
                        >
                            DeLive (DeLi)
                        </Heading>
                        <Heading
                            as="h2"
                            size="md"
                            color="pink"
                            opacity="0.8"
                            fontWeight="normal"
                            lineHeight={1.5}
                            textAlign={["center", "center", "left", "left"]}
                        >
                            Decentralized Living
                        </Heading>
                    </Td>
                    <Td margin="2px" alignContent="end"><Link to={"/app"}>
                        <Button colorScheme="purple" onClick={handleOnClick}>Use DeLi</Button></Link></Td>
                </Tr>
                <Tr>
                    <Td style={{ textAlign: "center"}}>
                    <Box w={{ base: "80%", sm: "60%", md: "50%" }} backgroundColor="pink" mb={{ base: 12, md: 0 }}>
                    <Heading
                            as="h1"

                            fontWeight="bold"
                            color="primary.800"
                            textAlign={["center", "center", "left", "left"]}
                        >
                            Start a Decentralized Live today! 
<p>
                        <Button colorScheme="purple" onClick={handleOnClick}>Use DeLi</Button>
                        <Button onClick={handleOnClick}>Documentation</Button>
                        <Button onClick={handleOnClick}>FAQ</Button>
</p>
                 
                        </Heading>
                    </Box>
                    </Td>
                </Tr>
                
                </Tbody>
            </Table>
        </div>)
}
export default Home