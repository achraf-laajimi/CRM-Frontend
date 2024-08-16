import React from 'react'

function Help() {
  return (
    <div className='bg-red-300 rounded-[25px]'>
      <main className="flex-1 p-8 w-[1190px] h-[580px] bg-[#f5e2dc] rounded-[25px]">
  <h2 className="text-xl font-semibold text-gray-800">Centre d'assistance</h2>
  <p className="mt-3 text-2xl font-bold">Salut, comment pouvons-nous vous aider ?</p>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
    <div
      onClick={() => navigate("/order")}
      className="bg-white p-4 rounded-[20px]   shadow-md hover:shadow-lg  cursor-pointer flex items-center  h-[120px]"
    >
      <div className=" font-bold text-gray-700 text-l">Passer Une Commande</div>
      <div className="ml-auto text-6xl">
                {/* Icon for Order */}
                🛒
              </div>
    </div>
    <div
      onClick={() => navigate("/pay")}
      className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg  cursor-pointer flex items-center"
    >
      <div className="font-bold text-gray-700 text-l">Payer</div>
      <div className="ml-auto text-6xl -mt-5">
                {/* Icon for Pay */}
                💳
              </div>
    </div>
    <div
      onClick={() => navigate("/track")}
      className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg  cursor-pointer flex items-center"
    >
      <div className="font-bold text-gray-700 text-l">Suivre Votre Colis</div>
      <div className="ml-auto text-6xl">
                {/* Icon for Track */}
                📦
              </div>
    </div>
    <div
      onClick={() => navigate("/cancel")}
      className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg  cursor-pointer flex items-center  h-[120px] mt-9"
    >
      <div className="font-bold text-gray-700 text-l">Annuler Des Commandes</div>
      <div className="ml-auto text-6xl">
                {/* Icon for Cancel */}
                ❌
              </div>
    </div>
    <div
      onClick={() => navigate("/return")}
      className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg cursor-pointer flex items-center mt-9"
    >
      <div className="font-bold text-gray-700 text-l">Faire Un Retour</div>
      <div className="ml-auto text-6xl">
                {/* Icon for Return */}
                🔄
              </div>
    </div>
  </div>

  <div className="mt-60px flex justify-end">
    <button className="bg-[#ff6b35] text-white rounded-full px-6 py-3 flex items-center shadow-md hover:bg-[#ff5a1f]">
      <span>Discutez avec nous</span>
      <div className="ml-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='stroke' viewBox="0 0 16 16">
  <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
  <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
</svg>
      </div>
    </button>
  </div>
</main>

    </div>
  )
}

export default Help