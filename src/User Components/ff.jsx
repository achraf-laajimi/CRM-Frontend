import React, { useState } from "react";

const ShoppingCart = () => {
  // Define the initial quantities for the products
  const [quantities, setQuantities] = useState({
    product1: 1,
    product2: 2,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gérer l'affichage du modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle increment
  const incrementQuantity = (product) => {
    setQuantities((prev) => ({
      ...prev,
      [product]: prev[product] + 1,
    }));
  };

  // Handle decrement
  const decrementQuantity = (product) => {
    setQuantities((prev) => ({
      ...prev,
      [product]: Math.max(prev[product] - 1, 1), // Prevent quantity from going below 1
    }));
  };

  return (
    <div className="bg-gray-100 p-4 min-h-screen w-[1160px] rounded-[20px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center bg-white p-4 shadow mb-4 rounded-[20px]">
          <div className="flex items-center">
            <div className="text-orange-500 text-2xl font-bold">Nom-Site</div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div
                style={{ marginTop: "0px", marginLeft: "180px" }}
                className="text-2xl"
              >
                🛒
              </div>
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </div>
          </div>
        </div>

        <div className="flex ">
          <div className="w-3/4">
            <div className="bg-white p-4 rounded-[20px] shadow">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h2 className="text-xl font-bold">Panier (2)</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4  h-[101px]">
                  <img
                    src="product1.jpg"
                    alt="product"
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-gray-800">
                      Product 1 Description
                    </div>
                    <div className="text-sm text-gray-500">
                      Quelques articles restants
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-500 font-bold">45.00 TND</div>
                    <div className="text-sm text-gray-400 line-through">
                      75.00 TND
                    </div>
                    <div className="text-sm text-red-500">-37%</div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => decrementQuantity("product1")}
                      className="px-2 py-1 bg-gray-200 text-gray-600 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{quantities.product1}</span>
                    <button
                      onClick={() => incrementQuantity("product1")}
                      className="px-2 py-1 bg-orange-500 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                  <button className="text-orange-500 bg-transparent mt-[123px]"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
                    SUPPRIMER
                  </button>
                </div>

                <div className="flex items-center space-x-4 h-[191px]">
                  <img
                    src="product2.jpg"
                    alt="product"
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-gray-800">
                      Product 2 Description
                    </div>
                    <div className="text-sm text-gray-500">
                      2 articles seulement
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-500 font-bold">29.00 TND</div>
                    <div className="text-sm text-gray-400 line-through">
                      35.00 TND
                    </div>
                    <div className="text-sm text-red-500">-20%</div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => decrementQuantity("product2")}
                      className="px-2 py-1 bg-gray-200 text-gray-600 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{quantities.product2}</span>
                    <button
                      onClick={() => incrementQuantity("product2")}
                      className="px-2 py-1 bg-orange-500 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                  <button className="text-orange-500 bg-transparent  mt-[123px]"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg>
                    SUPPRIMER
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/4 pl-4">
            <div className="bg-white p-4 rounded-[20px] shadow">
              <h3 className="text-lg font-bold mb-2">Résumé Du Panier</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Sous-total</span>
                <span className="text-gray-700 font-bold">
                  {(quantities.product1 * 45.0 + quantities.product2 * 29.0).toFixed(2)} TND
                </span>
              </div>
            {/*   <button className="w-full mt-4 bg-orange-500 text-white font-bold py-2 rounded-[10px]">
                Commander ({(quantities.product1 * 45.0 + quantities.product2 * 29.0).toFixed(2)} TND)

              </button> */}
              <div className="relative">
      <button
        onClick={toggleModal}
        className="w-full mt-4 bg-orange-500 text-white font-bold py-2 rounded-[10px]"
      >
        Commander ({(quantities.product1 * 45.0 + quantities.product2 * 29.0).toFixed(2)} TND)
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[875px]">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-2xl font-semibold text-[#FEA411]">Command Form</h2>
              <button
                onClick={toggleModal}
                className="bg-transparent border-[3px] border-red-500 rounded-full text-red-500 text-[8px] mt-[-31px] w-[30px] h-[30px]"
              >
               <span className=" w-[18px] h-[10px] text-[19px] absolute top-[91px] left-[1122px] font-bold"> x</span>
              </button>
            </div>

            <form>
              <div className="grid grid-cols-2 gap-4 bg-transparent ">
                <div>
                  <label className="block text-gray-700 font-semibold pb-[11px] ">First Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md shadow-sm bg-transparent border-2 border-gray-500/40 p-[7px] pl-[18px]"
                    placeholder="First Name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold pb-[11px]">Last Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-transparent border-2 border-gray-500/40 p-[7px] pl-[18px] shadow-sm"
                    placeholder="Last Name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold pb-[11px]">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md bg-transparent border-2 border-gray-500/40 p-[7px] pl-[18px] shadow-sm"
                    placeholder="email"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold pb-[11px]">Present Address</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-transparent border-2 border-gray-500/40 p-[7px] pl-[18px] shadow-sm"
                    placeholder="Present Address"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold pb-[11px]">Permanent Address</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-transparent border-2 border-gray-500/40 p-[7px] pl-[18px] shadow-sm"
                    placeholder="Permanent Address"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold pb-[11px]">City</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-transparent border-2 border-gray-500/40 p-[7px] pl-[18px] shadow-sm"
                    placeholder=" City"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold pb-[11px]">Postal Code</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-transparent border-2 border-gray-500/40 p-[7px] pl-[18px] shadow-sm"
                    placeholder="Postal Code"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold pb-[11px]">Country</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-transparent border-2 border-gray-500/40 p-[7px] pl-[18px] shadow-sm"
                    placeholder="Country"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full mt-4 bg-[#FEA411] text-white font-bold py-2 rounded-[10px]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
