import React from 'react'
import TabNavigation from '../components/Navigation'
import Link from 'next/link'

export default function Meow() {
    return (
        <div className="min-h-screen w-full flex">
            <div className="w-1/5 bg-gray-200 shadow-lg">
                <div className="p-4 mb-4 border-b border-gray-300">
                    <h1 className="text-xl font-bold text-gray-800">Invoice App</h1>
                </div>

                <div className='flex flex-col'>
                    <Link
                        href="/"
                        className="flex items-center px-5 py-3 m-2 rounded text-gray-700 hover:bg-white hover:text-gray-900 "
                    >
                        Home
                    </Link>

                    <div className="flex items-center px-5 py-3 m-2 rounded bg-white text-blue-600 font-medium">
                        Invoices
                    </div>
                </div>
            </div>

            <div className="w-4/5 bg-white">
                <TabNavigation />
            </div>
        </div>
    )
}