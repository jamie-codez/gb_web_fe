import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const CommunicationRow = ({ communication, editCallback, deleteCallback }) => {
    const handleDeleteCallback = (e) => {
        e.preventDefault();
        deleteCallback(communication._id);
    }

    let getTime = (milli) => {
        let time = new Date(milli);
        return time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear();
    }


    const handleEditCallback = (e) => {
        e.preventDefault();
        editCallback(communication._id);
    }
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="pl-3">
                    <div className="text-base font-semibold">{communication.title}</div>
                </div>
            </th>
            <td className="px-6 py-4">
                {communication.description}
            </td>
            <td className="px-6 py-4">
                {communication.scheduleDate}
            </td>
            <td className="px-6 py-4">
                {getTime(communication.dateCreated)}
            </td>
            <td className="px-6 py-4 flex flex-row items-center justify-center mb-5">
                {/* <AiOutlineEdit className={"text-blue-500 cursor-pointer w-5 h-5"} onClick={handleEditCallback} /> */}
                <AiOutlineDelete className={"ml-5 text-red-500 cursor-pointer w-5 h-5"} onClick={handleDeleteCallback} />
            </td>
        </tr>
    )
}

export default CommunicationRow;