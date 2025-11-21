import React from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceHolder from "../components/NoConversationPlaceHolder";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from "lucide-react";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const { isUpdatingProfile } = useAuthStore();

  return (
    <div className="relative w-full max-w-6xl lg:h-[590px] h-[calc(100vh-2rem)]">
      <BorderAnimatedContainer>
        {/* Left Side */}
        <div
          className={`bg-slate-800/50 backdrop-blur-sm flex flex-col ${
            selectedUser ? "hidden lg:flex" : "w-full"
          } lg:w-80`}
        >
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* Right Side */}
        <div
          className={`flex-col bg-slate-900/50 backdrop-blur-sm ${
            selectedUser ? "w-full flex" : "hidden lg:flex"
          } lg:flex-1`}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceHolder />}
        </div>
        {isUpdatingProfile && (
          <div className="absolute inset-0 bg-black/50 flex justify-center items-center z-50">
            <LoaderIcon className="w-12 h-12 animate-spin text-white" />
          </div>
        )}
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
