import React from 'react'

export default function ViewGRN() {
    return (
        <div className={style.container}>

            <div className={style.header}>
                View GRN
            </div>

            <div className={style.body}>

                <div className={style.orderDetails}>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">Name</th>
                                <td align="left">
                                    <Controller
                                        name={"customername"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Address</th>
                                <td align="left">
                                    <Controller
                                        name={"customeraddress"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Contact No.</th>
                                <td align="left">
                                    <Controller
                                        name={"contactnumber"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className={style.details}>
                        <tbody>
                            <tr>
                                <th align="left">PO No.</th>
                                <td align="left">
                                    {/* PO2110/004 */}
                                    <Controller
                                        name={"ponumber"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">PO Created at</th>
                                <td align="left">
                                    {/* {dateTime} */}
                                    <Controller
                                        name={"createdat"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th align="left">Supplier</th>
                                <td align="left">
                                    <Controller
                                        name={"supplier"}
                                        control={control}
                                        render={({ field: { value } }) => (
                                            <Typography className={style.input}>
                                                {value}
                                            </Typography>
                                        )}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <MaterialTable

                    components={{
                        Pagination: () => (
                            <td style={{
                                display: "flex",
                                flexDirection: "column"
                            }} >
                                <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Gross Total </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {getTotal()} </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Received Discounts </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {getValues("receiveddiscounts")} </Typography>
                                    </Grid>
                                </Grid><Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Damaged / Expired Items </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {getValues("damagedexpireditems")} </Typography>
                                    </Grid>
                                </Grid><Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                    <Grid item align="Left">
                                        <Typography style={{ fontWeight: 600 }}> Total </Typography>
                                    </Grid>
                                    <Grid item align="Right" style={{ margin: "0px 10px 0px auto" }}>
                                        <Typography style={{ fontWeight: 600 }}> {getTotal()} </Typography>
                                    </Grid>
                                </Grid>
                            </td>
                        )
                    }}
                    columns={[
                        {
                            title: "Description",
                            field: "description",
                            validate: (rowData) =>
                                rowData.description === undefined
                                    ? { isValid: false, helperText: 'Required *' }
                                    : rowData.description === ''
                                        ? { isValid: false, helperText: 'Required *' }
                                        : true

                        },
                        {
                            title: "Unit",
                            field: "unit",
                            lookup: { Case: 'Case', Pieces: 'Pieces' },
                            width: 'min-content',
                            validate: (rowData) =>
                                rowData.unit === undefined
                                    ? { isValid: false, helperText: 'Required *' }
                                    : rowData.unit === ''
                                        ? { isValid: false, helperText: 'Required *' }
                                        : true

                        },
                        {
                            title: "Quantity",
                            field: "quantity",
                            type: 'numeric',
                            cellStyle: {
                                cellWidth: 'min-content'
                            },
                            validate: (rowData) =>
                                rowData.quantity === undefined
                                    ? { isValid: false, helperText: 'Required *' }
                                    : rowData.quantity === ''
                                        ? { isValid: false, helperText: 'Required *' }
                                        : true
                        },
                        {
                            title: "List Price (Rs.)",
                            field: "listprice",
                            type: 'numeric',
                            cellStyle: {
                                cellWidth: 'min-content'
                            },
                            validate: (rowData) =>
                                rowData.listprice === undefined
                                    ? { isValid: false, helperText: 'Required *' }
                                    : rowData.listprice === ''
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
                            render: rowData => rowData.quantity * rowData.listprice,
                            value: rowData => rowData.quantity * rowData.listprice,
                        }
                    ]}
                    data={data}
                    options={{
                        toolbar: false,
                        filtering: true,
                        search: false,
                        minBodyHeight: "calc(100vh - 620px)",
                        maxBodyHeight: "calc(100vh - 620px)",
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

        </div>
    )
}
