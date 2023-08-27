import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const PaymentRow = ({ index, house, editCallback, deleteCallback }) => {
    const handleDeleteCallback = (e) => {
        e.preventDefault();
        deleteCallback(house._id);
    }


    const handleEditCallback = (e) => {
        e.preventDefault();
        editCallback(house._id);
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
            </th>
            <td className="px-6 py-4">
                <div className="pl-3">
                    <div className="text-base font-semibold">Title. :{house.title}</div>
                    <div className="font-normal text-gray-500">Description: {house.description}</div>
                    <div className="font-normal text-gray-500">Transaction Code: {house.transactionCode}</div>
                    <div className="font-normal text-gray-500">Amount: {house.amount}</div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="pl-3">
                    <div className="text-base font-semibold">Full Name :{house.firstName + house.lastName}</div>
                    <div className="font-normal text-gray-500">First Name: {house.firstName}</div>
                    <div className="font-normal text-gray-500">Last Name: {house.lastName}</div>
                    <div className="font-normal text-gray-500">Phone: {house.phoneNumber}</div>
                    <div className="font-normal text-gray-500">Email: {house.email}</div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    {house.occupied ? <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> :
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>}
                    Verified
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