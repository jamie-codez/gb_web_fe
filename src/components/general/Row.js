import React from 'react';
import logo from '../../assets/logo.png';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const Row = ({ user, editCallback, deleteCallback }) => {
    const handleDeleteCallback = (e) => {
        e.preventDefault();
        deleteCallback(user._id);
    }


    const handleEditCallback = (e) => {
        e.preventDefault();
        editCallback(user._id);
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={user.profileImage ? user.profileImage : logo}
                    alt="Profile" />
                <div className="pl-3">
                    <div className="text-base font-semibold">{user.username}</div>
                    <div className="font-normal text-gray-500">{user.email}</div>
                </div>
            </th>
            <td className="px-6 py-4">
                {user.phone}
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    {user.verified ? <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> :
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>}
                    Verified
                </div>
            </td>
            <td className="px-6 py-4 flex flex-row items-center justify-center mb-5">
                {/* <AiOutlineEdit className={"text-blue-500 cursor-pointer w-5 h-5"} onClick={handleEditCallback} /> */}
                <AiOutlineDelete className={"ml-5 text-red-500 cursor-pointer w-5 h-5"} onClick={handleDeleteCallback} />
            </td>
        </tr>
    )
}

export default Row;