import {
    Button,
    HStack,
    NumberDecrementStepper, NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text
} from "@chakra-ui/react";
import React, {useRef} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ApiClient from "../clients/pokecoin/src/ApiClient";
import {CardsApi, WalletApi} from "../clients/pokecoin/src";

const apiClient = new ApiClient("http://localhost:3000/")
let token = apiClient.authentications['token']
token.apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNocmlzIiwiaWF0IjoxNjcxNDU3NTE0LCJleHAiOjE2NzE1NDM5MTR9.dj1wDmDgBlLV9UwfeKdz_g7_zABhSL0kMGF3kRAquuQ'

const cardApi = new CardsApi(apiClient)


function BuyPackagePage() {
    const amount = useRef(1)
    const queryClient = useQueryClient()

    const {data: availablePackages} = useQuery(['package'],
        async () => {
            return await cardApi.cardsPackagesGet() //Array
        })

    const {mutate, isSuccess} = useMutation(buyPackage, {onSuccess: () => {
            queryClient.invalidateQueries(['walletBalance']).catch(console.log)
        }})

    async function buyPackage(packageName) {
        const response = await cardApi.cardsPackagesCardPackNameBuyDefaultPackageGet(packageName)
        console.log(response)
        return response
    }

    function handleClick() {
        if ((amount.current * 25) > localStorage.getItem('walletBalance')) {
            console.log('Not enough Coins')
            return
        }
        for (let i = 0; i < amount.current; i++) {
            mutate(availablePackages[0])
        }
    }

    return (
            <HStack>
                <Text color='whitesmoke'>Amount</Text>
                <NumberInput focusInputOnChange={false} defaultValue={1} min={1} max={10} width='20' onChange={(value) => amount.current = value}>
                    <NumberInputField borderWidth='3px' bg='gray'  color='whitesmoke'>
                    </NumberInputField>
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Button colorScheme={'blue'} onClick={() => handleClick()}>Buy Package(s)</Button>
            </HStack>
    )
}

export default BuyPackagePage