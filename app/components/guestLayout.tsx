import { ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';

interface Props {
    children: ReactNode
}


const GuestLayout = ({ children }: Props) => {

    const router = useRouter()
    const { user, error } = useAuth();

    if (user) {
        router.push('/panel')
        return <></>
     }

    // if (error) {
    //     //show error message
    //     router.push('/auth/login')
    //     return <></>;
    // }

    return (
        <div className="container">
            {children}
        </div>
    )
}


export default GuestLayout;