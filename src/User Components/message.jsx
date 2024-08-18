import React from 'react';

const Message = () =>  {
  return (
    <div className="flex bg-gray-100 h-[580px] rounded-lg">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-[#f5e2dc] flex flex-col items-center justify-center h-[530px] rounded-lg w-[1100px]">
          <h2 className="text-2xl font-semibold text-gray-700">Message</h2>
          <div className='h-[2px] w-[100px] bg-gray-700 mt-2 mb-4'></div>
          <div className="flex items-center justify-center p-4 rounded-full bg-orange-300">
            <img src="src\User Components\msg.png" alt="Boîte de message" className="w-24 h-24" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-700">Vous n’avez aucun message</h3>
          <p className="mt-2 text-sm text-gray-600">
            Tous les messages que nous vous enverrons seront affichés ici. Restez connecté
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;