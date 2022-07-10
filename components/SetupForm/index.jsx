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

const SetupForm = ({ contract, update, currentConfig }) => {
    const { user } = useMoralis();

    const defaultSetup = {
        percent: 20,
        ong: undefined,
        savingAccount: user && user.get("ethAddress") || null
    };

    const [configuration, setConfiguration] = useState(defaultSetup);

    useEffect(() => {
        if (currentConfig) {
            setConfiguration({
                percent: currentConfig.percent,
                ong: currentConfig.ong,
                savingAccount: currentConfig.wallet
            });
            console.log({ currentConfig });
        }
    }, [currentConfig]);

    const [isChecked, setIsChecked] = useState(false);
    const [organizations, setOrganizations] = useState();

    const orgsOptions = [];

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    const toast = useToast();
    const router = useRouter();


    const notifySentTX = () => {
        toast({
            title: "Transaction sent",
            description: "Your transaction has been sent to the blockchain. It may take a few minutes to be mined.",
            status: "info",
            duration: 9000,
            isClosable: true,
        });
    }

    const notifyUpdate = (field) => {
        toast({
            title: `Configuration updated for ${field}`,
            description: `Your configuration for ${field} has been updated.`,
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    }

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
            // call to contract function
            if (!update) {
                const txDeploy = await contract.createParticular(configuration.percent, configuration.ong, configuration.savingAccount);
                notifySentTX();
                await txDeploy.wait();
            } else {
                const contractONG = await contract.ong();
                const contractWallet = await contract.wallet();

                if (contractONG && contractONG !== configuration.ong) {
                    const { merkleProof } = await (await fetch(`/api/nonprofit/${configuration.ong}`)).json()
                    console.log({ merkleProof });
                    const txOng = await contract.setONG(configuration.ong, merkleProof);
                    notifySentTX();
                    await txOng.wait();
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
                    notifySentTX();
                    await txWallet.wait();
                    toast({
                        title: "Wallet updated",
                        description: "Wallet updated successfully",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                }

                if (configuration.percent !== (await contract.percent()).toNumber()) {
                    const txPercent = await contract.setPercent(configuration.percent);
                    notifySentTX();
                    await txPercent.wait();
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
                description: "You can now start using the application",
                status: "success",
                duration: 9000,
                isClosable: true,
                onCloseComplete: () => {
                    router.reload();
                }
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
                            <Slider 
                                defaultValue={configuration.percent}
                                aria-label='slider-ex-6' onChange={(val) => {
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
                                    value={configuration.percent}
                                    defaultValue={configuration.percent}
                                    textAlign='center'
                                    bg='blue.500'
                                    color='white'
                                    mt='-10'
                                    ml='-5'
                                    w='12'
                                >
                                    {configuration.percent}%
                                </SliderMark>
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Box>
                    </ChakraFormControl>

                    <FormInput
                        onChange={(e) => setConfiguration({ ...configuration, ong: e.target.value })}
                        label="Charity organization"
                        type="select"
                        options={organizations}
                        placeholder="Select a organization"
                        value={configuration.ong}
                        defaultValue={configuration.ong}
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
