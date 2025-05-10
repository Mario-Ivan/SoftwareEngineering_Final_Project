import React, { JSX } from "react"
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";


export default function adminUser(): JSX.Element {
    return (
        <div className="flex h-screen font-sans">
            <Sidebar></Sidebar>
    
            <main className="flex-1 bg-gray-50 overflow-hidden">
                <Topbar section="User"></Topbar>
                
    
                <div className="bg-white rounded-xl shadow-md m-10">
                    
                </div>
    
            </main>
        </div>
    );
} 

