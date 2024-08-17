import React from 'react';
import { useNavigate } from 'react-router-dom';

const Commande = () => {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');   };
    return (
        <div className=" bg-gray-100 flex flex-col items-center p-4 w-[1160px] rounded-[20px] h-[700px]">
          <header className="w-full flex justify-between items-center p-4 bg-white shadow-md rounded-[5px]">
            <div className="text-orange-600 text-xl font-bold">Nom-Site</div>
            <div className="flex items-center space-x-4">
              <div className="relative">
              <div style={{ marginTop: '0px' , marginLeft: '180px'  }} className="  text-2xl">

🛒
</div>
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </div>
            </div>
          </header>
    
          <main className="flex-grow flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center mt-8 w-[1120px]">
            <div style={{ marginTop: '-8px' , marginLeft: '16px'  }} className="  text-6xl">

🛒
</div>
              <h2 className="text-xl font-semibold text-gray-800 mt-4">Votre panier est vide !</h2>
              <p className="text-gray-600 mt-2">
                Parcourez nos catégories et découvrez nos meilleures offres!
              </p>
              <button className="bg-orange-500 text-white rounded-full px-4 py-2 mt-6 hover:bg-orange-600" onClick={handleClick}>
                Commencer vos achats
              </button>
            </div>
    
            <div className="w-full mt-8">
           
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Les plus demandés</h3>
              <div className="bg-white p-4 rounded-lg shadow-lg grid grid-cols-3 gap-4">
             
                <div className="flex flex-col items-center">
                  <img src="/path/to/item1.png" alt="Item 1" className="h-24" />
                  <span className="text-gray-600 mt-2">Item 1</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/path/to/item2.png" alt="Item 2" className="h-24" />
                  <span className="text-gray-600 mt-2">Item 2</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/path/to/item3.png" alt="Item 3" className="h-24" />
                  <span className="text-gray-600 mt-2">Item 3</span>
                </div>
                {/* Add more items here */}
                <button className="text-orange-500 bg-transparent w-[115px] ml-[978px]">Voir Plus <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mt-[-19px] ml-[76px]" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
</svg></button>
              </div>
             {/*  <div className="text-right mt-4">
                
              </div> */}
            </div>
          </main>
        </div>
      );
    };
    
    

export default Commande;
