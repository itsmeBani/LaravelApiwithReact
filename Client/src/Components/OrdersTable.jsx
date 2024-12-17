import React, {useEffect, useState} from "react";


// @material-tailwind/react
import {
    Card,
    Menu,
    Input,
    Button,
    MenuList,
    MenuItem,
    CardBody,
    Typography,
    CardHeader,
    IconButton,
    MenuHandler, Avatar, Dialog, ListItemPrefix, ListItem, List,

} from "@material-tailwind/react";

import {
    DocumentMagnifyingGlassIcon, EyeIcon,
    FlagIcon,
    MagnifyingGlassIcon, PencilIcon, PencilSquareIcon, TrashIcon,
} from "@heroicons/react/24/solid";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {deleteAllOrder, deleteOrder, getALLCustomer, getALLOrders} from "../AxiosConfig.js";


const TABLE_HEAD = [
    {
        head: "Customer",
        customeStyle: "!text-left",
    },
    {
        head: "Order",
        customeStyle: "text-left",
    },
    {
        head: "Quantity",
        customeStyle: "text-right",
    },

    {
        head: "Total Price",
        customeStyle: "text-right",
    },
    {
        head: "Actions",
        customeStyle: "text-right",
    },
];

export function OrderTable() {
    const [orders, setOrders] = useState([])
    const [open, setOpen] = useState(false);
    const [previewOrders, setPreviewOrders] = useState([])
    const [refreshOrders, setRefreshOrders] = useState(false)
    const [search,setSearch] = useState('')
    const handleOpen = () => setOpen(!open);
    const FetchOrders = async () => {

        try {
            const response = await getALLOrders()
            setOrders(response.data)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }


    const DeleteOrders = async (id) => {

        try {
            const response = await deleteOrder(id)
            setOpen(false)
            setRefreshOrders(!refreshOrders)
        } catch (e) {
            console.log(e)
        }
    }
    const DeleteAllOrders = async (id) => {

        try {
            const response = await deleteAllOrder(id)
            setRefreshOrders(!refreshOrders)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {

        FetchOrders().then()

    }, [refreshOrders])
    return (
        <Card className="h-full  w-full">
            <CardHeader
                floated={false}
                shadow={false}
                className="mb-4 flex flex-wrap justify-between gap-4 rounded-none"
            >
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Manage Orders
                    </Typography>
                    <Typography
                        variant="small"
                        className="mt-1 font-normal text-gray-600"
                    >
                        Track orders, update statuses, and ensure timely deliveries with ease.
                    </Typography>
                </div>


                <div className="flex w-full shrink-0 items-center gap-4 md:w-max">
                    <div className="w-full md:w-72">
                        <Input
                            onChange={(e)=>{
                                setSearch(e.target.value)}}
                            size="lg"
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                        />
                    </div>

                </div>
            </CardHeader>
            <CardBody className="overflow-scroll !px-0 py-2">
                <table className="w-full min-w-max table-auto">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map(({head, customeStyle}) => (
                            <th
                                key={head}
                                className={`border-b border-gray-300 !p-4 pb-8 ${customeStyle}`}
                            >
                                <Typography
                                    color="blue-gray"
                                    variant="small"
                                    className="!font-bold"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {orders.filter((item)=>{
                        return search?.toLowerCase() === '' ?  item :
                            item?.firstname?.toLowerCase().includes(search) ||
                            item?.lastname?.toLowerCase().includes(search)||
                            item?.address?.toLowerCase().includes(search)
                    }).map(
                        (item,
                         index,
                        ) => {
                            const isLast = index === orders.length - 1;
                            const classes = isLast
                                ? "!p-4"
                                : "!p-4 border-b border-gray-300";
                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-4 text-left">
                                            <img
                                                src={item?.image}
                                                alt={"digitalAsset"}
                                                className="h-10 w-10"
                                            />
                                            <div>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="!font-semibold"
                                                >
                                                    {item?.firstname + " " + item?.lastname}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    className="!font-normal text-gray-600"
                                                >
                                                    {item?.address}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center -space-x-4">
                                            {(item?.carts.length > 4 ? item.carts.slice(0, 4) : item.carts).map((item, index) => (
                                                <Avatar
                                                    key={index}
                                                    variant="circular"
                                                    alt="user 1"
                                                    className="border-2 border-white hover:z-10 focus:z-10"
                                                    src={item?.product?.imageUrl}
                                                />
                                            ))}

                                        </div>
                                    </td>

                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            className="text-right font-bold text-gray-600"
                                        >
                                            {item?.carts.length}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            className="text-right font-bold text-gray-600"
                                        >
                                            ₱{item?.carts?.reduce((acc, cart) => acc + Number(cart?.product?.price || 0), 0).toLocaleString()}


                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex justify-end gap-1">


                                            <IconButton onClick={() => {
                                                handleOpen()
                                                setPreviewOrders(item.carts)
                                            }}
                                                        variant="gradient" color={"blue"} size="sm">
                                                <EyeIcon className="h-5 w-5 text-white"/>
                                            </IconButton>
                                            <IconButton onClick={()=>{ DeleteAllOrders(item?.user_id)}}  variant="gradient" color={"red"} size="sm">
                                                <TrashIcon className="h-5 w-5 text-white"/>
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                    </tbody>
                </table>
            </CardBody>

            <Dialog open={open} handler={handleOpen} className={"bg-transparent"}>
                <Card className="w-auto p-5">
                    <List>

                        {previewOrders?.map((item, index) => {

                            return (

                                <ListItem key={index} ripple={false} className="flex justify-between">
                                    <div className="flex">
                                        <ListItemPrefix>
                                            <Avatar variant="circular" className="aspect-video" alt="candice"
                                                    src={item?.product.imageUrl}/>
                                        </ListItemPrefix>
                                        <div>
                                            <Typography variant="h6" color="blue-gray" className="text-[13px]">
                                                {item.product?.name}
                                            </Typography>
                                            <Typography variant="small" color="gray" className="font-normal">
                                                {item?.product?.description?.length > 50 ? item.product?.description.slice(0, 50) + '...' : item?.product?.description}

                                            </Typography>
                                            <Typography variant="small" color="gray" className="font-normal">
                                                P{item?.product?.price}
                                            </Typography>
                                        </div>
                                    </div>


                                    <button onClick={() => DeleteOrders(item.cart_id)}>
                                        <TrashIcon className={"text-red-500      h-6 w-6"}/>
                                    </button>
                                </ListItem>
                            )
                        })}


                    </List>
                </Card>


            </Dialog>


        </Card>
    );
}

export default OrderTable;