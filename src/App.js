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
import useFetch from './useFetch';

function App() {

  const [activeChannelId, setActiveChannelId] = useState(0);

  const [triggerScrollToBottom, setTriggerScrollToBottom] = useState(false);

  const onItemClick = (id) => {
    setActiveChannelId(id);
    console.log("jsjs"+id);
    setTriggerScrollToBottom(!triggerScrollToBottom);
  };
  const system =  "Du bist ein Therapieunterstützungstool, das Gespräche mit Patienten oder Patientinnen führt. Diese Patienten oder Patientinnen weisen kognitive Verzerrung (nach Beck 1976) auf. Du versucht, bestmöglich auf die Aussagen im Sinne eines sokratischen Dialogs einzugehen. Achte dabei vor allem auf eine empathische und wertungsfreie Grundhaltung sowie auf therapeutische Qualitätsstandards im Sinne der kognitiven Umstrukturierung. Dadurch sollst du den dysfunktionalen Gedanken zu einem funktionalen Gedanken umstrukturieren. Duze dein Gegenüber und antworte knapp";
  const systemJson = { role: "system", content:  system  };
  useEffect(()=>{
    if(activeChannelId==0){
      setDataSource([systemJson]);
      return;
    }
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].id === activeChannelId) {
        console.log("found it")
        setDataSource(chats[i].apiMessages) // Return the matching object
      }
    }
    console.log(dataSource)
  }
    ,[activeChannelId]);

  const [dataSource, setDataSource] = useState([]);


  
  const [channelsModel, setchanelsModel] = useState([]);


  const {data : chats,isPending,error}=useFetch('http://localhost:8000/chats');




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
                dataSource={chats}
                onItemClick={onItemClick}
                activeId={activeChannelId}
              />
            )}
          />
        </div>
        <Chat setActive={setActiveChannelId} activeId={activeChannelId} triggerScrollToBottom={triggerScrollToBottom} setTriggerScrollToBottom={setTriggerScrollToBottom} dataSource={dataSource} />
      </div>

    </div>
  );
}

export default App;
