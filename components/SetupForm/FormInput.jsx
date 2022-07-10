import {
  Flex,
  FormControl as ChakraFormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Tooltip
} from "@chakra-ui/react";
import CharityModal from "@components/CharityModal";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";


export const FormInput = ({
  label,
  type,
  options,
  onChange,
  onBlur,
  value,
  placeholder,
  disabled,
  required,
  containerStyles = {},
  inputStyles = {},
  labelStyles = {},
}) => {

  const inputProps = {
    required,
    onChange,
    onBlur,
    value,
    placeholder: placeholder ? placeholder : label,
    disabled,
    labelStyles
  };

  const particularLabelStyles = {
    ...inputProps.labelStyles,
    mt: '2',
    ml: '0',
}

  const [orgInformation, setOrgInformation] = useState();
  const [orgOpened, setOrgOpened] = useState(false);

  return (
    <ChakraFormControl
      rounded="md"
      mb={4}
      {...containerStyles}
    >
      {type === "select" ?
        <Flex
          alignItems="center"
          gap={2}
        >
          <FormLabel fontWeight="light" {...particularLabelStyles}>
            {label}
          </FormLabel>
          <Tooltip py={2} rounded={"md"} shadow={"md"} color="white" shouldWrapChildren label=
            {
              options?.update ? "Would you like to change NGO for your donations? "
                : "Now select the ONG or social good project you want to support."}
            isOpen={orgOpened}

          >
            <Flex>
              <AiOutlineQuestionCircle color="#7fb5ff" onClick={() => setOrgOpened(!orgOpened)} />
            </Flex>
          </Tooltip>
        </Flex>
        :
        <FormLabel fontWeight="light" {...labelStyles}>
          {label}
        </FormLabel>}
      {type === "text" && <Input
        {...inputProps}
        {...inputStyles} />}
      {type === "select" && (

        <Stack isInline spacing={8} align="center">
          <Select {...inputProps} {...inputStyles}
            onChange={(e) => {
              inputProps.onChange(e);
              const singleOrg = options.organizations.filter(obj => obj.value === e.target.value);
              setOrgInformation(singleOrg.length ? singleOrg[0] : undefined);
            }}>
            {options.organizations?.map((option, i) => (
              <option key={`kk-${option.value}-${i}`} value={option.value}>
                {option.name}
              </option>
            ))}
          </Select>
          {
            orgInformation &&
            <CharityModal organization={orgInformation} />}

        </Stack>
      )}
    </ChakraFormControl>
  );
};
