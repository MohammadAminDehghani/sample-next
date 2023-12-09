import Spinner from "../icons/spinner"


interface Props {
    className? : string
}

export default function LoadingBox({ className } : Props) {
    return (
        <div className={`w-full bg-gray-50 text-sm border border-opacity-10 border-black rounded-md flex items-center font-bold px-3 py-4 ${className ?? ''}`}>
            <Spinner className="w-4 h-4 !text-sky-500 ml-2"/>
            <span className="text-gray-600 px-5">Getting data from server...</span>
        </div>
    )
}