import React, { useEffect, useState } from 'react'

import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
  Icon,
} from 'semantic-ui-react'
import { ChatState } from '../../context/ChatProvider';


const ProfileModal = ({user}) => {
  const [open, setOpen] = React.useState(false);
  const [loggedUser, setloggedUser] = useState([]);
  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
  },[])
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<button className='underline'>Profile </button>}
    >
      <ModalHeader>Select a Photo</ModalHeader>
      <ModalContent image>
        <Image size="medium" src={user.pic} wrapped rounded alt={ user.name} />
        {loggedUser.name==user.name?<Icon name="edit" size="large" />:null}
        <ModalDescription className='text-center content-center'>
          <Header>
            <h2 className='text-6xl'>{user.name}</h2>
          </Header>

          <p className='text-3xl'>{user.email}</p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={() => setOpen(false)}>
          cancel
        </Button>
        {loggedUser.name==user.name?<Button
          content="Save changes"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />:null}
      </ModalActions>
    </Modal>
  );
  
}

export default ProfileModal
