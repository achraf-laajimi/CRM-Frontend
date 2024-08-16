import React,{useState} from 'react'

function Help() {
  const [currentStep,setCurrentStep]=useState(null)
  const steps={
    commande:<div>  <main className="flex-1 p-10">
      

    <section className="bg-orange-100 p-6 rounded-lg shadow-lg">
    <div style={{ marginLeft: '650px' }}  className='bg-[#ffffff96] p-4 rounded-[20px]   shadow-lg   cursor-pointer flex items-center  h-[100px] w-[300px]'> <div
      /*  className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg  cursor-pointer flex items-center" */
    >
      <div style={{  marginTop: '17px' }} className="font-bold text-gray-700 text-l ml--200 mt--4">Passer Une Commande</div>
      <div style={{ marginTop: '-40px' , marginLeft: '180px'  }} className="  text-6xl">

                🛒
              </div>
     </div></div> 
      <h3 style={{  marginTop: '-82px' }}  className="text-2xl font-bold text-gray-900 mb-4">Comment passer une commande</h3>
      <p className="text-gray-700 mb-4">Passez une commande en quelques étapes :</p>

      <div className="space-y-4">
        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 1 : Parcourez et choisissez votre produit</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Parcourez le site Web de Nom-Site ou utilisez la barre de recherche pour trouver le produit que vous souhaitez commander.</li>
            <li>Vous pouvez également utiliser le catalogue des catégories.</li>
            <li>En utilisant une bannière si l'une des campagnes vous intéresse.</li>
            <li>Cliquez sur le produit pour afficher plus d'informations et de détails.</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 2 : Ajouter au panier</h4>
          <p className="text-gray-700 mt-2">
            Sélectionnez la quantité désirée du produit et cliquez sur le bouton "Ajouter au panier". Vérifiez le contenu de votre panier et passez à la caisse.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 3 : Finaliser le paiement</h4>
          <p className="text-gray-700 mt-2">
            Vérifiez le contenu de votre panier et passez à la caisse.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 4 : Confirmer et payer</h4>
          <p className="text-gray-700 mt-2">
            Confirmez votre commande et procédez au paiement.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 5 : Suivre votre commande</h4>
          <p className="text-gray-700 mt-2">
            Suivez votre commande dans votre espace client.
          </p>
        </div>
      </div>
   

    <aside className="mt-8">
    <button style={{ marginLeft: '800px' }}  className="bg-[#ff6b35] text-white rounded-full px-6 py-3 flex items-center shadow-md hover:bg-[#ff5a1f]">
              <span>Discutez avec nous</span>
              <div className="ml-2">
              <svg xmlns="http: www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='stroke' viewBox="0 0 16 16">
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
        </svg>
              </div>
            </button>
    </aside> </section>
  </main></div>,
    payer:<div><main className="flex-1 p-10">
      

    <section className="bg-orange-100 p-6 rounded-lg shadow-lg">
    <div style={{ marginLeft: '650px' }}  className='bg-[#ffffff96] p-4 rounded-[20px]   shadow-lg   cursor-pointer flex items-center  h-[100px] w-[300px]'> <div
      /*  className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg  cursor-pointer flex items-center" */
    >
      <div style={{  marginTop: '17px' }} className="font-bold text-gray-700 text-l ml--200 mt--4">Payer</div>
      <div style={{ marginTop: '-40px' , marginLeft: '180px'  }} className="  text-6xl">

      💳
              </div>
     </div></div> 
      <h3 style={{  marginTop: '-82px' }}  className="text-2xl font-bold text-gray-900 mb-4">Comment payer votre commande</h3>
      <p className="text-gray-700 mb-4">Payer votre commande en quelques étapes :</p>

      <div className="space-y-4">
        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 1 : Passez votre commande</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Parcourez le site Web de Nom-Site ou utilisez la barre de recherche pour trouver le produit que vous souhaitez commander.</li>
            <li>Vous pouvez également utiliser  Le catalogue des catégories.</li>
            <li>En utilisant une bannière si l’une des compagne vous intéresse.</li>
            <li>Cliquez sur le produit pour afficher plus d'informations et de détails.</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">Etape 2 : choisissez votre mode de paiement</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Sélectionnez la quantité désirée du produit et cliquez sur le bouton "Ajouter au panier".</li>
            <li>Vérifiez le contenu de votre panier et passez à la caisse.</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">ÉEtape 3 :Effectuez votre paiement</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Si vous avez choisi le paiement en ligne, vous serez redirigé vers une page de paiement sécurisée où vous pourrez saisir vos informations de paiement.</li>
            <li>Pour le paiement à la livraison, attendez simplement que votre commande soit livrée pour le paiement en espèces.</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 4 : Confirmer et payer</h4>
          <p className="text-gray-700 mt-2">
            Confirmez votre commande et procédez au paiement.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-gray-800">Nous espérons que ce guide vous a été utile. Bon shopping!</h4>
        </div>
      </div>
   

    <aside className="mt-8">
    <button style={{ marginLeft: '800px' }}  className="bg-[#ff6b35] text-white rounded-full px-6 py-3 flex items-center shadow-md hover:bg-[#ff5a1f]">
              <span>Discutez avec nous</span>
              <div className="ml-2">
              <svg xmlns="http: www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='stroke' viewBox="0 0 16 16">
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
        </svg>
              </div>
            </button>
    </aside> </section>
  </main>  </div>,
    suivi:<div><main className="flex-1 p-10">
      

    <section className="bg-orange-100 p-6 rounded-lg shadow-lg">
    <div style={{ marginLeft: '650px' }}  className='bg-[#ffffff96] p-4 rounded-[20px]   shadow-lg   cursor-pointer flex items-center  h-[100px] w-[300px]'> <div
      /*  className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg  cursor-pointer flex items-center" */
    >
      <div style={{  marginTop: '17px' }} className="font-bold text-gray-700 text-l ml--200 mt--4">Suivre Votre Commande</div>
      <div style={{ marginTop: '-40px' , marginLeft: '190px'  }} className="  text-6xl">

      📦
              </div>
     </div></div> 
      <h3 style={{  marginTop: '-82px' }}  className="text-2xl font-bold text-gray-900 mb-4">Comment suivre votre colis</h3>
      <p className="text-gray-700 mb-4">Le suivi de votre commande sur Jumia est facile et simple. Voici comment procéder :</p>

      <div className="space-y-4">
      <ul className="list-disc list-inside text-gray-700 mt-2">
        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 1 : Connectez-vous à votre compte</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
           </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">Etape 2 : Cliquez sur l'onglet <span  style={{ color: '#FC410C' }}>"VOS COMMANDES"</span> dans le tableau de bord de votre compte.</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
           </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">Etape 3 :Trouvez la commande que vous souhaitez suivre et cliquez sur "Voir les détails".</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
           </ul>
        </div>


        <div>
          <h4 className="text-xl font-bold text-gray-800">Nous espérons que ce guide vous a été utile. Bon shopping!</h4>
        </div>
        </ul>
      </div>
   

    <aside className="mt-8">
    <button style={{ marginLeft: '800px' }}  className="bg-[#ff6b35] text-white rounded-full px-6 py-3 flex items-center shadow-md hover:bg-[#ff5a1f]">
              <span>Discutez avec nous</span>
              <div className="ml-2">
              <svg xmlns="http: www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='stroke' viewBox="0 0 16 16">
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
        </svg>
              </div>
            </button>
    </aside> </section>
  </main>  </div>,
    annuler:<div><main className="flex-1 p-10">
      

    <section className="bg-orange-100 p-6 rounded-lg shadow-lg">
    <div style={{ marginLeft: '650px' }}  className='bg-[#ffffff96] p-4 rounded-[20px]   shadow-lg   cursor-pointer flex items-center  h-[100px] w-[300px]'> <div
      /*  className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg  cursor-pointer flex items-center" */
    >
      <div style={{  marginTop: '17px' }} className="font-bold text-gray-700 text-l ml--200 mt--4">Annuler des commandes</div>
      <div style={{ marginTop: '-40px' , marginLeft: '199px'  }} className="  text-5xl">

      ❌
              </div>
     </div></div> 
      <h3 style={{  marginTop: '-82px' }}  className="text-2xl font-bold text-gray-900 mb-4">Comment annuler des articles ou des commandes</h3>
      <p className="text-gray-700 mb-4">Payer votre commande en quelques étapes :</p>

      <div className="space-y-4">
        <br />
        <p>Si l'article ou la commande n'a pas encore été expédiée, vous pouvez l'annuler en contactant notre service client via le live chat ou par téléphone au 31320903.

 

Si votre commande a été prépayée le remboursement sera crédité directement sur votre compte/carte bancaire sous un délai de 3 à 7 jours ouvrés (Le remboursement peut prendre jusqu'à 30 jours selon la politique de remboursement de votre banque).
 </p>
        <div>
          <h4 className="text-xl font-bold text-gray-800">Nous espérons que ce guide vous a été utile. Bon shopping!</h4>
        </div>
      </div>
   

    <aside className="mt-8">
    <button style={{ marginLeft: '800px' }}  className="bg-[#ff6b35] text-white rounded-full px-6 py-3 flex items-center shadow-md hover:bg-[#ff5a1f]">
              <span>Discutez avec nous</span>
              <div className="ml-2">
              <svg xmlns="http: www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='stroke' viewBox="0 0 16 16">
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
        </svg>
              </div>
            </button>
    </aside> </section>
  </main> </div>,
    retour:<div><main className="flex-1 p-10">
      

    <section className="bg-orange-100 p-6 rounded-lg shadow-lg">
    <div style={{ marginLeft: '650px' }}  className='bg-[#ffffff96] p-4 rounded-[20px]   shadow-lg   cursor-pointer flex items-center  h-[100px] w-[300px]'> <div
      /*  className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg  cursor-pointer flex items-center" */
    >
      <div style={{  marginTop: '17px' }} className="font-bold text-gray-700 text-l ml--200 mt--4">Faire un retour </div>
      <div style={{ marginTop: '-40px' , marginLeft: '180px'  }} className="  text-6xl">

      🔄
              </div>
     </div></div> 
      <h3 style={{  marginTop: '-82px' }}  className="text-2xl font-bold text-gray-900 mb-4">Comment créer une demande de retour</h3>
      <br />
      <br />
      <br />
      <p className="text-gray-700 mb-4">Si vous n'êtes pas satisfait de votre achat, Jumia vous permet de retourner facilement vos articles et de recevoir un remboursement. 

Tous les articles doivent être dans leur état et emballage d'origine pour pouvoir faire l'objet d'un retour. N'oubliez pas de garder votre facture avec vous.</p>
<p>Pour initier votre retour, suivez simplement ces étapes simples :</p>
      <div className="space-y-4">
        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 1 :Connectez-vous à votre compte Jumia et accédez à  <span  style={{ color: '#FC410C' }}> "VOS COMMANDES"</span>.</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">Etape 2 :  Cliquez sur la commande du ou des articles que vous souhaitez retourner.</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
           </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">Etape 3 :Trouvez l'article que vous souhaitez retourner et cliquez sur 'Demander un retour'.</h4>
          <ul className="list-disc list-inside text-gray-700 mt-2">
           </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 4 :Sélectionnez le nombre d'articles que vous souhaitez retourner, la raison du retour et donnez-nous plus de détails pour nous aider à identifier le problème avec le produit.</h4>
         
        </div>
        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 5 : Sélectionnez le mode de remboursement de votre choix</h4>
         
        </div>
        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 6 : Sélectionnez votre méthode de retour préférée ( collecte à votre adresse ou dépôt à un point relais). </h4>
         
        </div>
        <div>
          <h4 className="text-xl font-semibold text-gray-800">Étape 7 : Vérifiez vos informations et soumettez votre demande de retour. </h4>
         
        </div>

        <div>
          <h4 className="text-xl font-bold text-gray-800">Nous espérons que ce guide vous a été utile. Bon shopping!</h4>
        </div>
      </div>
   

    <aside className="mt-8">
    <button style={{ marginLeft: '800px' }}  className="bg-[#ff6b35] text-white rounded-full px-6 py-3 flex items-center shadow-md hover:bg-[#ff5a1f]">
              <span>Discutez avec nous</span>
              <div className="ml-2">
              <svg xmlns="http: www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='stroke' viewBox="0 0 16 16">
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
        </svg>
              </div>
            </button>
    </aside> </section>
  </main></div>,
  }
  return (

    !currentStep?(    <div className='bg-red-300 rounded-[25px]'>
              <main className="flex-1 p-8 w-[1190px] h-[580px] bg-[#f5e2dc] rounded-[25px]">
          <h2 className="text-xl font-semibold text-gray-800">Centre d'assistance</h2>
          <p className="mt-3 text-2xl font-bold">Salut, comment pouvons-nous vous aider ?</p>
      
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          <button className='bg-white p-4 rounded-[20px]   shadow-md hover:shadow-lg  cursor-pointer flex items-center  h-[120px]' onClick={()=>setCurrentStep("commande")}>
        <div
     /*  className="bg-white p-4 rounded-[20px]   shadow-md hover:shadow-lg  cursor-pointer flex items-center  h-[120px]" */
    >
      <div style={{ marginLeft: '-120px', marginTop: '2px' }} className="font-bold text-gray-700 text-l ml--200 mt--4">Passer Une Commande</div>
      <div className="ml-229 text-6xl">
                {/* Icon for Order */}
                🛒
              </div>
    </div>
      
      
      </button><button className='bg-white p-4 rounded-[20px]   shadow-md hover:shadow-lg  cursor-pointer flex items-center  h-[120px]' onClick={()=>setCurrentStep("payer")}> <div
      /*  className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg  cursor-pointer flex items-center" */
    >
      <div style={{ marginLeft: '-240px', marginTop: '2px' }} className="font-bold text-gray-700 text-l ml--200 mt--4">Payer</div>
      <div style={{ marginTop: '-49px' }} className="ml-229  text-6xl -mt-5">
                {/* Icon for Pay */}
                💳
              </div>
     </div></button> 
     <button className='bg-white p-4 rounded-[20px]   shadow-md hover:shadow-lg  cursor-pointer flex items-center  h-[120px]' onClick={()=>setCurrentStep("suivi")}>   <div
      /*   className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg  cursor-pointer flex items-center" */
      >
        <div style={{ marginLeft: '-180px', marginTop: '2px' }} className="font-bold text-gray-700 text-l ml--200 mt--4">Suivre Votre Colis</div>
        <div style={{ marginTop: '-33px' }}  className="ml-229 text-6xl">
                  {/* Icon for Track */}
                  📦
                </div>
      </div></button> 
      <button className='bg-white p-4 rounded-[20px]   shadow-md hover:shadow-lg  cursor-pointer flex items-center  h-[120px] mt-40px' onClick={()=>setCurrentStep("annuler")}>   <div
       /*  className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg  cursor-pointer flex items-center  h-[120px] mt-9" */
      >
        <div style={{ marginLeft: '-100px', marginTop: '2px' }} className="font-bold text-gray-700 text-l ml--200 mt--4">Annuler Des Commandes</div>
        <div style={{ marginTop: '-33px' }}  className="ml-229 text-6xl">
                  {/* Icon for Cancel */}
                  ❌
                </div>
      </div></button>
      <button className='bg-white p-4 rounded-[20px]   shadow-md hover:shadow-lg  cursor-pointer flex items-center  h-[120px] mt-40px' onClick={()=>setCurrentStep("retour")}> <div
      /*   className="bg-white p-4 rounded-[20px]  shadow-md hover:shadow-lg cursor-pointer flex items-center mt-9" */
      >
        <div style={{ marginLeft: '-180px', marginTop: '2px' }} className="font-bold text-gray-700 text-l ml--200 mt--4">Faire Un Retour</div>
        <div style={{ marginTop: '-33px' }}  className="ml-229 text-6xl">
                  {/* Icon for Return */}
                  🔄
                </div>
      </div></button>
          </div>
      
          <div className="mt-60px flex justify-end">
            <button className="bg-[#ff6b35] text-white rounded-full px-6 py-3 flex items-center shadow-md hover:bg-[#ff5a1f] ">
              <span>Discutez avec nous</span>
              <div className="ml-2">
              <svg xmlns="http: www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className='stroke' viewBox="0 0 16 16">
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
        </svg>
              </div>
            </button>
          </div>
        </main>
      
            </div>):steps[currentStep]




  )
}

export default Help