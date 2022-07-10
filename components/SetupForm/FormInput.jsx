import {
    FormControl as ChakraFormControl,
    FormLabel,
    Input,
    Select,
    Stack
  } from "@chakra-ui/react";
import CharityModal from "@components/CharityModal";
import { useState } from "react";
  
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
    };

    const [orgInformation, setOrgInformation] = useState();

    return (
      <ChakraFormControl
        rounded="md"
        mb={4}
        {...containerStyles}
      >
        <FormLabel fontWeight="light" {...labelStyles}>
          {label}
        </FormLabel>
        {type === "text" && <Input 
            {...inputProps}
            {...inputStyles}/>}
        {type === "select" && (
            <Stack isInline spacing={8} align="center">
          <Select {...inputProps} {...inputStyles}
          onChange={(e)=>{
            inputProps.onChange(e);
            const singleOrg = options.filter(obj => obj.value === e.target.value);
            setOrgInformation(singleOrg.length ? singleOrg[0]: undefined);
            }}>
            {options?.map((option, i) => (
               <option key={`kk-${option.value}-${i}`} value={option.value}>
                {option.name}
              </option> 
            ))}
          </Select>
            {
                orgInformation &&
           <CharityModal organization={orgInformation}/>}

           </Stack>
        )}
      </ChakraFormControl>
    );
  };
  