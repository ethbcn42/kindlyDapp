/* eslint-disable @next/next/no-img-element */
import {
    Box, Button, Center, chakra, Text, useToast, Checkbox, Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    FormLabel,
    FormControl as ChakraFormControl,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { FormInput } from "./FormInput";

const SetupForm = ({ contract, update }) => {
    const { user } = useMoralis();

    const defaultSetup = {
        percent: 20,
        charityOrganization: "",
        savingAccount: user && user.get("ethAddress") || null
    };

    const [configuration, setConfiguration] = useState(defaultSetup);
    const [isChecked, setIsChecked] = useState(false);
    const [organizations, setOrganizations] = useState();
    const [sliderValue, setSliderValue] = useState(20);

    const orgsOptions = [];

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }



    const toast = useToast();
    const router = useRouter();


    //CONSULTAR: spinner?? comprobaciones desde el front (que la address sea hex, el porcentaje puede ser con decimales?)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const checkWalletAddress = (value) => {
                // create regex for checking if address is valid
                const regex = /^(0x)?[0-9a-f]{40}$/i;
                // check if address is valid
                return regex.test(value);
            };
            if (!checkWalletAddress(configuration.savingAccount)) {
                throw {
                    title: "Invalid wallet address",
                    description: "Please check the wallet address",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                };
            }
            console.log(configuration);
            // call to contract function
            if (!update) {
                const txDeploy = await contract.createParticular(configuration.percent, configuration.charityOrganization, configuration.savingAccount);
                const result = await txDeploy.wait();
                console.log(result);
            } else {
                const contractONG = await contract.ong();
                const contractWallet = await contract.wallet();

                if (contractONG !== configuration.charityOrganization) {
                    const { merkleProof } = await (await fetch(`/api/nonprofit/${configuration.charityOrganization}`)).json()
                    const txOng = await contract.setONG(configuration.charityOrganization, merkleProof);
                    const result = await txOng.wait();
                    toast({
                        title: "ONG updated",
                        description: "ONG updated successfully",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                }

                if (contractWallet !== configuration.savingAccount) {
                    const txWallet = await contract.setWallet(configuration.savingAccount);
                    const result = await txWallet.wait();
                    toast({
                        title: "Wallet updated",
                        description: "Wallet updated successfully",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                }

                if (configuration.percent !== contract.percent()) {
                    const txPercent = await contract.setPercent(configuration.percent);
                    const result = await txPercent.wait();
                    toast({
                        title: "Percent updated",
                        description: "Percent updated successfully",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                }
            }



            toast({
                title: "Setup successful",
                description: "You can now use the app",
                status: "success",
                duration: 9000,
                isClosable: true
            });
            // success message

        } catch ({
            title,
            description,
            status,
            duration,
            isClosable,
        }) {
            toast({
                title,
                description,
                status,
                duration,
                isClosable
            });
        }
    };

    useEffect(() => {
        async function fetchData(){
            const resp = await fetch("/api/nonprofit", {
                method: 'GET'
            });
    
            const gettedOrgs = await resp.json();
            if (gettedOrgs) {
                gettedOrgs.map((org) => {
                    orgsOptions.push({
                        ...org,
                        value: org.address,
                        label: org.name
                    })
                });
                setOrganizations(orgsOptions);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchDataFromContract () {
            if (update && contract) {
                console.log("LLEGO:", contract, update);
                const ONGFromcontract = await contract.ong();
                const walletFromcontract = await contract.wallet();
                const percentFromcontract = await contract.percent();
                setConfiguration({
                    ...configuration,
                    charityOrganization: ONGFromcontract,
                    savingAccount: walletFromcontract,
                    percent: percentFromcontract
                });
            }
        }
        fetchDataFromContract();
    }, [update, contract]);

    return (
        <Center h="80vh" flexDir="column">
            <Box shadow={"lg"} border="solid 1px #7fb5ff" rounded="md" px={10}>
                <chakra.form
                    maxW="400px"
                    onSubmit={handleSubmit}
                    bg="white"
                    mx={4}
                    w="calc(100% - 2rem)"
                    p={4}
                    my={4}

                >
                    <ChakraFormControl
                        rounded="md"
                        mb={4}
                    >
                        <FormLabel fontWeight="light" {...labelStyles} fontSize="m" ml='0'>
                            Percentage
                        </FormLabel>
                        <Box pt={6} pb={2}>
                            <Slider aria-label='slider-ex-6' onChange={(val) => {
                                setSliderValue(val);
                                setConfiguration({ ...configuration, percent: val })
                            }}
                            >
                                <SliderMark value={25} {...labelStyles}>
                                    25%
                                </SliderMark>
                                <SliderMark value={50} {...labelStyles}>
                                    50%
                                </SliderMark>
                                <SliderMark value={75} {...labelStyles}>
                                    75%
                                </SliderMark>
                                <SliderMark
                                    value={sliderValue}
                                    textAlign='center'
                                    bg='blue.500'
                                    color='white'
                                    mt='-10'
                                    ml='-5'
                                    w='12'
                                >
                                    {sliderValue}%
                                </SliderMark>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Box>
                    </ChakraFormControl>

                    <FormInput
                        onChange={(e) => setConfiguration({ ...configuration, charityOrganization: e.target.value })}
                        label="Charity organization"
                        type="select"
                        options={organizations}
                        placeholder="Select a organization"
                        required
                    />
                    {/* <SavinAccountChooser/> */}
                    <Checkbox onChange={() => {
                        setIsChecked(!isChecked)
                        setConfiguration({ ...configuration, savingAccount: user.get("ethAddress") })
                    }}>Send the remainder to another wallet of your choice</Checkbox>
                    {isChecked &&
                        <FormInput
                            onChange={(e) => setConfiguration({ ...configuration, savingAccount: e.target.value })}
                            label="Saving Account"
                            type="text"
                            placeholder=""
                            required
                        />
                    }
                    <Button type="submit" w="100%">
                        Set my configuration
                    </Button>

                </chakra.form>
            </Box>
        </Center>
    );
}

export default SetupForm;
