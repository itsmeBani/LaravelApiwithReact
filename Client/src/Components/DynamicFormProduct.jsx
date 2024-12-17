import React, {useEffect, useState} from 'react';
import {Select, Textarea, Option, Button, IconButton} from "@material-tailwind/react";
import {PhotoIcon, XMarkIcon} from "@heroicons/react/24/outline/index.js";

import {AddProduct, updateProduct} from "../AxiosConfig.js";


function DynamicForm({setManageProduct,refresh, openManageProduct, action, PreviewData, setRefresh}) {

    const [productData, setProductData] = useState({
        imageUrl: '',
        name: '',
        price: '',
        label: '',
        description: '',
    });


    useEffect(() => {


        if (!action?.isAdding) {
            setProductData({
                imageUrl: PreviewData?.imageUrl || "",
                name: PreviewData?.name || "",
                price: PreviewData?.price || "",
                description: PreviewData?.description || "",
                label: PreviewData?.label || "",
            });
        }
    }, [PreviewData]);


    const [imageError, setImageError] = useState(false);
    const [Success, setSuccess] = useState(false);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setProductData({...productData, [name]: value});
    };

    const handleSelectChange = (value) => {
        setProductData({...productData, label: value});
    };
    const handleImageError = () => {
        setImageError(true);
    };

    const SubmitAddProduct = async (e) => {
        e.preventDefault()

        console.log(productData)
        try {
            if (action?.isAdding) {
                await AddProduct(productData)
            } else {
                await updateProduct(PreviewData?.product_id,productData)
            }

            setRefresh(!refresh)
            setManageProduct(false)
            setProductData({
                imageUrl: '',
                name: '',
                price: '',
                label: '',
                description: '',
            })

        } catch (e) {
            console.log(e)
        }
    };

    const HandleCloseForm = () => {
        setManageProduct(false)


    }
    return (


        <div className=" flex gap-2 flex-col   bg-white  relative rounded-lg ">

            <div className="flex p-2 justify-end" onClick={HandleCloseForm}>
                <XMarkIcon className="absolute h-7 w-7 text-blue-gray-700 flex "></XMarkIcon>

            </div>

            <form onSubmit={SubmitAddProduct}>

                <div className="py-10 px-5 w-full flex gap-3  place-items-center flex-col">

                    <div className="w-full flex  gap-2">
                        <div className="  ">

                            {imageError || !productData.imageUrl ? (
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" fill=""
                                     viewBox="0 0 24 24"
                                     className="opacity-60 object-cover w-[100px] h-[100px] text-blue-gray-700 rounded-md ">
                                    <path
                                        d="m12,21c0,.553-.448,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h12c2.757,0,5,2.243,5,5v6c0,.553-.448,1-1,1s-1-.447-1-1v-6c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v6.959l2.808-2.808c1.532-1.533,4.025-1.533,5.558,0l5.341,5.341c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-5.341-5.341c-.752-.751-1.976-.752-2.73,0l-4.222,4.222v2.213c0,1.654,1.346,3,3,3h6c.552,0,1,.447,1,1ZM15,3.5c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm0,2c-.551,0-1,.448-1,1s.449,1,1,1,1-.448,1-1-.449-1-1-1Zm8,12.5h-3v-3c0-.553-.448-1-1-1s-1,.447-1,1v3h-3c-.552,0-1,.447-1,1s.448,1,1,1h3v3c0,.553.448,1,1,1s1-.447,1-1v-3h3c.552,0,1-.447,1-1s-.448-1-1-1Z"/>
                                </svg>
                            ) : (
                                <img
                                    alt="Product"
                                    className="object-cover w-[130px] aspect-square rounded-md"
                                    src={productData.imageUrl}
                                    onError={handleImageError}
                                />
                            )}

                        </div>

                        <div className="flex w-full    flex-col gap-3">


                            <div className="relative w-full min-w-[300px] h-10">
                                <input
                                    type="text"
                                    name="imageUrl"
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" "
                                    value={productData.imageUrl}
                                    onChange={handleChange}
                                />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                                >
                                    Product Image
                                </label>
                            </div>
                            <div className="relative w-full min-w-[200px] h-10">
                                <input
                                    type="text"
                                    name="name"
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" "
                                    value={productData.name}
                                    onChange={handleChange}
                                />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                                >
                                    Product Name
                                </label>

                            </div>
                        </div>

                    </div>
                    <div className="w-full">
                        <div className="relative w-full min-w-[200px] h-10">
                            <input
                                type="number"
                                name="price"
                                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                placeholder=" "
                                value={productData.price}
                                onChange={handleChange}
                            />
                            <label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                            >
                                Product Price
                            </label>
                        </div>
                    </div>
                    <div className="w-full">
                        <Select label="Category" value={productData.label} onChange={handleSelectChange}>
                            <Option value="Phones">Phones</Option>
                            <Option value="Tablets">Tablets</Option>
                            <Option value="Laptops">Laptops</Option>
                            <Option value="Accessories">Accessories</Option>
                            <Option value="Others">Others</Option>
                        </Select>
                    </div>
                    <div className="w-full">
                        <Textarea
                            label="Description"
                            name="description"
                            className=""
                            value={productData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex w-full">

                        <Button type="submit" className="flex bg-green-500/90 w-full place-items-center justify-center">
                            {action?.isAdding ? "Add Product" : "Update Product"}
                        </Button>
                    </div>
                </div>


            </form>

        </div>


    );
}

export default DynamicForm;