import React from "react";
import TenantRow from "./TenantRow";


const TenantTable = ({ data, editCallback, deleteCallback }) => {
    return (
        <div>
            {
                data.length === 0 ? <div className={"flex flex-col justify-center items-center"}>
                    <h2 className={"text-xl font-bold mt-20"}>No data available</h2>
                </div> : <div className={"table w-full"}>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Index
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tenant Details
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    House Details
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Active
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((house, index) => {
                                return <TenantRow index={index} house={house} editCallback={editCallback} deleteCallback={deleteCallback} />
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

export default TenantTable;