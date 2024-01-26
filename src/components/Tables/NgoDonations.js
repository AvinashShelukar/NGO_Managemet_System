import React from 'react'
import { Box, Heading } from '@chakra-ui/react';
import { useEffect , useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from "@chakra-ui/react"
  import { useNavigate } from 'react-router-dom'
import NgoNavbar from '../Navbar/NgoNavbar';

export default function NgoDonations() {

    const navigate = useNavigate();
    const [donationList, setDonationList] = useState([]);
    const [user , setUser] = React.useState("");
    const [email , setEmail] = React.useState("");
    const [total , setTotal] = React.useState(0);

    const checkLogin = async () => {

        try {
          const res = await fetch('/checkNgologin', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
    
          const data = await res.json();
          //console.log(data.email);
            setUser(data.name);
            setEmail(data.email);
    
          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }
    
        } catch (error) {
          console.log(error);
          window.alert("Please Login to continue");
          navigate("/ngo_login");
        }
    }


    const getDonations = async ()=>{

        try{

          const res = await fetch('/Userdonations' , {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });

          const data = await res.json();
          setDonationList(data);
          //console.log(data);

          if(!res.status === 200){
            const error = new Error(res.error);
            throw error;
          }

        }catch(err){
          console.log(err);
        }
    }

    useEffect(() => {

        checkLogin();
        getDonations();
        //totalDonations();
    }, []);


  return (
    <>
        <NgoNavbar />

        <Box style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
        }}>
            <Heading>
                Welcome {user}
            </Heading>
        </Box>

        <Box className='donations_table'
            style={{
                maxWidth: '80%',
                margin: 'auto',
                padding: '20px',
                marginTop: '1%',
            }}
        >

        <TableContainer>
            <Table variant="striped" colorScheme='pink' width="100%">
                <TableCaption 
                    placement='top'
                    fontSize={30}
                    marginBottom={7}
                >
                    Donations table
                </TableCaption>
                <Thead>
                <Tr>
                    <Th>Doner Name</Th>
                    <Th>Email</Th>
                    <Th>Time</Th>
                    <Th>Transaction ID</Th>
                    <Th isNumeric>Donated Amount</Th>
                </Tr>
                </Thead>
                <Tbody>
                  {donationList.map((donation) => {
                    if(donation.organization === user){
                      return(
                        <Tr>
                          <Td>{donation.fullname}</Td>
                          <Td>{donation.email}</Td>
                            <Td>{donation.date}</Td>
                          <Td>{donation._id}</Td>
                          <Td isNumeric>{donation.donated}</Td>
                        </Tr>
                      )
                    }
                  })}
                
                </Tbody>
            </Table>
        </TableContainer>

        </Box>
    
    
    </>
  )
}
