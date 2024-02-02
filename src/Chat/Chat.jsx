import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChatItem from '../ChatItem/ChatItem';
import '../style.css';
import MessageListHeader from '../MessageListHeader/MessageListHeader';
import MessageList from '../MessageList/MessageList';
import ChatInput from '../ChatInput/ChatInput';
import OpenAI from 'openai';
function Chat(props) {
  const { dataSource ,triggerScrollToBottom,setTriggerScrollToBottom, activeId,setActive,setChanges } = props;
  
  const MAX_NUM_MESSAGES = 50;
  const [messagesModel, setMessagesModel] = useState(dataSource);
  
  const next = () => {
    if (messagesModel.length <= MAX_NUM_MESSAGES) {
      setMessagesModel([
        ...messagesModel,
      ]);

    }
  };
  useEffect(()=>{
    if(dataSource.length!=0){

    setApiMessages(dataSource)
    }
  },[dataSource])  
  const system =  "Du bist ein Therapieunterstützungstool, das Gespräche mit Patienten oder Patientinnen führt. Diese Patienten oder Patientinnen weisen kognitive Verzerrung (nach Beck 1976) auf. Du versucht, bestmöglich auf die Aussagen im Sinne eines sokratischen Dialogs einzugehen. Achte dabei vor allem auf eine empathische und wertungsfreie Grundhaltung sowie auf therapeutische Qualitätsstandards im Sinne der kognitiven Umstrukturierung. Dadurch sollst du den dysfunktionalen Gedanken zu einem funktionalen Gedanken umstrukturieren. Duze dein Gegenüber und antworte knapp";
  const systemJson = { role: "system", content:  system  };
  
  const [messageToSend, setMessageToSend] = useState(null);
  const [apiMessages, setApiMessages] = useState([systemJson]);
  const [updated,setUpdated] =useState(true);

  
  
  const openai=new OpenAI({apiKey:"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", dangerouslyAllowBrowser: true});
  const submitMessage = async (message) => {
    //here generate response
    console.log("nsnasnn" +message)
    const completion = await openai.chat.completions.create({
      messages: apiMessages,
      model: "ft:gpt-3.5-turbo-1106:personal::8npObjkw",
      
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
  



  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false); setApiMessages([systemJson]);setUpdated(true)}
  const handleShow = () => setShow(true);


  const handleSubmit = () => {
    const date=new Date();
    const chat = { date, apiMessages };
    fetch('http://localhost:8000/chats/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chat)
    }).then(() => {
      console.log('new chat added ');
    });
    handleClose();
  }


  
  return (
    <div className="flex-1 d-flex flex-column">
      <div className="rounded-0 shadow">
        <MessageListHeader data={{ title: 'TheraBuddy', avatarUrl: '' }} handleShow={handleShow} handleClose={handleClose} show={show} handleSubmit={handleSubmit} />
      </div>
      <div className="message-list flex-1 mh-100 h-100 overflow-auto">
        <MessageList
          dataSource={apiMessages.slice(1)}
          triggerScrollToBottom={triggerScrollToBottom}
          channelId={activeId}
          next={next}
          hasMore={messagesModel.length <= MAX_NUM_MESSAGES}
        />
      </div>
      <ChatInput onSubmit={onSend} className="mx-3 mb-3" />
    </div>
  );
}

Chat.propTypes = {
  dataSource: PropTypes.arrayOf(ChatItem.propTypes.data),
  onItemClick: PropTypes.func,
  activeId: PropTypes.number,
};

Chat.defaultProps = {
  dataSource: [],
  onItemClick: null,
  activeId: null,
};

export default Chat;