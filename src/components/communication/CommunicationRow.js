import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import logo from '../../assets/logo.png';

const CommunicationRow = ({ houseData, editCallback, deleteCallback }) => {
    const [house,setHouse] = useState({
        houseNumber: "",
        floor: "",
        occupied: false,
        rent: 0
    });
    const handleDeleteCallback = (e) => {
        e.preventDefault();
        deleteCallback(house._id);
    }


    const handleEditCallback = (e) => {
        e.preventDefault();
        editCallback(house._id);
    }

    useEffect(() => {
        setHouse(houseData);
        console.log("house"+houseData);
    }, [house, houseData])
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={logo}
                    alt="Profile" />
                <div className="pl-3">
                    <div className="text-base font-semibold">{house.houseNumber}</div>
                    <div className="font-normal text-gray-500">{house.rent}</div>
                </div>
            </th>
            <td className="px-6 py-4">
                {house.floor}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    {house.occupied ? <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> :
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>}
                    Occupied
                </div>
            </td>
            <td className="px-6 py-4 flex flex-row items-center justify-center mb-5">
                <AiOutlineEdit className={"text-blue-500 cursor-pointer w-5 h-5"} onClick={handleEditCallback} />
                <AiOutlineDelete className={"ml-5 text-red-500 cursor-pointer w-5 h-5"} onClick={handleDeleteCallback} />
            </td>
        </tr>
    )
}

export default CommunicationRow;