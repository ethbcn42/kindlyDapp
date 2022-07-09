import {
    chakra,
    ChakraProps,
    FormControl as ChakraFormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Select,
    Switch,
    Textarea,
  } from "@chakra-ui/react";
  import { ReactNode, useState } from "react";
  
  export const FormInput = ({
    label,
    type,
    options,
    onChange,
    onBlur,
    checker = () => false,
    value,
    helperText,
    placeholder,
    children,
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


    const checkWalletAddress = () => {
      };
    return (
      <ChakraFormControl
        rounded="md"
        mb={4}
        {...containerStyles}
      >
        <FormLabel fontWeight="light" {...labelStyles}>
          {label}
        </FormLabel>
        {type === "textarea" && <Textarea {...inputProps} {...inputStyles} />}
        {type === "text" && <Input 
            {...inputProps}
            {...inputStyles} checker={checkWalletAddress}/>}
        {type === "select" && (
          <Select {...inputProps} {...inputStyles}>
            {options?.map((option) => (
              <option key={`kk-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
        <FormHelperText>
          {checker() ? (
            <chakra.span color="red.600" fontWeight="bold">
              {checker()}
            </chakra.span>
          ) : (
            <chakra.span>{helperText}</chakra.span>
          )}
        </FormHelperText>
      </ChakraFormControl>
    );
  };
  