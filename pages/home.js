import { useState, useEffect } from 'react'
import {
  Flex,
  Button,
  List,
  Avatar,
  Divider,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'

import '@fontsource/poppins/700.css'
import Name from '../components/ENS/Name'

export default function Index() {
  const {
    isOpen: isNewGroupOpen,
    onOpen: onNewGroupOpen,
    onClose: onNewGroupClose
  } = useDisclosure()

  const { 
    isOpen: isAddExpensesOpen, 
    onOpen: onAddExpensesOpen, 
    onClose: onAddExpensesClose 
  } = useDisclosure()
  
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState({})
  const [groupName, setGroupName] = useState('')
  const [groupMemberAddress, setGroupMemberAddress] = useState('')
  const [groupMembers, setGroupMembers] = useState([])
  const [groupNameError, setGroupNameError] = useState(false)
  const [groupMembersError, setGroupMemebersError] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  
  
  useEffect(() => {
    setMounted(true)
  })

  const handleGroupName = (event) => {
    setGroupName(event.target.value)
    if (groupName.length > 0) {
      setGroupNameError(false)
    }
  }

  const handleGroupMembers = (event) => {
    setGroupMemberAddress(event.target.value)
    if (groupMemberAddress.length > 0) {
      setGroupMemebersError(false)
    }
  }

  const handleAddGroupMember = () => {
    groupMembers.push(groupMemberAddress)
    setGroupMemberAddress('')
  }

  const handleCreateGroup = (event) => {
    if (groupName.length == 0 && groupMembers.length == 0) {
      setGroupNameError(true)
      setGroupMemebersError(true)
    } else if (groupName.length == 0 && groupMembers.length !== 0) {

      setGroupNameError(true)
    } else if (groupName.length !== 0 && groupMembers.length == 0) {

      setGroupMemebersError(true)
    } else {
      setGroupMemberAddress('')
      setGroupName('')
      onNewGroupClose()
      null
    }
  }
  const testGroup = ['Group 1', 'Group 2', 'Group 3']

  if (mounted) {
    return (
      <>
        <Flex flexDirection={'column'} fontFamily={'poppins.700'} h='100vh' w='100vw'>
          <Flex w='100%' h={'80px'} bg='brand.purple' >
            <Flex w='100%' float={'left'} />
            <Flex h='100%' alignItems={'center'} float={'right'} mr={4} >


              <Button 
                mr={4} 
                onClick={onNewGroupOpen} 
                leftIcon={<AddIcon />} 
                colorScheme='teal' 
                variant='solid' 
                size={'sm'} >
                New Group
              </Button>
              <Name ensName="0x8791653aa21c1D9b55ADdadf92bEb7c60E42d72C"/>
              <Modal isOpen={isNewGroupOpen} onClose={onNewGroupClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create New Group</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl isInvalid={groupNameError}>
                      <Input placeholder='Enter a group name' variant={'flushed'} type='text' value={groupName} onChange={handleGroupName} />
                      {!groupNameError ?
                        null
                        : (
                          <FormErrorMessage>Group name is required.</FormErrorMessage>
                        )}


                    </FormControl>
                    <FormControl mt={4} isInvalid={groupMembersError}>
                      <Input placeholder='Add group members' type='text' value={groupMemberAddress} onChange={handleGroupMembers} />
                      <Button onClick={handleAddGroupMember} mt={1} size='md' >Add</Button>
                      {!groupMembersError ?
                        null
                        : (
                          <FormErrorMessage>Add group members.</FormErrorMessage>
                        )}



                    </FormControl>
                    <Flex flexDirection='column'>
                      <Flex mt={2}  >Added Memebers:</Flex>
                      <List>
                        {
                          groupMembers.map((address) => (
                            <ListItem key={address}>{address}</ListItem>
                          ))

                        }
                      </List>

                    </Flex>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleCreateGroup}>
                      Create
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Flex alignItems='center' h='100%'>
                <Avatar src='https://bit.ly/broken-link' />

              </Flex>

            </Flex>
          </Flex>
          <Flex justifyContent={'center'} bg='gray.200' alignItems='center' h='100%' w='100vw' >
            <Flex overflow={'auto'} h='95%' w='30%' maxW={'300px'} bg='white' m={2} borderRadius='15px' >
              <List spacing={3} p={1} mt={2} w='100%' >
                {testGroup.map((groupName) => (
                  <>
                    <ListItem _hover={{
                      background: 'black',
                      color: 'white'
                    }} borderRadius='8px' p={1} cursor={'pointer'} onClick={() => console.log('hello')} >
                      {groupName}
                    </ListItem>
                    <Divider />
                  </>

                ))}

              </List>
            </Flex>
            <Flex p={2} overflow={'auto'} w='100%' h='95%' m={2} bg='white' borderRadius={'15px'} >
              {
                Object.keys(data) ? (
                  <Flex mt={2} >
                    List of transactions
                  </Flex>
                ) : (
                  <Flex mt={2}>
                    No transactions included
                </Flex>
            )
        }
     </Flex>
    <Button onClick={onAddExpensesOpen} position={'absolute'} width='80%' maxW='600px' colorScheme='teal' bottom='20px' zIndex={1} >
        Add Expenses
    </Button>
    <Modal isOpen={isAddExpensesOpen} onClose={onAddExpensesClose}  >
        <ModalOverlay />
        <ModalContent  >
          <ModalHeader>Add New Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH={'50vh'} overflow='auto'>
            <Flex>
            <Flex alignItems={'center'} fontWeight={'bold'} >Total Amount:</Flex>
            <Input htmlSize={4} width='auto' ml={2}  />
            </Flex>
            <Flex fontWeight={'bold'} >Paid by:</Flex>
            <Flex flexDir={'column'}>
              {
                testGroup.map((member) => (
                  <Flex key={member} w='100%' m={2} >
                  
                  <Flex w='33%' alignItems={'center'} >{member}</Flex>
                  <Flex alignItems={'center'} w='33%'>
                  <Input htmlSize={4} width='auto' />%
                  </Flex>
                  <Flex w='33%' alignItems={'center'} justifyContent='center' >{member} MATIC</Flex>
                  </Flex>
                ))
              }
            </Flex>
            <Flex fontWeight={'bold'}>Split Between:</Flex>
            <Flex flexDir={'column'}>
              {
                testGroup.map((member) => (
                  <Flex key={member} w='100%' m={2} >
                  
                  <Flex w='33%' alignItems={'center'}  >{member}</Flex>
                  <Flex alignItems={'center'} justifyContent='center' w='33%'>
                  <Input htmlSize={4} width='auto' />%
                  </Flex>
                  <Flex w='33%' alignItems={'center'} justifyContent='center' >{member} MATIC</Flex>
                  </Flex>
                ))
              }
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => null}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>

        </Flex>

      </>

    )
  }

  return (
    <>
      <Flex>
        Loading
      </Flex>
    </>
  )

}
