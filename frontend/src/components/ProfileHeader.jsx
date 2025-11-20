import React, { useState, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore';
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from 'lucide-react';
const mouseClickSound = new Audio('/sounds/mouse-click.mp3');

function ProfileHeader() {
    const {logout, authUser, updateProfile } = useAuthStore();
    const { isSoundEnabled, toggleSound} = useChatStore();
    const [selectImg, setSelectImg] = useState(null);

    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if(!file) return;

        // Convert image file to base64 string
        const reader = new FileReader();
        reader.readAsDataURL(file);

        // When the file is loaded, set the base64 string to state
        reader.onloadend = async () => {
            const base64Image = reader.result;
            setSelectImg(base64Image);
            // Update profile picture in the backend
            await updateProfile ({ profilePic: base64Image });
        }
    }
    return(
        <div className="p-4 border-b border-slate-700/50">
            <div className="flex item-center justify-between">
                <div className="flex items-center gap-3">
                    
                    {/* Avatar */}
                    <div className="avatar online">
                        <button 
                            className="size-12 rounded-full overflow-hidden relative group"
                            onClick = {() => fileInputRef.current.click()}
                        >
                            <img src = {selectImg || authUser.profilePic || "/avatar.png"} 
                            alt = "User image"
                            className="size-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-xs text-white">Change</span>
                            </div>
                        </button>
                        <input 
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>

                    {/* Username and online text */}
                    <div>
                        <h3 className="text-slate-200 text-sm text-base max-w-[150px] truncate">
                            {authUser.fullName}
                        </h3>
                        <p className="text-xs text-slate-400">
                            Online
                        </p>
                    </div>
                </div>

                {/* Sound Toggle and logout */}
                <div className="flex gap-4 items-center">
                    <button 
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        onClick={() => logout()}
                        >
                        <LogOutIcon className="size-4" />
                    </button>

                    <button 
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        onClick={() => {
                            mouseClickSound.currentTime = 0;
                            mouseClickSound.play().catch((error) => console.log("Audio play Failed: ", error));
                            toggleSound();
                        }}
                    >
                        {isSoundEnabled ? (
                            <Volume2Icon className="size-4"/>
                        ): (
                            <VolumeOffIcon className="size-4"/>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
