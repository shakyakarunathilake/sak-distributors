import React, { useEffect, useMemo, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

//Shared Components
import PopUp from '../../shared/PopUp/PopUp';

//Material UI 
import Divider from '@mui/material/Divider';
import Select from '../../shared/Select/Select';
import { Button, Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { TextField as MuiTextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';

//Dialog Content
import ResetForm from './ResetForm';
import Quotations from './Quotations';

//Material Table
import MaterialTable, { MTableAction, MTableToolbar } from 'material-table';

//SCSS styles
import style from './StepOne.module.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    row1: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "5px 0 2.5px 0"
        },
    },
    row2: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "2.5px 0 5px 0"
        },
    }
});

export default function StepOne(props) {

    const classes = useStyles();

    const {
        data,
        setData,
        poRecords,
        setOrderFormData,
        setConfirmation,
        handleClosePopUp,
        resetFormOpenPopup,
        setResetFormOpenPopup,
        handleResetFormClosePopUp,
        completeFormStep,
        supplierOptions,
        productOptions,
    } = props;

    const addActionRef = useRef();

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    const podate = today.getFullYear().toString().substr(-2) + (today.getMonth() + 1) + today.getDate() + today.getHours() + today.getMinutes();

    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;
    const designation = JSON.parse(sessionStorage.getItem("Auth")).designation;

    const { getValues, setValue, reset, trigger, control, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        defaultValues: {
            ponumber: poRecords ? poRecords.ponumber : '',
            supplier: poRecords ? poRecords.supplier : '',
            grosstotal: poRecords ? poRecords.grosstotal : 0,
            receiveddiscounts: poRecords ? poRecords.receiveddiscounts : 0,
            damagedmissingitems: poRecords ? poRecords.damagedmissingitems : 0,
            total: poRecords ? poRecords.total : 0,
            // customerid: poRecords ? poRecords.customerid : '',
            customername: poRecords ? poRecords.customername : "S.A.K Distributors",
            customeraddress: poRecords ? poRecords.customeraddress : "No.233, Kiriwallapitiya, Rambukkana, Sri Lanka",
            contactnumber: poRecords ? poRecords.contactnumber : "0352264009",
            status: poRecords ? poRecords.status : '',
            createdby: poRecords ? poRecords.createdby : `${firstname} ${lastname} (${employeeid})`,
            createdat: poRecords ? poRecords.createdat : '',
            approvedby: poRecords ? poRecords.approvedby : '',
            approvedat: poRecords ? poRecords.approvedat : '',
            deliveredat: poRecords ? poRecords.deliveredat : '',
        }
    });

    useEffect(() => {
        if (poRecords != null) {
            setData([...poRecords.items])
        }
    }, [setData, poRecords])

    const getProductItemList = useMemo(() => {
        const selectedDescriptions = data.map(x => x.description);
        // console.log("SELECTED DESCRIPTIONS: ", selectedDescriptions);
        const supplierProducts = productOptions.filter(x => x.supplier === getValues('supplier'));
        // console.log("SUPPLIER PRODUCTS: ", supplierProducts);
        const productItemList = supplierProducts.filter(x => selectedDescriptions.indexOf(x.name) === -1);
        // console.log("PRODUCT ITEM LIST: ", productItemList);

        return productItemList;
    }, [data, getValues('supplier'), getValues, productOptions]);

    const resetForm = () => {
        handleResetFormClosePopUp();
        reset();
        setData([]);
    }

    const getGrossTotal = () => {
        let grosstotal = 0;
        for (let i = 0; i < data.length; i++) {
            grosstotal = grosstotal + data[i].value;
        }
        setValue("grosstotal", grosstotal);
        return grosstotal;
    }

    const handleAddNewItem = () => {
        if (!!getValues('supplier')) {
            addActionRef.current.click();
        } else {
            trigger('supplier', { shouldFocus: true });
        }
    }

    const onSubmit = () => {

        const supplier = supplierOptions.filter(x => x.title === getValues("supplier"))

        if (poRecords === null) {
            setValue("ponumber", supplier[0].abbreviation + podate);
            setValue("createdat", dateTime);
            setValue("status", 'Waiting For Approval');
        }

        if (designation === 'Distributor') {
            setValue("approvedby", `${firstname} ${lastname} (${employeeid})`);
            setValue("approvedat", dateTime);
            setValue("status", 'Pending');
        }


        setValue('total', getValues('grosstotal') - (getValues('receiveddiscounts') + getValues('damagedmissingitems')));

        setOrderFormData(getValues());
        setConfirmation(true);
        completeFormStep();
    }

    return (
        <div className={style.one}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Create Purchase Order
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { handleClosePopUp() }}
                        />
                    </div>
                </div>

                <div className={style.step}>
                    Step 1 of 2
                </div>

            </div>

            <div className={style.body}>

                <div className={style.purchaseOrder}>

                    <div className={style.btnRow}>

                        <Controller
                            defaultValue=''
                            name={'supplier'}
                            control={control}
                            rules={{
                                required: { value: true, message: "Supplier is required" },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    fullWidth
                                    helperText={errors.supplier && errors.supplier.message}
                                    error={errors.supplier ? true : false}
                                    options={supplierOptions || []}
                                    onChange={e => {
                                        onChange(e);
                                        // setSelectedProductOptions(productOptions.filter(x => x.supplier === getValues('supplier')));
                                    }}
                                    size="small"
                                    label="Supplier *"
                                    value={value}
                                    disabled={data.length > 0 ? true : false}
                                />
                            )}
                        />

                        <div> </div>

                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleAddNewItem()}
                        >
                            Add new item
                        </Button>

                    </div>

                    <MaterialTable
                        components={{
                            Container: props => <Paper {...props} elevation={1} />,
                            Action: props => {
                                //If isn't the add action
                                if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
                                    return <MTableAction {...props} />
                                } else {
                                    return <div ref={addActionRef} onClick={props.action.onClick} />;
                                }
                            },
                            Toolbar: (props) => (
                                <div
                                    style={{
                                        height: "0px",
                                    }}
                                >
                                    <MTableToolbar {...props} />
                                </div>
                            ),
                            Pagination: () => (
                                <td style={{
                                    display: "flex",
                                    flexDirection: "column"
                                }} >
                                    <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                        <Grid item align="Left">
                                            <Typography style={{ fontWeight: 600 }}> Gross Total (Rs.) </Typography>
                                        </Grid>
                                        <Grid item align="Right" style={{ margin: "0px 102.56px 0px auto" }}>
                                            <Typography style={{ fontWeight: 600 }}> {getGrossTotal()} </Typography>
                                        </Grid>
                                    </Grid>
                                </td>
                            ),
                            Header: props => (
                                <TableHead {...props} style={{ position: 'sticky', top: '0', zIndex: 99999 }}>
                                    <TableRow className={classes.row1}>
                                        <TableCell width="26%" padding="none" rowSpan={2}>
                                            <div style={{ padding: '0 10px' }}>
                                                Description
                                            </div>
                                        </TableCell>
                                        <TableCell width="6%" padding="none" rowSpan={2} align="center">
                                            <div style={{ padding: '0 10px' }}>
                                                Pieces per case
                                            </div>
                                        </TableCell>
                                        <TableCell width="6%" padding="none" rowSpan={2} align="center">
                                            <div style={{ padding: '0 10px' }}>
                                                List Price
                                            </div>
                                        </TableCell>
                                        <TableCell padding="none" colSpan={2} align="center">
                                            Sales Qty.
                                        </TableCell>
                                        <TableCell padding="none" colSpan={2} align="center">
                                            Free Qty.
                                        </TableCell>
                                        <TableCell padding="none" colSpan={2} align="center">
                                            Return Qty.
                                        </TableCell>
                                        <TableCell padding="none" width="10%" rowSpan={2} align="center">
                                            <div style={{ padding: '0 10px' }}>
                                                Value
                                            </div>
                                        </TableCell>
                                        <TableCell padding="none" width="11%" rowSpan={2} align="center">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className={classes.row2}>
                                        <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                        <TableCell width="6%" padding="none" align="center">Pcs</TableCell>
                                        <TableCell width="6%" padding="none" align="center">Cs</TableCell>
                                        <TableCell width="6%" padding="none" align="center">Pcs</TableCell>
                                        <TableCell width="6%" padding="none" align="center">D</TableCell>
                                        <TableCell width="6%" padding="none" align="center">R</TableCell>
                                    </TableRow>
                                </TableHead>
                            ),
                        }}
                        columns={[
                            {
                                title: "Description",
                                field: "description",
                                editComponent: props => (
                                    <Autocomplete
                                        // options={selectedProductOptions || []}
                                        options={getProductItemList}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(e, option) => {
                                            let data = { ...props.rowData };
                                            data.description = e.target.innerText;
                                            props.onRowDataChange(data);
                                        }}
                                        inputValue={props.value}
                                        renderInput={(params) =>
                                            <MuiTextField
                                                {...params}
                                                helperText={props.helperText}
                                                error={props.error}
                                                variant="standard"
                                            />
                                        }
                                    />
                                ),
                                validate: (rowData) =>
                                    rowData.description === undefined
                                        ? { isValid: false, helperText: 'Required *' }
                                        : rowData.description === ''
                                            ? { isValid: false, helperText: 'Required *' }
                                            : true

                            },
                            {
                                title: "Pieces Per Cases",
                                field: "piecespercase",
                                type: 'numeric',
                                cellStyle: {
                                    padding: "10px 5px 10px 7px",
                                    width: '6%',
                                    textAlign: 'center'
                                },
                                editComponent: props =>
                                    <MuiTextField
                                        onChange={e => {
                                            let data = { ...props.rowData };
                                            data.piecespercase = e.target.value;
                                            let salesqtycases = isNaN(data.salesqtycases) ? 0 : data.salesqtycases;
                                            let salesqtypieces = isNaN(data.salesqtypieces) ? 0 : data.salesqtypieces;
                                            let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                            let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                            data.value = ((salesqtycases * piecespercase) + +salesqtypieces) * listprice;
                                            props.onRowDataChange(data);
                                        }}
                                        type="number"
                                        helperText={props.helperText}
                                        error={props.error}
                                        variant="standard"
                                        value={props.value}
                                    />
                                ,
                                validate: (rowData) =>
                                    rowData.piecespercase === undefined
                                        ? { isValid: false, helperText: 'Required *' }
                                        : rowData.piecespercase === ''
                                            ? { isValid: false, helperText: 'Required *' }
                                            : true
                            },
                            {
                                field: "listprice",
                                type: 'numeric',
                                cellStyle: {
                                    padding: "10px 5px 10px 7px",
                                    width: '6%',
                                    textAlign: 'center'
                                },
                                validate: (rowData) =>
                                    rowData.listprice === undefined
                                        ? { isValid: false, helperText: 'Required *' }
                                        : rowData.listprice === ''
                                            ? { isValid: false, helperText: 'Required *' }
                                            : true


                            },
                            {
                                title: "Sales Cs",
                                field: "salesqtycases",
                                type: 'numeric',
                                cellStyle: {
                                    padding: "10px 5px 10px 7px",
                                    width: '6%',
                                    textAlign: 'center'
                                },
                                editComponent: props =>
                                    <MuiTextField
                                        onChange={e => {
                                            let data = { ...props.rowData };
                                            data.salesqtycases = e.target.value;
                                            let salesqtycases = isNaN(data.salesqtycases) ? 0 : data.salesqtycases;
                                            let salesqtypieces = isNaN(data.salesqtypieces) ? 0 : data.salesqtypieces;
                                            let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                            let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                            data.value = ((salesqtycases * piecespercase) + +salesqtypieces) * listprice;
                                            props.onRowDataChange(data);
                                        }}
                                        type="number"
                                        helperText={props.helperText}
                                        error={props.error}
                                        variant="standard"
                                        value={props.value}
                                    />
                                ,
                                validate: (rowData) =>
                                    rowData.salesqtycases === undefined
                                        ? { isValid: false, helperText: 'Required *' }
                                        : rowData.salesqtycases === ''
                                            ? { isValid: false, helperText: 'Required *' }
                                            : true

                            },
                            {
                                title: "Sales Pcs",
                                field: "salesqtypieces",
                                type: 'numeric',
                                cellStyle: {
                                    width: '6%',
                                    padding: "10px 5px 10px 7px",
                                    textAlign: 'center'
                                },
                                editComponent: props =>
                                    <MuiTextField
                                        onChange={e => {
                                            let data = { ...props.rowData };
                                            data.salesqtypieces = e.target.value;
                                            let salesqtycases = isNaN(data.salesqtycases) ? 0 : data.salesqtycases;
                                            let salesqtypieces = isNaN(data.salesqtypieces) ? 0 : data.salesqtypieces;
                                            let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                            let listprice = isNaN(data.listprice) ? 0 : data.listprice;
                                            data.value = ((salesqtycases * piecespercase) + +salesqtypieces) * listprice;
                                            props.onRowDataChange(data);
                                        }}
                                        type="number"
                                        helperText={props.helperText}
                                        error={props.error}
                                        variant="standard"
                                        value={props.value}
                                    />
                                ,
                                validate: (rowData) =>
                                    rowData.salesqtypieces === undefined
                                        ? { isValid: false, helperText: 'Required *' }
                                        : rowData.salesqtypieces === ''
                                            ? { isValid: false, helperText: 'Required *' }
                                            : true

                            },
                            {
                                title: "Free Cs",
                                field: "freeqtycases",
                                type: 'numeric',
                                initialEditValue: 0,
                                cellStyle: {
                                    width: '6%',
                                    padding: "10px 5px 10px 7px",
                                    textAlign: 'center'
                                },
                                validate: (rowData) =>
                                    rowData.freeqtycases === undefined
                                        ? { isValid: false, helperText: 'Required *' }
                                        : rowData.freeqtycases === ''
                                            ? { isValid: false, helperText: 'Required *' }
                                            : true

                            },
                            {
                                title: "Free Pcs",
                                field: "freeqtypieces",
                                type: 'numeric',
                                initialEditValue: 0,
                                cellStyle: {
                                    width: '6%',
                                    padding: "10px 5px 10px 7px",
                                    textAlign: 'center'
                                },
                                validate: (rowData) =>
                                    rowData.freeqtypieces === undefined
                                        ? { isValid: false, helperText: 'Required *' }
                                        : rowData.freeqtypieces === ''
                                            ? { isValid: false, helperText: 'Required *' }
                                            : true

                            },
                            {
                                title: "Damaged",
                                field: "damaged",
                                type: 'numeric',
                                initialEditValue: 0,
                                cellStyle: {
                                    width: '6%',
                                    padding: "10px 5px 10px 7px",
                                    textAlign: 'center'
                                },
                                validate: (rowData) =>
                                    rowData.damaged === undefined
                                        ? { isValid: false, helperText: 'Required *' }
                                        : rowData.damaged === ''
                                            ? { isValid: false, helperText: 'Required *' }
                                            : true

                            },
                            {
                                title: "Return",
                                field: "return",
                                type: 'numeric',
                                initialEditValue: 0,
                                cellStyle: {
                                    width: '6%',
                                    padding: "10px 5px 10px 7px",
                                    textAlign: 'center'
                                },
                                validate: (rowData) =>
                                    rowData.return === undefined
                                        ? { isValid: false, helperText: 'Required *' }
                                        : rowData.return === ''
                                            ? { isValid: false, helperText: 'Required *' }
                                            : true

                            },
                            {
                                title: "Value (Rs.)",
                                field: "value",
                                type: 'numeric',
                                cellStyle: {
                                    width: 'min-content'
                                },
                                editable: 'never',
                            }
                        ]}
                        data={data}
                        editable={{
                            onRowAdd: (newData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        setData(prevData => [...prevData, newData]);

                                        resolve();
                                    }, 100);
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
                            Delete: () => (
                                <div>
                                    <DeleteIcon className={style.deleteItemBtn} />
                                </div>
                            )
                        }}
                        options={{
                            addRowPosition: "first",
                            toolbar: true,
                            filtering: true,
                            search: false,
                            pageSize: 999,
                            maxBodyHeight: "calc(100vh - 300px)",
                            minBodyHeight: "calc(100vh - 300px)",
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
                                backgroundColor: (rowData.tableData.id % 2 === 1) ? '#ebebeb' : '#ffffff'
                            })
                        }}
                    />

                </div>

                <Divider
                    className={style.divider}
                    orientation="vertical"
                    variant="middle"
                />

                <Quotations />

            </div>

            <div className={style.footer}>

                <div className={style.resetBtn}>
                    <Button
                        // disabled={!isValid && data.length === 0}
                        variant="contained"
                        onClick={e => setResetFormOpenPopup(true)}
                    >
                        Reset
                    </Button>
                </div>

                <div className={style.nextBtn}>
                    <Button
                        disabled={!isValid && data.length === 0}
                        color="primary"
                        variant="contained"
                        onClick={onSubmit}
                    >
                        Next
                    </Button>
                </div>

            </div>

            <PopUp
                openPopup={resetFormOpenPopup}
                setOpenPopup={setResetFormOpenPopup}
            >

                <ResetForm
                    handleClosePopUp={handleResetFormClosePopUp}
                    resetForm={resetForm}
                />

            </PopUp>

        </div>
    )
}
