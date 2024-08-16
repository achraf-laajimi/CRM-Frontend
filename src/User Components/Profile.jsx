import React from 'react'
import { FaUserCircle } from "react-icons/fa";

function Profile() {
  return (
    <div className='bg-white rounded-2xl p-8 mx-auto ml-14 mt-5 max-w-4xl'>
        <div className='flex items-center space-x-4 mb-9'>
            <FaUserCircle className='text-7xl text-neutral-800' />
            <h2 className=' text-2xl font-semibold text-neutral-800'>Votre Compte</h2>
        </div>
        <div className='grid grid-cols-2 gap-5'>
            <div className='border rounded-xl border-slate-700 p-4 w-96'>
                <h2 className='text-lg font-semibold text-neutral-800 border-b border-slate-700 pb-2 mb-4 -mx-4 px-4'>Informations Personnelles</h2>
                <p>Name</p>
                <p>Email</p>
            </div>
            <div className='border rounded-xl border-slate-700 p-4 w-96'>
                <h2 className='text-lg font-semibold text-neutral-800 border-b border-slate-700 pb-2 mb-4 -mx-4 px-4'>Adresse</h2>

            </div>
            <div className='border rounded-xl border-slate-700 p-4 w-96'>
                <h2 className='text-lg font-semibold text-neutral-800 border-b border-slate-700 pb-2 mb-4 -mx-4 px-4'>Votre Crédit</h2>
                <p>Solde de crédit: 0.00TND</p>
            </div>
            <div className='border rounded-xl border-slate-700 p-4 w-96'>
                <h2 className='text-lg font-semibold text-neutral-800 border-b border-slate-700 pb-2 mb-4 -mx-4 px-4'>Préférences de Communication</h2>
            </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-orange-500 text-white py-2 px-6 mt-9 rounded-xl hover:bg-orange-600">Profile Settings</button>
        </div>
    </div>
  )
}

export default Profile