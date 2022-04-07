import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageSupplier.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Supplier Form
import SupplierForm from './SupplierForm';
import ViewSupplier from './ViewSupplier';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageSupplier() {

    const [type, setType] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [alert, setAlert] = React.useState();

    const [records, setRecords] = useState([]);

    const [supplierRecords, setSupplierRecords] = useState(null);
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const [nextSupId, setNextSupId] = useState();
    const [reRender, setReRender] = useState(null);

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/suppliers/get-all-supplier-table-data", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                sessionStorage.setItem("SupplierTableData", JSON.stringify(res.data));
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const addOrEdit = (supplier, supplierid) => {

        for (let [key, value] of supplier.entries()) {
            console.log(key, value);
        }

        if (action === "Create") {
            axios
                .post("http://localhost:8080/suppliers/create-supplier", supplier, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(supplierid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        if (action === "Edit") {
            axios
                .post(`http://localhost:8080/suppliers/update-by-id/${supplierid}`, supplier, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setAlert(res.data.alert);
                    setType(res.data.type);
                    handleAlert();
                    setReRender(supplierid);
                })
                .catch(err => {
                    console.log(err);
                });
            ;
        }

        setSupplierRecords(null)
        setOpenPopup(false);
        setAction('');
    }

    const openInPopup = supplierid => {
        axios
            .get(`http://localhost:8080/suppliers/${supplierid}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setSupplierRecords(res.data.supplier);
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getNextSupplierId = () => {
        axios
            .get("http://localhost:8080/suppliers/get-next-regno", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setNextSupId(res.data.nextsupplierid);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Page title="Manage Suppliers">

            <div className={style.container}>

                <div className={style.actionRow}>

                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                setAction('Create');
                                getNextSupplierId();
                                setOpenPopup(true);
                                setSupplierRecords(null);
                            }
                        }
                    >

                        <AddCircleIcon className={style.icon} />
                        Add New Supplier

                    </Button>

                </div>

                <div className={style.pagecontent}>

                    <AutoSizer>
                        {({ height, width }) => {
                            const pageSize = Math.floor((height - 199.28) / 48);
                            return (
                                <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

                                    <MaterialTable
                                        columns={[
                                            {
                                                title: "Sup. ID",
                                                field: "supplierid",
                                                cellStyle: {
                                                    width: "10%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.supplierid}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Name",
                                                field: "name",
                                                cellStyle: {
                                                    width: "18%",
                                                    textAlign: 'left'
                                                },
                                            },
                                            {
                                                title: "Abbreviation",
                                                field: "abbreviation",
                                                cellStyle: {
                                                    width: "10%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.abbreviation}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Given ID",
                                                field: "givenid",
                                                cellStyle: {
                                                    width: "10%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.givenid}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Contact Person",
                                                field: "contactperson",
                                                cellStyle: {
                                                    width: "20%",
                                                    textAlign: 'left'
                                                },
                                            },
                                            {
                                                title: "Contact No.",
                                                field: "contactnumber",
                                                cellStyle: {
                                                    width: "10%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0" }}>0{rowData.contactnumber}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Email",
                                                field: "email",
                                                cellStyle: {
                                                    width: "17%",
                                                    textAlign: 'left'
                                                },
                                            },
                                        ]}
                                        data={records}
                                        options={{
                                            pageSize: pageSize,
                                            pageSizeOptions: [],
                                            paging: true,
                                            toolbar: false,
                                            filtering: true,
                                            search: false,
                                            actionsColumnIndex: -1,
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
                                                    setAction('View');
                                                    openInPopup(rowData.supplierid);
                                                }
                                            },
                                            {
                                                icon: 'edit',
                                                tooltip: 'Edit',
                                                onClick: (event, rowData) => {
                                                    setAction('Edit');
                                                    openInPopup(rowData.supplierid);
                                                }
                                            }
                                        ]}
                                    />
                                </div>
                            );
                        }}
                    </AutoSizer>

                </div>

                <PopUp
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >

                    {
                        action === 'View' &&
                        <ViewSupplier
                            supplierRecords={supplierRecords}
                            setOpenPopup={setOpenPopup}
                            setAction={setAction}
                            action={action}
                        />
                    }

                    {
                        (action === 'Create' || action === 'Edit') &&
                        <SupplierForm
                            addOrEdit={addOrEdit}
                            supplierRecords={supplierRecords}
                            setOpenPopup={setOpenPopup}
                            nextSupId={nextSupId}
                            action={action}
                        />
                    }

                </PopUp>

                <Snackbar
                    open={open}
                    autoHideDuration={2500}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={type}
                        sx={{ width: '100%' }}
                    >
                        {alert}
                    </Alert>
                </Snackbar>

            </div>

        </Page>
    )
}
