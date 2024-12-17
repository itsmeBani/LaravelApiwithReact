import React from 'react';
import {Sidebar} from "./Components/Sidebar.jsx";
import {Outlet} from "react-router-dom";

function Layout(props) {
    return (
        <div className="flex flex-1 h-full bg-blue-100/20 w-full">

            <div>
                <Sidebar/>
            </div>
            <div className="p-5 w-full">
               <Outlet/>
            </div>
        </div>
    );
}

export default Layout;