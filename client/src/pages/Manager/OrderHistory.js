import React, { useEffect, useState } from 'react';

import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';

//SCSS styles
import style from './OrderHistory.module.scss';

//Material UI Icons
import VisibilityIcon from '@material-ui/icons/Visibility';

//Connecting to Backend
import axios from 'axios';

//Forms
import ViewOrder from '../SalesRepresentative/ViewOrder';

export default function OrderHistory() {


    const [records, setRecords] = useState([]);

    const [orderRecords, setOrderRecords] = useState({});
    const [openPopup, setOpenPopup] = useState(false);

    const [reRender, setReRender] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8080/orders/get-all-sales-and-invoice-table-data')
            .then(res => {
                sessionStorage.setItem("SalesAndInvoiceTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const handleClosePopUp = () => {
        setOpenPopup(false)
    }

    const openInPopup = orderno => {
        axios
            .get(`http://localhost:8080/orders/${orderno}`)
            .then(res => {
                setOrderRecords(res.data.order);
            })
            .catch(err => {
                console.log(err);
            })

        setOpenPopup(true);
    }

    return (
        <Page title="Order History">

            <div className={style.container}>

                <MaterialTable
                    columns={[
                        {
                            title: "Order ID", field: "orderno", render: rowData => {
                                return (
                                    <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.orderno}</p>
                                )
                            }
                        },
                        { title: "Customer Name", field: "storename" },
                        {
                            title: "Status", field: "status", render: rowData => {
                                return (
                                    rowData.status === 'Pending' ?
                                        <p style={{ padding: "0", margin: "0", color: 'red', fontWeight: "700" }}>{rowData.status}</p>
                                        : rowData.status === 'Processing' ?
                                            <p style={{ padding: "0", margin: "0", color: "#2196F3", fontWeight: "700" }}>{rowData.status}</p>
                                            : rowData.status === 'Shipping' ?
                                                <p style={{ padding: "0", margin: "0", color: "#FF8400", fontWeight: "700" }}>{rowData.status}</p>
                                                : <p style={{ padding: "0", margin: "0", color: "#4caf50", fontWeight: "700" }}>{rowData.status}</p>
                                )
                            }
                        },
                    ]}
                    data={records}
                    options={{
                        toolbar: false,
                        filtering: true,
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
                    actions={[
                        {
                            icon: VisibilityIcon,
                            tooltip: 'View',
                            onClick: (event, rowData) => {
                                openInPopup(rowData.orderno);
                            }
                        }
                    ]}
                />
            </div>

            <PopUp
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ViewOrder
                    handleClosePopUp={handleClosePopUp}
                    orderRecords={orderRecords}
                />
            </PopUp>
        </Page>
    )
}
