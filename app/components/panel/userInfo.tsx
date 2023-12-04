import { useAppSelector } from "@/app/hooks";
import useAuth from "@/app/hooks/useAuth";
import { selectUser } from "@/app/store/auth";




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