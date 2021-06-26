import React from 'react'
import TableProduct from '../CrudProduct/tableProducts'
import SideBar from './SideBar'

function PanelAdmin() {
    return (

        <main className="bg-gray-100 dark:bg-gray-800 relative h-screen overflow-hidden relative">
            <div className="flex items-start justify-between">
                <SideBar />
                <div className="flex flex-col w-full md:space-y-4">
                    <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
                        <h1 className=" mt-8  text-4xl font-semibold text-gray-800 dark:text-white">
                            Welcome, to your Panel Admin!
                        </h1>
                        
   
                        <div className="w-full">
                            <TableProduct />
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default PanelAdmin
