import React,{ useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { XIcon } from 'lucide-react';

function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore();
    //When hit ESC key close the chat header
    useEffect(() => {
        const handleEscKey = (event) => {
            if(event.key === "Escape") setSelectedUser(null);
        }
        window.addEventListener("keydown", handleEscKey);

        //cleanup
        return () => window.removeEventListener("keydown", handleEscKey);
    },[setSelectedUser]);

    return (
        <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-6 flex-1">
            <div className="flex items-center space-x-3 my-3">
                <div className="avatar online">
                    <div className="size-10 rounded-full">
                        <img src={selectedUser.profilePic || "./avatar.png"} alt={selectedUser.fullName}/>
                    </div>
                </div>
                <div>
                    <h3 className="text-slate-200 text-md ">
                        {selectedUser.fullName}
                    </h3>
                    <p className="text-slate-400 text-xs">Online</p>
                </div>
            </div>
            <button onClick={() => setSelectedUser(null)}>
                <XIcon className="size-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"/>
            </button>
        </div>
    )
}

export default ChatHeader
