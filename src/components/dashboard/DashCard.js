const DashCard = ({icon,name,number,background})=>{
    return(
        <div className={`flex flex-col rounded-md ${background} w-44 p-5`}>
            {icon}
            <div className={"text-gray-900 font-bold text-xl"}>
                {name}
            </div>
            <div className={"text-xl text-purple-500"}>
                {number}
            </div>
        </div>
    )
}

export default DashCard;