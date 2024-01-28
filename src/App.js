import React, { useEffect, useState } from 'react';
import SideBar from '../src/SideBar/SideBar';
import SearchInput from '../src/SearchInput/SearchInput';
import ChatList from '../src/ChatList/ChatList';
import ChatInput from '../src/ChatInput/ChatInput';
import MessageList from '../src/MessageList/MessageList';
import MessageListHeader from '../src/MessageListHeader/MessageListHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './style.css';
import OpenAI from 'openai';
import Chat from './Chat/Chat';

function App() {

  const [activeChannelId, setActiveChannelId] = useState(0);

  const [triggerScrollToBottom, setTriggerScrollToBottom] = useState(false);

  const onItemClick = (id) => {
    setActiveChannelId(id);
    setTriggerScrollToBottom(!triggerScrollToBottom);
  };

  const [dataSource, setDataSource] = useState([]);



  const [channelsModel, setchanelsModel] = useState([]);






  // API stuff


  return (
    <div className="main-div">
      <div className="d-flex flex-row  w-100 h-100 card shadow">
        <div className="chat-list">
          <SideBar
            top={
              <SearchInput />
            }
            center={(
              <ChatList
                dataSource={channelsModel}
                onItemClick={onItemClick}
                activeId={activeChannelId}
              />
            )}
          />
        </div>
        <Chat activeId={activeChannelId} triggerScrollToBottom={triggerScrollToBottom} setTriggerScrollToBottom={setTriggerScrollToBottom} dataSource={dataSource} />
      </div>

    </div>
  );
}

export default App;
