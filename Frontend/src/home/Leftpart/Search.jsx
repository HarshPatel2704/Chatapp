import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import userGetAllUsers from '../../context/userGetAllUsers';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

function Search() {
  const [search , setSearch] = useState("");
  const [allUsers] = userGetAllUsers();
  const {setSelectedConversation} = useConversation();

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!search) return;
    const conversatin =allUsers.find((user)=>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
  );
    if(conversatin)
      {
        setSelectedConversation(conversatin);
        setSearch("");
      }else{
        toast.error("User not found");
        setSearch("");
      }
  }

  return (
    <div className="h-[10vh]">
      <div className="px-6 py-4">
      <form onSubmit={handleSubmit}>
        <div className='flex space-x-3'>
        <label className="border-[1px] border-gray-700 bg-slate-900 p-2 rounded-lg flex items-center gap-2 w-[80%]">
            <input type="text" className="grow outline-none bg-transparent" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search" />
        </label>
        <button>
        <FaSearch  className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300"/>
        </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Search
