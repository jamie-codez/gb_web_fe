import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const PaymentRow = ({ index, houseData, editCallback, deleteCallback }) => {
    const [house, setHouse] = useState({
        houseNumber: "3A",
        floor: "3",
        occupied: false,
        rent: 30000,
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
        if (houseData) {
            setHouse(houseData);
            console.log("house" + houseData);
        }
    }, [house, houseData])
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
            </th>
            <td className="px-6 py-4">
                <div className="pl-3">
                    <div className="text-base font-semibold">Hse No. :{house.houseNumber}</div>
                    <div className="font-normal text-gray-500">Rent: {house.rent}</div>
                    <div className="font-normal text-gray-500">Deposit: {house.deposit}</div>
                    <div className="font-normal text-gray-500">Floor: {house.floor}</div>
                </div>

            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    {house.occupied ? <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> :
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>}
                    Occupied
                </div>
            </td>
            <td className="px-6 h-full py-4 flex flex-row items-center justify-center">
                <AiOutlineEdit className={"text-blue-500 cursor-pointer w-5 h-5"} onClick={handleEditCallback} />
                <AiOutlineDelete className={"ml-5 text-red-500 cursor-pointer w-5 h-5"} onClick={handleDeleteCallback} />
            </td>
        </tr>
    )
}

export default PaymentRow;