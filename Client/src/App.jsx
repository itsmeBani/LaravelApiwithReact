import {Sidebar} from "./Components/Sidebar.jsx";
import {CustomerTable} from "./Components/CustomerTable.jsx";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./Layout.jsx";
import ManageCustomer from "./pages/ManageCustomer.jsx";
import ManageProduct from "./pages/ManageProduct.jsx";
import ManageOrder from "./pages/ManageOrder.jsx";
import {Login} from "./Components/Login.jsx";
import {CurrentUser} from "./ContextProvider/CurrentUser.jsx";
import {useContext} from "react";
import {CurrentUserContext} from "./ContextProvider/Context.js";

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <ManageCustomer/>,
                },
                {
                    path: '/Products',
                    element: <ManageProduct/>,
                },
                {
                    path: '/Orders',
                    element: <ManageOrder/>,
                }
            ],
        },
    ]);
    const {CurrentUser,token} = useContext(CurrentUserContext)
    return (
        <div className="bg-white flex h-screen">
                {token ?
                    <RouterProvider router={router}/>
                    : <Login/>
                }
        </div>
    )
}

export default App
