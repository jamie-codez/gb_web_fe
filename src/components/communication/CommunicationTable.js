import React from "react";
import Row from "../../pages/home/Dashboard";


const CommunicationTable = ({ data, editCallback, deleteCallback }) => {
    return (
        <div>
            {
                data.length === 0 ? <div className={"flex flex-col justify-center items-center"}>
                    <h2 className={"text-xl font-bold mt-20"}>No data available</h2>
                </div> : <div className={"table"}>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((userData, index) => {
                                return <Row user={userData} editCallback={editCallback} deleteCallback={deleteCallback} />
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

export default CommunicationTable;