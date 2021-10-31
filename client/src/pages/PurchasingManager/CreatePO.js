import React, { useEffect, useState } from 'react';

import MaterialTable, { MTableToolbar } from 'material-table';

//Development Stage
import * as employeeservice from "../../services/employeeService";

//Shared Components
import Page from '../../shared/Page/Page';
import Select from '../../shared/Select/Select';
// import PopUp from '../../shared/PopUp/PopUp';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './CreatePO.module.scss';

//Material UI 

//Material UI Icons
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function CreatePO() {

    const [supplier, setSupplier] = useState();

    const [data, setData] = useState([]);

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const handleChange = e => {
        setSupplier(e.target.value);
    }

    console.log("DATA: ", data);

    return (
        <Page title="Create Purchase Order">

            <div className={style.container}>

                <div className={style.orderDetails}>
                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">Name</th>
                                <td align="left">S.A.K Distributors</td>
                            </tr>
                            <tr>
                                <th align="left">Address</th>
                                <td align="left">No. 233, Kiriwallapitiya, Rambukkana, Srilanka</td>
                            </tr>
                            <tr>
                                <th align="left">Contact No.</th>
                                <td align="left">071 2686790</td>
                            </tr>
                            <tr>
                                <th align="left">Contact Person</th>
                                <td align="left"> Mr. Narada Samarakoon </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">PO No.</th>
                                <td align="left">PO2110/004</td>
                            </tr>
                            <tr>
                                <th align="left">PO Created at</th>
                                <td align="left">{date}</td>
                            </tr>
                            <tr>
                                <th align="left" className={style.selectHeading}>Supplier</th>
                                <td align="left" rowSpan="2">
                                    <Select
                                        className={style.field}
                                        // helperText={errors.supplier && errors.supplier.message}
                                        // error={errors.supplier ? true : false}
                                        onChange={handleChange}
                                        value={supplier || ''}
                                        size="small"
                                        options={employeeservice.getSupplierOptions()}
                                        label="Supplier *"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={style.table}>
                    <MaterialTable
                        title=""
                        // title={<Typography style={{ fontWeight: 600, fontSize: 16 }}>Enter products to be ordered</Typography>}
                        components={{
                            Toolbar: (props) => (
                                <MTableToolbar {...props} />
                            )
                        }}
                        columns={[
                            {
                                title: "Sup. Item ID",
                                field: "itemid",
                                render: rowData => {
                                    return (
                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.itemid}</p>
                                    )
                                }
                            },
                            { 
                                title: "Description", 
                                field: "description" 
                            },
                            { 
                                title: "Unit",
                                 field: "unit", 
                                 lookup: { Case: 'Case', Pieces: 'Pieces' }, 
                                 width: "min-content" 
                                },
                            { 
                                title: "Quantity", 
                                field: "quantity", 
                                type: 'numeric' 
                            },
                            { 
                                title: "Unit Price", 
                                field: "unitprice", 
                                type: 'numeric' 
                            },
                            { 
                                title: "Value", 
                                field: "value", 
                                type: 'numeric' 
                            }
                        ]}
                        data={data}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        setData([...data, newData]);

                                        resolve();
                                    }, 1)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        setData([...dataUpdate]);

                                        resolve();
                                    }, 1)
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataDelete = [...data];
                                        const index = oldData.tableData.id;
                                        dataDelete.splice(index, 1);
                                        setData([...dataDelete]);

                                        resolve()
                                    }, 1)
                                }),
                        }}
                        icons={{
                            Add: () => (
                                <div className={style.addItemBtn}>
                                    <AddCircleIcon className={style.addItemBtn} sx={{ mr: 1 }} />  Add Item
                                </div>
                            )
                        }}
                        options={{
                            toolbar: true,
                            filtering: false,
                            search: false,
                            paging: false,
                            actionsColumnIndex: -1,
                            maxBodyHeight: "calc(100vh - 199.27px)",
                            headerStyle: {
                                position: "sticky",
                                top: "0",
                                backgroundColor: '#20369f',
                                color: '#FFF',
                                fontSize: "0.8em"
                            },
                            rowStyle: rowData => ({
                                fontSize: "0.8em",
                                backgroundColor: (rowData.tableData.id % 2 === 0) ? '#ebebeb' : '#ffffff'
                            })
                        }}
                    />
                </div>

                <table className={style.salesdetails}>
                    <tbody>
                        <tr>
                            <th align="left">Total Value</th>
                            <td align="left">47947.03</td>
                        </tr>
                        <tr>
                            <th align="left">Less Item Discount</th>
                            <td align="left">-</td>
                        </tr>
                        <tr>
                            <th align="left">Less 0.0% Discount</th>
                            <td align="left">-</td>
                        </tr>
                        <tr>
                            <th align="left">Damages</th>
                            <td align="left">-</td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <th align="left" className={style.boldtext}>Invoice Value</th>
                            <td align="left" className={style.boldtext}>47947.03</td>
                        </tr>
                    </tbody>
                </table>


            </div>

        </Page >
    )
}
