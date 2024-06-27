import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessages from '../../context/useSendMessage';

function Typesend() {
  const [message, setMessage] = useState("")
  const {loading,sendMessages} = useSendMessages();

  const handleSubmit = async(e)=>{
    console.log(e)
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh] bg-gray-800">
        <div className="w-[70%] mx-4">
            <input type="text" placeholder="Type here" value={message} onChange={(e)=>setMessage(e.target.value)} className="border border-gray-700 outline-none bg-black mt-1 rounded-xl px-4 py-3 w-full" />
        </div>
         <button>
            <IoSend className="text-3xl"/>
        </button>
    </div>
    </form>
  )
}

export default Typesend
