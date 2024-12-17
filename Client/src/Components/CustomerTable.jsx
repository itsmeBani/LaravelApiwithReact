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
    MenuHandler, Dialog, Avatar,

} from "@material-tailwind/react";

import {
    CalendarDateRangeIcon,
    DocumentMagnifyingGlassIcon, EyeIcon,
    FlagIcon, HomeModernIcon,
    MagnifyingGlassIcon, PencilIcon, PencilSquareIcon, TrashIcon, UserCircleIcon,
} from "@heroicons/react/24/solid";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {getALLCustomer, updateCustomer} from "../AxiosConfig.js";
import {XMarkIcon} from "@heroicons/react/16/solid/index.js";


const TABLE_HEAD = [
    {
        head: "Profile Picture",
        customeStyle: "!text-left",
    },


    {
        head: "Name",
        customeStyle: "text-right",
    },
    {
        head: "Address",
        customeStyle: "text-right",
    },
    {
        head: "Created At",
        customeStyle: "text-right",
    },
    {
        head: "Actions",
        customeStyle: "text-right",
    },
];

export function CustomerTable() {
    const [customers, setCustomers] = useState([])
    const [PreviewCustomer, setPreviewCustomer] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [search,setSearch] = useState('')
    const FetchCustomers = async () => {

        try {
            const response = await getALLCustomer()
            setCustomers(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        FetchCustomers().then()

    }, [refresh])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);


    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(!openEdit);

    const [formData, setFormData] = useState({
        image: "",
        firstname: "",
        lastname: "",
        address: "",
    });
    useEffect(() => {
        setFormData({
            image: PreviewCustomer?.image || "",
            firstname: PreviewCustomer?.firstname || "",
            lastname: PreviewCustomer?.lastname || "",
            address: PreviewCustomer?.address || "",
        });
    }, [PreviewCustomer]);





    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleUpdate = async () => {
        console.log(formData)
        try {
            // Call the update API
            const response = await updateCustomer(PreviewCustomer.user_id, formData);

            if (response.status === 200) {
                console.log(response)
                setRefresh(!refresh)
                setOpenEdit(false);
            }
        } catch (error) {
            console.error("Error updating customer:", error);

        }
    };
    return (
        <Card className="h-full  w-full">
            <CardHeader
                floated={false}
                shadow={false}
                className="mb-4 flex flex-wrap justify-between gap-4 rounded-none"
            >
                <div>
                    <Typography variant="h6" color="blue-gray">
                        Manage Customers
                    </Typography>
                    <Typography
                        variant="small"
                        className="mt-1 font-normal text-gray-600"
                    >
                        Keep track of customers and improve their experience easily.
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
                    {customers.filter((item)=>{
                        return search?.toLowerCase() === '' ?  item :
                            item?.firstname?.toLowerCase().includes(search) ||
                            item?.lastname?.toLowerCase().includes(search)||
                            item?.address?.toLowerCase().includes(search)
                    }).map((item, index) => {
                            const date = new Date(item?.created_at);

                            const formattedDate = date.toLocaleDateString("en-US", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });

                            const isLast = index === customers.length - 1;
                            const Customerclasses = isLast
                                ? "!p-4"
                                : "!p-4 border-b border-gray-300";
                            return (
                                <tr key={index}>
                                    <td className={Customerclasses}>
                                        <div className="flex items-center gap-4 text-left">
                                            <img
                                                src={item?.image}

                                                className="h-10 w-10"
                                            />

                                        </div>
                                    </td>
                                    <td className={Customerclasses}>
                                        <Typography
                                            variant="small"
                                            className="text-right !font-normal text-gray-600"
                                        >
                                            {item?.firstname + " " + item?.lastname}
                                        </Typography>
                                    </td>

                                    <td className={Customerclasses}>
                                        <Typography
                                            variant="small"
                                            className="text-right !font-normal text-gray-600"
                                        >
                                            {item?.address}
                                        </Typography>
                                    </td>
                                    <td className={Customerclasses}>
                                        <Typography
                                            variant="small"
                                            className="text-right !font-normal text-gray-600"
                                        >
                                            {formattedDate}
                                        </Typography>
                                    </td>

                                    <td className={Customerclasses}>
                                        <div className="flex justify-end gap-1">


                                            <IconButton onClick={() => {

                                                setPreviewCustomer(item)
                                                setOpen(true)
                                            }} variant="gradient" color={"blue"} size="sm">
                                                <EyeIcon className="h-5 w-5 text-white"/>
                                            </IconButton>
                                            <IconButton  onClick={() => {
                                                setPreviewCustomer(item)
                                                setOpenEdit(true)
                                            }} variant="gradient" size="sm" color={"blue"}>
                                                <PencilIcon className="h-5 w-5 text-white"/>
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


            <Dialog size={"sm"} open={open} handler={handleOpen} className={"bg-transparent"}>

                <div>
                    <div className="bg-white w-auto  px-3 py-7  rounded-lg place-items-center  flex gap-5">
                        <div onClick={() => setOpen(false)}>
                            <XMarkIcon className={"h-6 w-6 absolute z-1 top-3 right-3"}/>
                        </div>
                        <Avatar size={"xxl"} src={PreviewCustomer?.image}/>

                        <div className={"gap-1 flex flex-col"}>

                            <Typography className={"flex gap-3 text-[16px] capitalize"}><UserCircleIcon
                                className="h-5"/>{PreviewCustomer?.firstname + " " + PreviewCustomer?.lastname}
                            </Typography>
                            <Typography className={"flex gap-3 text-[16px] capitalize"}><HomeModernIcon
                                className="h-5"/>{PreviewCustomer?.address}</Typography>
                            <Typography className={"flex gap-3 text-[16px] capitalize"}><CalendarDateRangeIcon
                                className="h-7"/> Account created
                                :{new Date(PreviewCustomer?.created_at).toLocaleDateString("en-US", {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</Typography>

                        </div>
                    </div>
                </div>


            </Dialog>


            <Dialog size="sm" open={openEdit} handler={handleOpenEdit} className="bg-transparent">
                <div className="bg-white w-auto px-3 py-10 rounded-lg flex flex-col relative">

                    <button
                        onClick={() => setOpenEdit(false)}
                        className="absolute top-2 right-2"
                        aria-label="Close"
                    >
                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>


                    <div className="flex gap-5 pl-5">

                        <Avatar size="xxl" src={formData.image} alt="Customer Image" />
                        <div className="flex flex-col gap-2 w-full pr-5">
                            <Input
                                placeholder="Http://"
                                label="Image"
                                className="w-full"
                                color="blue"
                                value={formData.image}
                                onChange={(e) => handleInputChange("image", e.target.value)}
                            />
                            <Input
                                placeholder="John"
                                label="First Name"
                                className="w-full"
                                color="blue"
                                value={formData.firstname}
                                onChange={(e) => handleInputChange("firstname", e.target.value)}
                            />
                            <Input
                                placeholder="Doe"
                                label="Last Name"
                                className="w-full"
                                color="blue"
                                value={formData.lastname}
                                onChange={(e) => handleInputChange("lastname", e.target.value)}
                            />
                            <Input
                                placeholder="Cabulanglangan"
                                label="Address"
                                className="w-full"
                                color="blue"
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mx-5 mt-5 space-y-2">
                        <Button onClick={handleUpdate}



                            className="w-full rounded-full bg-indigo-400"
                        >
                            Update
                        </Button>
                        <Button
                            variant="outlined"
                            color="indigo"
                            onClick={() => setOpenEdit(false)}
                            className="w-full rounded-full"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Dialog>
        </Card>
    );
}

export default CustomerTable;