"use client";
import { useVoice } from "@humeai/voice-react";
import { useState, useEffect, useRef } from "react";

export default function Messages() {
  const { messages } = useVoice();
  const messagesRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const [messageLog, setMessageLog] = useState([]);

  // console.log("Messages from Hume:", messages);
  // useEffect(() => {
  //   // console.log("Testing useeffect");
  //   if (messages.length > 0) {
  //     setMessageLog((prevLog) => [...prevLog, ...messages.slice(prevLog.length)]);
  //   }
  //   // console.log("Total messages:", messageLog.length);
  //   // console.log(messageLog[messageLog.length-1]);
  //   // Once the messages length hits 10, send a POST request to the Python server
  //   if (messageLog.length === 5) {
  //     // Make sure your Python server is running at localhost:5000

  //     const temp_data = "hello"
  //     console.log("sending to llm server")
  //     fetch("https://localhost:5000/messages", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(messageLog),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Response from Python server:", data);
  //       })
  //       .catch((error) => {
  //         console.error("Error sending messages to server:", error);
  //       });
  //   }
  // }, [messages]);


  useEffect(() => {
    if (messages.length > 0) {
      setMessageLog((prevLog) => [...prevLog,...messages.slice(prevLog.length)]);
    }
  }, [messages]);





  
  // Fetch when messageLog >= 5
  useEffect(() => {
    if (messageLog.length == 20) {
      console.log("sending to llm server");
      fetch("http://127.0.0.1:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageLog),
      })
        // .then((response) => response.json())
        .then((response) => {
          console.log("Status:", response.status)
          return response.json()
        })
        .then((data) => console.log("Server response:", data))
        .catch((error) => console.error("Error:", error));
    }
  }, [messageLog]);


//   useEffect(() => {
//   if (messages.length > 0) {
//     const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2));
//     const downloadAnchorNode = document.createElement('a');
//     downloadAnchorNode.setAttribute("href", dataStr);
//     downloadAnchorNode.setAttribute("download", "messages.json");
//     document.body.appendChild(downloadAnchorNode); // Required for Firefox
//     downloadAnchorNode.click();
//     downloadAnchorNode.remove();
//   }
// }, [messages]); 

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="w-[80vw] h-[80vh] flex flex-col bg-gradient-to-br from-white-50 to-white-100 rounded-lg overflow-hidden">
        {/* Message Panel */}
        <div
          ref={messagesRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {messages.map((msg, index) => {
            if (!msg || !msg.message || !msg.message.content) return null;
  
            const isUserMessage = msg.type === "user_message";
            const messageClass = isUserMessage
              ? "bg-gradient-to-r from-red-100 to-red-200 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-none self-end border-2 border-rose-300"
              : "bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-none self-start border-2 border-blue-300";
            const icon = isUserMessage ? "👤" : "🤖";
  
            return (
              <div key={index} className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}>
                {/* Icon for AI, comes before the message */}
                {!isUserMessage && (
                  <div className="w-12 h-12 mr-3 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg">
                    <span className="text-xl">{icon}</span>
                  </div>
                )}
  
                {/* Message Content Box */}
                <div className={`max-w-[70%] p-4 ${messageClass} shadow-lg rounded-lg`}>
                  <p className="text-sm">{msg.message.content}</p>
                </div>
  
                {/* Icon for User, comes after the message */}
                {isUserMessage && (
                  <div className="w-12 h-12 ml-3 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg">
                    <span className="text-xl">{icon}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* <pre className="bg-gray-100 p-4 mt-2 text-xs overflow-x-auto">
        {JSON.stringify(messageLog, null, 2)}
      </pre>  */}

       {/* Custom Scrollbar Styles */}
       <style jsx>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #6b7280;
          border-radius: 8px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #4b5563;
        }
        ::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
      `}</style>
    </div>
    </div>
  );
};

