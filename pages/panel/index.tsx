import { NextPageWithLayout } from "../_app";
import UserPanelLayout from "../../app/components/userPanelLayout";
import { useEffect, useState } from "react";
import UserInfo from "@/app/components/panel/userInfo";
import { removeLoginToken } from "@/app/helpers/auth";
import { useRouter } from "next/router";


const Panel : NextPageWithLayout = () => {

    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        setInterval(()=>{
            setLoading(false)
        }, 3000)
    }, [])

    const router = useRouter()

    const logoutHandler = async () => {
        await removeLoginToken();
        await router.push('/auth/login')

    }

    if (loading) return <div>Loading...</div>

    return(
        <>
            <div>
                <UserInfo />
                <button className="btn btn-danger" onClick={logoutHandler}>log out!</button>
            </div>
        </>
    )
}


Panel.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Panel;