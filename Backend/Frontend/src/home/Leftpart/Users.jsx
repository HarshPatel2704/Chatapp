import React from 'react'
import User1 from './User1'
import userGetAllUsers from '../../context/userGetAllUsers'

function Users() {
  const [allUsers,loading]=userGetAllUsers();
  console.log(allUsers);
  return (
    <div>
      <h1 className='px-8 py-2 text-white font-semibold bg-slate-800 rounded-md'>Message</h1>
      <div className="py-2 flex1 overflow-y-auto" style={{maxHeight:"calc(84vh - 10vh)"}}>
        {allUsers.map((user,index)=>(
          <User1 key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;