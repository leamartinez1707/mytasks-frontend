import Tabs from "@/components/Profile/Tabs"
import { Outlet } from "react-router-dom"

const ProfileLayout = () => {
    return (
        <>

            <Tabs />
            <Outlet />
        </>
    )
}

export default ProfileLayout