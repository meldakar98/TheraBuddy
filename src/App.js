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

function App() {
  const MAX_NUM_MESSAGES = 50;
  const [initialMessages, setInitialMessages] = useState([]);
  const [messagesToAppend, setmessagesToAppend] = useState([]);
  const [activeChannelId, setActiveChannelId] = useState(0);
  const [triggerScrollToBottom, setTriggerScrollToBottom] = useState(false);
  const [messagesModel, setMessagesModel] = useState(initialMessages);



  const onItemClick = (id) => {
    setActiveChannelId(id);
    setTriggerScrollToBottom(!triggerScrollToBottom);
  };



  const next = () => {
    if (messagesModel.length <= MAX_NUM_MESSAGES) {
      setMessagesModel([
        ...messagesToAppend,
        ...messagesModel,
      ]);

    }
  };

  const [channelsModel, setchanelsModel] = useState([]);






  // API stuff

  const system = "Here goes system";
  const systemJson = { "role": "system", "content":  system  };

  const [messageToSend, setMessageToSend] = useState(null);
  const [apiMessages, setApiMessages] = useState([systemJson]);



  const submitMessage = (message) => {
    setMessagesModel([
      ...messagesModel,
      {
        isMe: false,
        message,
      },
    ]);

    setTriggerScrollToBottom(!triggerScrollToBottom);
  };

  useEffect(() => {
    if (messageToSend) {

      submitMessage(messageToSend.message);
      console.log(messagesModel);
      console.log("hey" + { messageToSend });

    }

  }, [messageToSend])

  const onSend = (message) => {
    setMessagesModel([
      ...messagesModel,
      {
        isMe: true,
        message,
      },
    ]);

    setMessageToSend({
      isMe: true,
      message,
    });

    setApiMessages(
      [
        ...apiMessages,
        {
          "role": "user",
          "content": message.message,
        },
      ]
    )


    setTriggerScrollToBottom(!triggerScrollToBottom);
  };
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
        <div className="flex-1 d-flex flex-column">
          <div className="rounded-0 shadow">
            <MessageListHeader data={{ title: 'Channel Name', avatarUrl: '' }} />
          </div>
          <div className="message-list flex-1 mh-100 h-100 overflow-auto">
            <MessageList
              dataSource={messagesModel}
              triggerScrollToBottom={triggerScrollToBottom}
              channelId={activeChannelId}
              next={next}
              hasMore={messagesModel.length <= MAX_NUM_MESSAGES}
            />
          </div>
          <ChatInput onSubmit={onSend} className="mx-3 mb-3" />
        </div>
      </div>

    </div>
  );
}

export default App;
