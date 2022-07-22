/* eslint-disable @next/next/no-img-element */
import {
    Box, Slider,
    SliderTrack, SliderFilledTrack, SliderThumb, SliderMark,
    FormLabel, FormControl as ChakraFormControl, Tooltip, Flex
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";


const PercentSlider = ({ onChange, defaultValue, update }) => {

    const [percent, setPercent] = useState(defaultValue);
    const [percentOpened, setPercentOpened] = useState(false);

    return (
        <ChakraFormControl
            rounded="md"
            mb={4}
        >
            <Flex
                alignItems="center"
                gap={2}
            >
                <FormLabel fontWeight="light" ml="-2.5" mt="2" fontSize="sm">
                    Percentage
                </FormLabel>
                <Tooltip py={2} rounded={"md"} shadow={"md"} color="white" shouldWrapChildren label=
                    {
                        update ? "Here you can modify the percentage you want to donate (based on your country's tax rate)."
                            : "First select the tax rate for the sale of NFTs in your country of residence."
                    }
                    isOpen={percentOpened}
                >
                    <Flex>
                        <AiOutlineQuestionCircle color="#2C83F2" onClick={() => setPercentOpened(!percentOpened)} />
                    </Flex>
                </Tooltip>
            </Flex>
            <Box pt={6} pb={2}>
                <Slider
                    defaultValue={percent ?? defaultValue}
                    aria-label='slider-ex-6' onChange={(val) => {
                        setPercent(val);
                        onChange(val);
                    }}
                >
                    <SliderMark value={25} ml="-2.5" mt="2" fontSize="sm">
                        25%
                    </SliderMark>
                    <SliderMark value={50} ml="-2.5" mt="2" fontSize="sm">
                        50%
                    </SliderMark>
                    <SliderMark value={75} ml="-2.5" mt="2" fontSize="sm">
                        75%
                    </SliderMark>
                    <SliderMark
                        value={percent ?? defaultValue}
                        textAlign='center'
                        bg='blue.500'
                        color='white'
                        mt='-10'
                        ml='-5'
                        w='12'
                    >
                        {percent ?? defaultValue}%
                    </SliderMark>
                    <SliderTrack >
                        <SliderFilledTrack
                        />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>

        </ChakraFormControl>
    );
}

export default PercentSlider;