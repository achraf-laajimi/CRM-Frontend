import React from 'react';

const messages = [
  {
    id: 1,
    name: 'Alaa Mohamed',
    message: "Aya toll alina , ow khali l'affariettes alina",
  },
  {
    id: 2,
    name: 'Taha Mabrouk',
    message: 'Maa spider el ankabout 3ouroudh men ghir 7oudoud , lew konti bet7eibini esme3i meni tiririri',
  },
  {
    id: 3,
    name: 'Jasser Faleh',
    message: 'owwwwwwwwwwwww , satalatataaaaaaa',
  },
  {
    id: 4,
    name: 'Aziz Hwass',
    message: 'ye douda ye douda , yarak fi west dar m3ebye bsyouda',
  },
];

const MessageItem = ({ name, message, imgSrc }) => (
  <div className="bg-[#fff] p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
    <div className="flex items-center">
      <img 
        src={imgSrc} 
        alt={name} 
        className="w-10 h-10 rounded-full mr-4"
      />
      <div>
        <p className="font-semibold text-black">{name}</p>
        <p className="text-sm text-gray-700">{message}</p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <span className="material-icons text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg>
      </span>
      <span className="material-icons text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
        </svg>
      </span>
      <span className="material-icons text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
      </span>
    </div>
  </div>
);
const Messages = () => {
  return (
    <div className=" mx-auto bg-[#f5e2dc] p-6 rounded-lg h-[580px] w-[1180px]">
      <h2 className="text-2xl font-bold mb-4 ">Messages</h2>
      {messages.map((msg) => (
        <MessageItem key={msg.id} name={msg.name} message={msg.message} />
      ))}
    </div>
  );
};

export default Messages;