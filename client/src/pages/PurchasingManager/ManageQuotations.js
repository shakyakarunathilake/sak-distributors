import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import MaterialTable from 'material-table';

//Shared Components
import Page from '../../shared/Page/Page';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageQuotations.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';

//Quotation Form
import QuotationForm from './QuotationForm';
import ViewQuotation from './ViewQuotation';

//Connecting to Backend
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManageQuotation() {

    const [type, setType] = useState();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState();

    const [records, setRecords] = useState([]);

    const [quotationRecords, setQuotationRecords] = useState(null);
    const [nextQuotationId, setNextQuotationId] = useState('');
    const [action, setAction] = useState('');
    const [openPopup, setOpenPopup] = useState(false);

    const [reRender, setReRender] = useState(null);

    const [file, setFile] = useState(null);

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
            .get("http://localhost:8080/quotations/get-all-quotation-table-data", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setRecords(res.data.tbody);
                setReRender(null);
            })
            .catch(error => {
                console.log(error)
            })
    }, [reRender]);

    const addOrEdit = (quotation, quotationid) => {

        for (let [key, value] of quotation.entries()) {
            console.log(key, value);
        }

        axios
            .post("http://localhost:8080/quotations/create-quotation", quotation, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setAlert(res.data.alert);
                setType(res.data.type);
                handleAlert();
                setReRender(quotationid);
            })
            .catch(err => {
                console.log(err);
            });
        ;

        setQuotationRecords(null);
        setAction('');
        setOpenPopup(false);
    }


    const openInPopup = quotationid => {
        axios
            .get(`http://localhost:8080/quotations/${quotationid}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {

                setQuotationRecords(res.data.quotation);

                axios
                    .get(`http://localhost:8080/quotations/xlsx-file/${quotationid}`, {
                        headers: {
                            'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                        },
                        responseType: 'blob',
                    })
                    .then(res => {
                        setFile(res.data)
                        setOpenPopup(true);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })

    }

    const getNextQuotationId = () => {
        axios
            .get("http://localhost:8080/quotations/get-next-quotationid", {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                setNextQuotationId(res.data.nextquotationid);
                setAction('Create');
                setQuotationRecords(null)
                setOpenPopup(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Page title="Manage Quotations">
            <div className={style.container}>

                <div className={style.actionRow}>
                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={() => getNextQuotationId()}
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Quotation
                    </Button>
                </div>

                <div className={style.pagecontent}>

                    <AutoSizer>
                        {({ height, width }) => {
                            const pageSize = Math.floor((height - 199.27) / 48);
                            return (
                                <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

                                    <MaterialTable
                                        columns={[
                                            {
                                                title: "Quotation ID",
                                                field: "quotationid",
                                                cellStyle: {
                                                    width: "15%",
                                                    textAlign: 'left'
                                                },
                                                render: rowData => {
                                                    return (
                                                        <p style={{ padding: "0", margin: "0", color: "#20369f", fontWeight: "700" }}>{rowData.quotationid}</p>
                                                    )
                                                }
                                            },
                                            {
                                                title: "Supplier",
                                                field: "supplier",
                                                cellStyle: {
                                                    width: "40%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Validity Period",
                                                field: "validityperiod",
                                                cellStyle: {
                                                    width: "15%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "Issuing Date",
                                                field: "issuingdate",
                                                cellStyle: {
                                                    width: "15%",
                                                    textAlign: 'left'
                                                }
                                            },
                                            {
                                                title: "End Date",
                                                field: "enddate",
                                                cellStyle: {
                                                    width: "15%",
                                                    textAlign: 'left'
                                                }
                                            }
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
                                                    openInPopup(rowData.quotationid);
                                                }
                                            },
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
                    fullScreen={true}
                >

                    {
                        action === 'View' &&
                        <ViewQuotation
                            quotationRecords={quotationRecords}
                            setOpenPopup={setOpenPopup}
                            action={action}
                            file={file}
                        />
                    }

                    {
                        action === 'Create' &&
                        <QuotationForm
                            addOrEdit={addOrEdit}
                            setOpenPopup={setOpenPopup}
                            action={action}
                            nextQuotationId={nextQuotationId}
                        />
                    }

                </PopUp>

                <Snackbar
                    open={open}
                    autoHideDuration={1500}
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
