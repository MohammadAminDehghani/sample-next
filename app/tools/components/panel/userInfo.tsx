import { useAppSelector } from "@/app/tools/hooks";
import useAuth from "@/app/tools/hooks/useAuth";
import { selectUser } from "@/app/tools/store/auth";




const UserInfo = () => {


    // use swr
    const { user } = useAuth();

    // use redux
    //const user = useAppSelector(selectUser)

    return(
        <>
            <div>
                <span>username: </span>
                <span>{user?.name}</span>
            </div>
        </>
    )
}


export default UserInfo;