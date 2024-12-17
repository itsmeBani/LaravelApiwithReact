import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography, Spinner,
} from "@material-tailwind/react";
import {useContext, useState} from "react";
import {EyeIcon} from "@heroicons/react/24/solid";
import {CurrentUserContext} from "../ContextProvider/Context.js";
import {Validate} from "../AxiosConfig.js";

export function Login() {
    const [Credentials, setCredentials] = useState({
        username: null,
        password: null
    })
    const [ErrorMsg, setErrorMsg] = useState(null)
    const [loading, setLoading] = useState(false)
    const [inputHidden, setInputHidden] = useState(true)
    const {refreshToken,setRefreshToken} = useContext(CurrentUserContext)
    const ValidateCredentials = async () => {

        console.log(Credentials)
        setLoading(true)
        try {

            if (!Credentials.username || !Credentials.password) {
                setErrorMsg("All fields are required")
                setLoading(false)
                return
            }
            const response = await Validate(Credentials)


            console.log(response.data.token)
            localStorage.setItem("auth_token", response.data.token);

            setErrorMsg(null)
            setLoading(false)
            setRefreshToken(!refreshToken)

        } catch (e) {
            console.log(e)
            setErrorMsg("Invalid credentials")
        }
    }
    const HandleInputChange = (e) => {
        const {name, value} = e.target
        setCredentials({
            ...Credentials,
            [name]: value
        })


    }
    return (
        <div className="flex bg-blue-100/20 w-full h-full place-items-center justify-center">

            <Card color="white" shadow={false} className=" flex shadow-md p-10 ">
                <Typography variant="h4" color="blue-gray">
                    Admin Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Welcome back! Enter your credentials<br/>
                    to access the admin panel.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ">
                    <div className="mb-1 flex flex-col gap-5">


                        <Input
                            onChange={HandleInputChange}
                            name={"username"} size={"lg"}
                            error={ErrorMsg !== null}
                            placeholder={"johndoe@gmail.com"}
                            label={"Email"}
                            color={"blue"}/>
                        <Input
                            icon={<div onClick={() => setInputHidden(!inputHidden)}>
                                <EyeIcon className={"h-5 w-5"}/></div>}
                            type={inputHidden ? "password" : "text"}
                            onChange={HandleInputChange}
                            name={"password"} size={"lg"}
                            error={ErrorMsg !== null}
                            placeholder={"******"} label={"Password"}
                            color={"blue"}/>
                    </div>

                    <Button onClick={ValidateCredentials} className="mt-6 bg-[#5D5FEF]/80  flex justify-center "
                            fullWidth>
                        {loading
                            ? <Spinner color={"blue-gray"}/> : "Login"}


                    </Button>
                    <p className="text-[12px] text-center pt-4 text-red-500 capitalize">{ErrorMsg}</p>
                </form>
            </Card>
        </div>
    );
}