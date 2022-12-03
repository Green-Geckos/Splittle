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
  Select,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import '@fontsource/poppins/700.css'

const test = {
  "groups": {
    "0": {
      "groupId": 0,
      "groupName": "bhai",
      "members": [
        "0x00",
        "0x02",
        "0x01"
      ],
      "userBalancesData": {
        "0x00": 0,
        "0x02": -10,
        "0x01": 30
      },
      "expenses": [
        {
          "title": "jungle",
          "amountPaidByUser": 100
        },
        {
          "title": "0x02 and 0x00 settlement",
          "amountPaidByUser": 0
        }
      ]
    }, "1": {
      "groupId": 1,
      "groupName": "test 2",
      "members": [
        "0x003",
        "0x023",
        "0x014"
      ],
      "userBalancesData": {
        "0x003": 100,
        "0x02435": -10,
        "0x0135": 300
      },
      "expenses": [
        {
          "title": "jungle",
          "amountPaidByUser": 100
        },
        {
          "title": "0x02 and 0x00 settlement",
          "amountPaidByUser": 0
        }
      ]

    },
  },

}

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
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [paidBy, setPaidBy] = useState({})
  const [splitBetween, setSplitBetween] = useState({})
  const [expenseName, setExpenseName] = useState('')
  const [createExpenseError, setCreateExpenseError] = useState(false)
  const [selectedGroupName, setSelectedGroupName] = useState('')



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
    }
  }

  const handleCreateExpense = () => {
    if (expenseName.length !== 0 && totalAmount !== 0 && Object.keys(paidBy).length !== 0 && Object.keys(splitBetween).length !== 0) {
      // Add data sent to backend
      setExpenseName('')
      setTotalAmount(0)
      setPaidBy({})
      setSplitBetween({})
      setCreateExpenseError(false)
      onAddExpensesClose()
    } else {
      setCreateExpenseError(true)
    }
  }


  const handleSettle = () => {
    console.log('settled')
  }

  if (mounted) {
    return (
      <>
        <Flex flexDirection={'column'} fontFamily={'poppins.700'} h='100vh' w='100vw'>
          <Flex w='100%' h={'80px'} bg='brand.purple' >
            <Flex w='100%' float={'left'} />
            <Flex h='100%' alignItems={'center'} float={'right'} mr={4} >


              <Button mr={4} onClick={onNewGroupOpen} leftIcon={<AddIcon />} colorScheme='teal' variant='solid' size={'sm'} >
                New Group
              </Button>
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
                {Object.keys(test.groups).map((groupId) => (
                  <>
                    <ListItem _hover={{
                      background: 'black',
                      color: 'white'
                    }}
                      backgroundColor={selectedGroupName == groupId ? 'black' : null}
                      color={selectedGroupName !== groupId ? 'black' : 'white'}
                      borderRadius='8px' p={1} cursor={'pointer'} onClick={() => setSelectedGroupName(groupId)} >
                      {test.groups[groupId]['groupName']}
                    </ListItem>
                    <Divider />
                  </>

                ))}

              </List>
            </Flex>
            <Flex flexDir={'column'} p={2} overflow={'auto'} w='100%' h='95%' maxH="calc(100vh - 80px)" m={2} bg='white' borderRadius={'15px'}>
              {
                selectedGroupName ? (
                  <Flex flexDir={'column'}>
                    <Flex flexDir={'column'}  >
                      <Flex fontWeight='bold'>
                        Members:

                      </Flex>
                      <List>
                        {test.groups[selectedGroupName]["members"].map((member) => (
                          <ListItem>{member}</ListItem>
                        ))}

                      </List>
                    </Flex>

                    <Flex flexDirection={'column'}>
                      <Flex fontWeight='bold'>
                        Balances:

                      </Flex>

                      <Flex alignItems={'center'} w='100%' mt={2} >
                        <List w='100%' >
                          {
                            Object.keys(test.groups[selectedGroupName]['userBalancesData']).map((users) => (
                              <ListItem w='95%' key={users}>
                                <Flex alignItems={'center'} justifyContent={'space-between'} m={2} p={2} borderRadius={'15px'}  w='100%' bg='gray.100'  >
                                  <Flex flexDir={'column'}>
                              <Flex>
                                User: {users}

                              </Flex>
                              <Flex flexDir={'column'}>
                                Amount owed: {test.groups[selectedGroupName]['userBalancesData'][users]}
                              </Flex>

                                  </Flex>

                            <Button onClick={handleSettle} colorScheme={'teal'} >Settle</Button>

                            </Flex>
                                </ListItem>
                            ))
                          }

                        </List>
                      </Flex>

                    </Flex>
                    <Flex flexDir={'column'}>
                      <Flex fontWeight={'bold'} >
                        Transactions:
                      </Flex>
                      <Flex flexDir={'column'}>
                        {
                          test.groups[selectedGroupName]['expenses'].map((transactions) => (
                            <Flex m={2} p={1} borderRadius={'15px'} flexDir={'column'} w='95%' bg='gray.100'  >
                              <Flex>
                                Expenses Description: {transactions.title}

                              </Flex>
                              <Flex flexDir={'column'}>
                                Amount: {transactions.amountPaidByUser}
                              </Flex>


                            </Flex>

                          ))}

                      </Flex>
                            <Flex minH='40px'></Flex>

                    </Flex>


                  </Flex>
                ) : (
                  <Flex>Create or Select a Group</Flex>
                )
              }
            </Flex>

            {/* Add Expenses */}
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
                    <Select onChange={(event) => setSelectedGroupId(event.target.value)} value={selectedGroupId} placeholder='Choose Group' m={2} >
                      {Object.keys(test.groups).map((groupId) => (
                        <option value={groupId}>{test.groups[groupId]['groupName']}</option>

                      ))}
                    </Select>
                  </Flex>
                  {selectedGroupId.length > 0 ? (
                    <>
                      <Input variant='flushed' placeholder='Expense Description' m={2} mb={4} onChange={(event) => setExpenseName(event.target.value)} />
                      <Flex>
                        <Flex alignItems={'center'} fontWeight={'bold'} mb={4} >Total Amount:</Flex>
                        <Flex alignItems='center' >

                          <Input mr={2} onChange={(event) => setTotalAmount(event.target.value)} type='number' htmlSize={4} width='auto' ml={2} />
                        </Flex>

                        <Flex alignItems='center' >MATIC</Flex>
                      </Flex>
                      <Flex fontWeight={'bold'} >Paid by:</Flex>
                      <Flex flexDir={'column'}>
                        {
                          test.groups[selectedGroupId]['members'].map((member) => (
                            <Flex key={member} w='100%' m={2} >
                              {/* Paid By */}
                              <Flex w='33%' alignItems={'center'} >{member}</Flex>
                              <Flex alignItems={'center'} w='33%'>
                                <Input mr={2} type='number' htmlSize={4} width='auto' onChange={(event) => {
                                  paidBy[member] = event.target.value
                                }} value={paidBy[member]} />
                                <Flex>%</Flex>

                              </Flex>
                              {/* <Flex w='33%' alignItems={'center'} justifyContent='center' >{paidBy[member]*totalAmount} MATIC</Flex> */}
                            </Flex>
                          ))
                        }
                      </Flex>
                      <Flex mt={4} fontWeight={'bold'}>Split Between:</Flex>
                      <Flex flexDir={'column'}>
                        {
                          test.groups[selectedGroupId]['members'].map((member) => (
                            <Flex key={member} w='100%' m={2} >
                              {/* Split Between */}
                              <Flex w='33%' alignItems={'center'}>{member}</Flex>
                              <Flex alignItems={'center'} justifyContent='center' w='33%'>
                                <Input mr={2} type='number' htmlSize={4} width='auto' onChange={(event) => {
                                  splitBetween[member] = event.target.value
                                }} value={splitBetween[member]} />
                                <Flex>%</Flex>
                              </Flex>
                              {/* <Flex w='33%' alignItems={'center'} justifyContent='center' >{paidBy[member] ? paidBy[member] : 0} MATIC</Flex> */}
                            </Flex>
                          ))
                        }
                      </Flex>
                    </>
                  ) : null}
                </ModalBody>

                <ModalFooter>
                  <Flex w='100%' justifyContent='center' flexDir={'column'} >
                    {createExpenseError ? (
                      <Flex w='100%' justifyContent='center' color={'red'}>Fill in all the details</Flex>
                    ) : null}
                    <Button colorScheme='blue' mr={3} onClick={handleCreateExpense}>
                      Create Expense
                    </Button>

                  </Flex>
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
      <div>
        Loading


      </div>


    </>
  )

}