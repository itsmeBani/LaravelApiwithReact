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
    MenuHandler, CardFooter, Dialog, Tooltip,

} from "@material-tailwind/react";

import {
    DocumentMagnifyingGlassIcon, EyeIcon,
    FlagIcon,
    MagnifyingGlassIcon, PencilIcon, PencilSquareIcon, PlusIcon, TrashIcon,
} from "@heroicons/react/24/solid";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {DeleteProduct, getALLCustomer, getALLProducts} from "../AxiosConfig.js";
import DynamicForm from "./DynamicFormProduct.jsx";


const TABLE_HEAD = [
    {
        head: "Digital Asset",
        customeStyle: "!text-left",
    },
    {
        head: "Price",
        customeStyle: "text-right",
    },
    {
        head: "Category",
        customeStyle: "text-right",
    },


    {
        head: "Actions",
        customeStyle: "text-right",
    },
];

export function ProductTable() {
    const [products, setProducts] = useState([])
    const [openPreview, setOpenPreview] = React.useState(false);
    const [openManageProduct, setManageProduct] = React.useState(false);
    const [PreviewData, setPreviewData] = useState([])
    const [isAddingProduct, setIsAddingProduct] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [search,setSearch] = useState('')
    const handleOpen = () => setOpenPreview(!openPreview);
    const handleManageProduct = () => setManageProduct(!openManageProduct);

    const FetchProducts = async () => {

        try {
            const response = await getALLProducts()
            setProducts(response.data)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        FetchProducts().then()

    }, [refresh])

    const HandleDeleteProduct=async (id)=>{
        try {
            const response = await DeleteProduct(id)
            setRefresh(!refresh)
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <Card className="h-full w-full">
            <CardHeader
                floated={false}
                shadow={false}
                className=" py-2  pt-5 flex  justify-between gap-4 rounded-none"
            >
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Manage Products
                    </Typography>
                    <Typography
                        variant="small"
                        className="mt-1 font-normal text-gray-600"
                    >
                        Organize your products, track inventory, and update details effortlessly.
                    </Typography>
                </div>


                <div className="flex w-full  gap-4 md:w-max">
                    <div className="w-full md:w-72">
                        <Input
                            onChange={(e)=>{
                                setSearch(e.target.value)}}
                            size="lg"
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                        />
                    </div>
                    <Tooltip content="Add Product" className="bg-green-500">
                        <IconButton onClick={() => {
                            setIsAddingProduct(true)
                            setManageProduct(true)
                        }}

                                    variant={"gradient"} color={"green"}><PlusIcon className="h-5 w-5 "/></IconButton>
                    </Tooltip>
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
                    {products.filter((item)=>{
                        return search?.toLowerCase() === '' ?  item :
                            item?.name?.toLowerCase().includes(search) ||
                            item?.label?.toLowerCase().includes(search)||
                            item?.price?.toString().toLowerCase().includes(search)
                    }).map(
                        (
                            item,
                            index,
                        ) => {
                            const isLast = index === products.length - 1;
                            const classes = isLast
                                ? "!p-4"
                                : "!p-4 border-b border-gray-300";
                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex w-auto gap-4 ">
                                            <img
                                                src={item?.imageUrl}
                                                alt={""}
                                                className="h-14 rounded-md  w-14 object-cover"
                                            />
                                            <div>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="!font-semibold"
                                                >
                                                    {item?.name}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    className="!font-normal text-gray-600"
                                                >
                                                    {item?.description?.length > 50 ? item.description.slice(0, 50) + '...' : item?.description}

                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            className="text-right font-bold text-gray-600"
                                        >
                                            ₱{Number(item?.price).toLocaleString()}
                                        </Typography>
                                    </td>


                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            className="text-right !font-normal text-gray-600"
                                        >
                                            {item?.label}
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <div className="flex justify-end gap-1">


                                            <IconButton onClick={() => {

                                                setPreviewData(item)
                                                setOpenPreview(true)
                                            }} variant="gradient" color={"blue"} size="sm">
                                                <EyeIcon className="h-5 w-5 text-white"/>
                                            </IconButton>
                                            <IconButton onClick={() => {
                                                console.log(item)
                                                setPreviewData(item)
                                                setIsAddingProduct(false)
                                                setManageProduct(true)
                                            }}
                                                        variant="gradient" size="sm" color={"blue"}>
                                                <PencilIcon className="h-5 w-5 text-white"/>
                                            </IconButton>
                                            <IconButton onClick={()=>HandleDeleteProduct(item?.product_id)} variant="gradient" color={"red"} size="sm">
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


            <Dialog open={openPreview} handler={handleOpen}>
                <Card className="w-full">
                    <CardHeader shadow={false} floated={false} className="h-96">
                        <img
                            src={PreviewData.imageUrl}
                            alt="card-image"
                            className="h-full w-full  object-cover"
                        />
                    </CardHeader>
                    <CardBody>
                        <div className="mb-2 flex items-center justify-between">
                            <Typography color="blue-gray" className="font-medium">
                                {PreviewData.name}
                            </Typography>
                            <Typography color="blue-gray" className="font-medium">

                                ₱{Number(PreviewData?.price).toLocaleString()}
                            </Typography>
                        </div>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal opacity-100"
                        >
                            {PreviewData?.description}
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button onClick={() => setOpenPreview(false)}
                                ripple={false}
                                className="w-full" color={"blue"}
                                variant={"outlined"}
                        >
                            Close
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>


            <Dialog open={openManageProduct} size={"sm"} handler={handleManageProduct}>
                <DynamicForm setRefresh={setRefresh}
                             refresh={refresh}
                             openManageProduct={openManageProduct}
                             setManageProduct={setManageProduct}
                             PreviewData={PreviewData}
                             action={{isAdding: isAddingProduct}}/>
            </Dialog>


        </Card>
    );
}

export default ProductTable;