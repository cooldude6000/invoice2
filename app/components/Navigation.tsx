"use client"

import { useState } from "react"
import InvoiceTab from "./tabs/InvoicesTab"
import CustomerTab from "./tabs/CustomersTab"
import ProductTab from "./tabs/ProductsTab"
import SettingTab from "./tabs/SettingsTab"

export default function TabNavigation() {
    const [activeTab, setActiveTab] = useState("Invoices")

    const tabs = ["Invoices", "Customers", "Products", "Settings"]

    return (
        <div className="min-h-screen w-full flex flex-col bg-white">
            <div className="w-full bg-white shadow-sm p-4 border-b">
                <h1 className="text-2xl font-bold text-gray-800">Invoice Management</h1>
            </div>

            <div className="mx-4 mt-6">
                <div className="flex justify-start space-x-1 bg-gray-100 p-1 rounded-lg w-fit ">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 cursor-pointer ${activeTab === tab
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="m-4 p-4 bg-white rounded-lg shadow-sm flex-grow">
                {activeTab === "Invoices" && <InvoiceTab />}
                {activeTab === "Customers" && <CustomerTab />}
                {activeTab === "Products" && <ProductTab />}
                {activeTab === "Settings" && <SettingTab />}
            </div>
        </div>
    )
}