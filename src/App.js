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

  const system = "Du bist ein Therapieunterstützungstool, das Gespräche mit Patienten oder Patientinnen führt. Diese Patienten oder Patientinnen weisen kognitive Verzerrungen (Beck 1976) auf. Du versuchst, bestmöglich auf die Aussagen des Patienten oder der Patientin im Sinne eines sokratischen Dialogs einzugehen. Achtest dabei vor allem auf eine empathische und wertungsfreie Grundhaltung sowie auf therapeutische Qualitätsstandards im Sinne der kognitiven Umstrukturierung. Dadurch sollst du den dysfunktionalen Gedanken zu einem funktionalen Gedanken umstrukturieren";
  const systemJson = { role: "system", content:  system  };

  const [messageToSend, setMessageToSend] = useState(null);
  const [apiMessages, setApiMessages] = useState([systemJson]);

  
  const openai=new OpenAI({apiKey:"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", dangerouslyAllowBrowser: true});
  const submitMessage = async (message) => {
    //here generate response
    console.log("nsnasnn" +message)
    const completion = await openai.chat.completions.create({
      messages: apiMessages,
      model: "ft:gpt-3.5-turbo-1106:personal::8hjMR5gH",
    });
    setMessagesModel([
      ...messagesModel,
      {
        isMe: false,
        message:completion.choices[0].message.content,
      },
    ]);
    setApiMessages(
      [
        ...apiMessages,
        {
          role: "assistant",
          content: completion.choices[0].message.content,
        },
      ]
    );

    setTriggerScrollToBottom(!triggerScrollToBottom);
  };
  useEffect(()=>{
    console.log("Here I AAAAm \n");
    console.log(messagesModel);
    console.log("API");
    console.log(apiMessages);
  },[messagesModel])

  useEffect(() => {
    if (messageToSend) {

      submitMessage(messageToSend.message);
      console.log("hey" +  messageToSend.message );

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
          role: "user",
          content: message,
        },
      ]
    );


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
            <MessageListHeader data={{ title: 'TheraBuddy', avatarUrl: '' }} />
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
