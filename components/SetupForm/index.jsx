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
import { FormInput } from "./FormInput";

const SetupForm = () => {
    const defaultSetup = {
        percent: 20,
        charityOrganization: "",
        savingAccount: null, //setear con hook
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
            console.log(configuration);
            //call to contract function
        } catch (error) {
            console.log('error', error)
            toast({
                title: "Error",
                description: "Error message pending to be changed",
                status: "error",
                duration: 9000,
                isClosable: true,
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
                    <Checkbox onChange={() => setIsChecked(!isChecked)}>Send the remainder to another wallet of your choice</Checkbox>
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
