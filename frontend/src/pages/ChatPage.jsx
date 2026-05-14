import React from 'react'
import BorderAnimatedComponent from '../components/BorderAnimatedComponent';
import ProfileHeader from '../components/ProfileHeader';
import ActivetabSwitch from '../components/ActivetabSwitch';
import ChatsList from '../components/ChatsList';
import ContactList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder';
import { useChatStore } from '../store/useChatStore';

function ChatPage() {

  const {activeTab , selectedUser} = useChatStore();
  
  return (
    <div className='relative w-full max-w-6xl h-[800px]'>
       <BorderAnimatedComponent>
            {/* LEFT SIDE */}
            <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
               <ProfileHeader/>
               <ActivetabSwitch/>

               <div className="flex-1 overflow-y-auto p-4 space-y-2">
                   {
                     activeTab === "chats" ? <ChatsList/> : <ContactList/>
                   }
               </div>
            </div>

            {/* Right Side */}

            <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
                {
                  selectedUser ? <ChatContainer/> : <NoConversationPlaceholder/>
                }
            </div>
       </BorderAnimatedComponent>
    </div>
    
  )
}

export default ChatPage
