/* eslint-disable @next/next/no-img-element */
import { Box, Button, Center, chakra, Text, useToast, Checkbox } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormInput } from "./FormInput";

const SetupForm = () => {
  const defaultSetup = {
    percent: 0,
    charityOrganization: "",
    savingAccount: null, //setear con hook
  };
  const [configuration, setConfiguration] = useState(defaultSetup);
  const [isChecked, setIsChecked] = useState(false);
  const [organizations, setOrganizations] = useState();
  const orgsOptions = [];
  

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

  useEffect(async () => {
    const resp= await fetch("/api/nonprofit", {
      method: 'GET'
    });
  
    const gettedOrgs = await resp.json();
    if (gettedOrgs) {
        console.log(gettedOrgs);
        gettedOrgs.map((org) =>{
            orgsOptions.push({
                value: org.address,
                label: org.name,
                img: org.logo
            })
        });

        console.log("after map", orgsOptions);
        setOrganizations(orgsOptions)
    }
  }, []);

  return (
    <Center h="80vh" flexDir="column">
      <Box shadow={"lg"} px={10}>
      <chakra.form
        maxW="400px"
        onSubmit={handleSubmit}
        bg="white"
        rounded="md"
        mx={4}
        w="calc(100% - 2rem)"
        p={4}
        my={4}
        
      >
        <FormInput
          onChange={(e) => setConfiguration({ ...configuration, percent: e.target.value })}
          label="Percent"
          type="number"
          placeholder=""
          required
        />

        <FormInput
          onChange={(e) => setConfiguration({ ...configuration, charityOrganization: e.target.value })}
          label="Charity organization"
          type="select"
          options={organizations}
          placeholder="Select a organization"
          required
        />
        {/* <SavinAccountChooser/> */}
        <Checkbox onChange={() => setIsChecked(!isChecked) }>Send the remainder to another wallet of your choice</Checkbox>
        {isChecked &&
            <FormInput
              onChange={(e) => setConfiguration({ ...configuration, savingAccount: e.target.value })}
              label="Saving Account"
              type="text"
              placeholder=""
              required
            />
        }
            <Button type="submit" w="100%" variantColor="teal" >
            Set my configuration
            </Button>

      </chakra.form>
      </Box>
    </Center>
  );
}

export default SetupForm;
