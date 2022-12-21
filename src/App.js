import MiningPage from "./components/Mining";
import BuyPackagePage from "./components/BuyPackagePage";
import {
    Box,
    Center,
    Flex,
    Spacer,
    Tab,
    TabList,
    Tabs,
    Text
} from "@chakra-ui/react";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ApiClient, WalletApi} from "./clients/pokecoin/src";

localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNocmlzIiwiaWF0IjoxNjcxNjM1OTA0LCJleHAiOjE2NzE3MjIzMDR9.RJVvFmmTaFLepEU__KMFdMJQ7L2WzWOv5003fVXesKQ')

const apiClient = new ApiClient("http://localhost:3000/")
let token = apiClient.authentications['token']
token.apiKey = localStorage.getItem('token')
const walletApi = new WalletApi(apiClient)

function App() {
    const [tabIndex, setTabIndex] = useState(0)

    const {data: walletBalance} = useQuery(['walletBalance'],
        async () => {
            const response = await walletApi.walletBalanceGet()
            localStorage.setItem('walletBalance', response.amount)
            return response
        })

    document.body.style.backgroundColor = '#263040';

    return (
        <>
            <div style={{backgroundColor: 'gray', borderRadius: '15px'}}>
                <Flex alignItems='center' padding='10px'>
                    <Spacer/>
                    <Tabs onChange={(index) => setTabIndex(index)}
                          variant='soft-rounded' colorScheme='green' marginLeft='40px'>
                        <TabList>
                            <Tab>Mining</Tab>
                            <Tab>Buy Packages</Tab>
                        </TabList>
                    </Tabs>
                    <Spacer/>
                    <Box marginRight='20px' borderRadius='lg' color='white' bg='teal' p={2} borderWidth='1px'>
                        <Text fontWeight='bold'>Wallet Balance: {walletBalance?.amount}</Text>
                    </Box>
                </Flex>
            </div>
            <Center marginTop='100px'>
                {tabIndex === 0 && <MiningPage/>}
                {tabIndex === 1 && <BuyPackagePage/>}
            </Center>
        </>
    );
}

export default App;
