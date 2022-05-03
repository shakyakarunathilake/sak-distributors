import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import jsPDF from "jspdf";
import * as html2canvas from 'html2canvas';

//Material UI Components
import { Button } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Shared functions 
import NumberWithCommas from '../NumberWithCommas';

//SCSS Styling
import style from './PrintOrder.module.scss';


export default function PrintOrder(props) {

    const { handleClosePopUp, orderRecords } = props;

    const [data, setData] = useState([]);

    const { watch, getValues } = useForm({
        mode: "all",
        defaultValues: {
            orderno: orderRecords.orderno,
            contactnumber: orderRecords.contactnumber,
            customertype: orderRecords.customertype,
            customerid: orderRecords.customerid,
            storename: orderRecords.storename,
            deliverydate: orderRecords.deliverydate,
            deliveredat: orderRecords.deliveredat,
            deliveredby: orderRecords.deliveredby,
            status: orderRecords.status,
            orderplacedat: orderRecords.orderplacedat,
            route: orderRecords.route,
            ordercreatedby: orderRecords.ordercreatedby,
            shippingaddress: orderRecords.shippingaddress,
            total: orderRecords.total,
            loyaltypoints: orderRecords.loyaltypoints,
            minimumpayment: orderRecords.minimumpayment,
            advancepayment: orderRecords.advancepayment,
            creditamounttosettle: orderRecords.creditamounttosettle,
            eligibilityforcredit: orderRecords.eligibilityforcredit,
            maximumcreditamount: orderRecords.maximumcreditamount,
            currentinvoicecreditamount: orderRecords.currentinvoicecreditamount,
            invoicesettlementvalue: orderRecords.invoicesettlementvalue
        }
    });

    useEffect(() => {
        if (orderRecords != null) {
            setData(orderRecords.items);
        }
    }, [orderRecords])

    const printPdf = () => {

        html2canvas(document.querySelector("#pdf")).then(function (canvas) {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "pt", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${getValues('orderno')}.pdf`);
        });

    };

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Print Invoice
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={handleClosePopUp}
                        />
                    </div>
                </div>

            </div>

            <div className={style.body} >

                <div style={{ width: '210mm', minHeight: '297mm', padding: "10px", fontSize: '0.8em' }} id="pdf" >

                    <b>
                        <center>
                            S.A.K DISTRIBUTORS
                            <br />
                            NO.233, KIRIWALLAPITIYA, RAMBUKKANA
                            <br />
                            {watch("ordercreatedby").toUpperCase()}
                            <br />
                            0777159150
                        </center>
                    </b>

                    <br />

                    <table style={{ width: '210mm', tableLayout: 'fixed' }}>
                        <tr>
                            <td>
                                INVOICE NO : {watch("orderno").toUpperCase()}
                            </td>
                            <td>
                                CUSTOMER : {watch("storename").toUpperCase()} - {watch("customerid")}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                ADDRESS : {watch("shippingaddress").toUpperCase()}
                            </td>
                            <td>
                                ROUTE : {watch("route").toUpperCase()}
                            </td>
                        </tr>

                    </table>

                    <br />

                    <table style={{ width: '210mm', borderStyle: 'dashed', borderWidth: '1px 0px' }}>

                        <tr style={{ borderStyle: 'dashed', borderWidth: '0px 0px 1px 0px' }}>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '3px' }} rowspan="2">
                                #
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '3px' }} rowspan="2">
                                ITEM
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '3px' }} rowspan="2">
                                MRP
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '3px' }} colSpan="2">
                                SALES QTY
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '3px' }} colSpan="2">
                                FREE QTY
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '3px' }} rowspan="2">
                                RATE
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', padding: '3px' }} rowspan="2">
                                AMOUNT
                            </td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '3px' }}>
                                CS
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '3px' }}>
                                PCS
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '3px' }}>
                                CS
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '3px' }}>
                                PCS
                            </td>
                        </tr>

                        {
                            data.map((item, i) => (
                                <tr>
                                    <td style={{ textAlign: "left", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {i}
                                    </td>
                                    <td style={{ textAlign: "left", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.name.toUpperCase()}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {NumberWithCommas(item.mrp)}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.salesqtycases}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.salesqtypieces}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.freeqtycases}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.freeqtypieces}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {NumberWithCommas(item.sellingprice)}
                                    </td>
                                    <td style={{ textAlign: "right", padding: '3px' }}>
                                        {NumberWithCommas(item.grossamount)}
                                    </td>
                                </tr>
                            ))
                        }

                    </table>

                    <br />

                    <table style={{ width: '210mm' }}>
                        <tr>
                            <td style={{ paddingLeft: "120mm" }}>PREVIOUS CREDIT AMOUNT TO SETTLE</td>
                            <td style={{ textAlign: "right" }}>{NumberWithCommas(watch("creditamounttosettle"))}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: "120mm" }}>CURRENT INVOICE TOTAL</td>
                            <td style={{ textAlign: "right" }}>{NumberWithCommas(watch("total"))}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: "120mm" }}>CURRENT INVOICE ADVANCE PAYMENT</td>
                            <td style={{ textAlign: "right" }}>{NumberWithCommas(watch("advancepayment"))}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: "120mm" }}>CURRENT INVOICE CREDIT AMOUNT</td>
                            <td style={{ textAlign: "right" }}>{NumberWithCommas(watch("currentinvoicecreditamount"))}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: "120mm" }}>MINIMUM PAYMENT</td>
                            <td style={{ textAlign: "right" }}>{NumberWithCommas(watch("minimumpayment"))}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: "120mm" }}>INVOICE SETTLEMENT VALUE</td>
                            <td style={{ textAlign: "right" }}>{NumberWithCommas(watch("invoicesettlementvalue"))}</td>
                        </tr>
                    </table>

                </div>

            </div>


            <div className={style.footer}>

                <div className={style.cancelBtn}>
                    <Button
                        onClick={handleClosePopUp}
                        variant="contained"
                    >
                        Cancel
                    </Button>
                </div>

                <div className={style.viewBtn}>

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => printPdf()}
                    >
                        Print
                    </Button>

                </div>

            </div>

        </div >
    )
}
