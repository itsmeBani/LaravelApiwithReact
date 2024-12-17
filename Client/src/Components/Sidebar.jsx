import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon, UserGroupIcon, ArchiveBoxIcon, ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {CurrentUserContext} from "../ContextProvider/Context.js";

export function Sidebar() {
    const {refreshToken,setRefreshToken} = useContext(CurrentUserContext)
    return (
        <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" className="text-[#5D5FEF]">
                    SAMSANG TECH
                </Typography>
            </div>
            <List>
           <Link to={"/"}>
               <ListItem >
                   <ListItemPrefix>
                       <UserGroupIcon className="h-5 w-5 text-[#5D5FEF]" />
                   </ListItemPrefix>
                   Customer
               </ListItem>
           </Link>
                <Link to={"/products"}>
                <ListItem >
                    <ListItemPrefix>
                        <ArchiveBoxIcon className="h-5 w-5 text-[#5D5FEF]" />
                    </ListItemPrefix>
                    Product
                </ListItem>

                </Link>
                <Link to={"/orders"}>
                    <ListItem >
                <ListItemPrefix>
                    <ShoppingCartIcon className="h-5 w-5 text-[#5D5FEF]" />
                </ListItemPrefix>
               Order
            </ListItem>
                </Link>
                <ListItem onClick={()=>{

                    localStorage.removeItem("auth_token")
                    setRefreshToken(!refreshToken)
                }
                } className="text-red-400">
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5 text-red-400 font-bold" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}