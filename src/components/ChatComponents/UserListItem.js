import React from 'react'
import { ChatState } from '../../context/ChatProvider';

const UserListItem = ({ user,handleFunction }) => {
    
    return (
      <div onClick={handleFunction} className="flex mb-4 border p-2 shadow-lg space-x-2">
        <div>
          <img src={user.pic} className="rounded-full" width={40}/>
        </div>
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
      </div>
    );
};

export default UserListItem

