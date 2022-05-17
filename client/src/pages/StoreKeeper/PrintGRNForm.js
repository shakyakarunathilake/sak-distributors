import React, { useEffect, useState } from 'react';
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
import style from './PrintGRNForm.module.scss';

export default function PrintGRNForm(props) {

    const { GRNRecords, handleClosePopUp } = props;

    const [data, setData] = useState([]);

    const { getValues } = useForm({
        mode: "all",
        defaultValues: {
            ponumber: GRNRecords.ponumber,
            grnnumber: GRNRecords.grnnumber,
            supplier: GRNRecords.supplier,
            pototal: GRNRecords.pototal,
            status: GRNRecords.status,
            givenid: GRNRecords.givenid,
            createdat: GRNRecords.createdat,
            createdby: GRNRecords.createdby,
            damagedmissingitems: GRNRecords.damagedmissingitems,
            grntotal: GRNRecords.grntotal,
            customername: "S.A.K Distributors",
            customeraddress: "No.233, Kiriwallapitiya, Rambukkana, Srilanka",
            contactnumber: "0352264009",
        }
    });

    useEffect(() => {
        setData(GRNRecords.items);
    }, [GRNRecords, setData])

    const printPdf = () => {
        html2canvas(document.querySelector("#pdf")).then(function (canvas) {
            var imgData = canvas.toDataURL('image/png');
            var imgWidth = 210;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var doc = new jsPDF('p', 'mm');
            var position = 0;

            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            doc.save(`${getValues('grnnumber')}.pdf`);
        });

        // html2canvas(document.querySelector("#pdf")).then(function (canvas) {
        //     const imgData = canvas.toDataURL('image/png');
        //     const pdf = new jsPDF("p", "pt", "a4");
        //     const imgProps = pdf.getImageProperties(imgData);
        //     const pdfWidth = pdf.internal.pageSize.getWidth();
        //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        //     pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        //     pdf.save(`${getValues('grnnumber')}.pdf`);
        // });

    };

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Print GRN: {getValues("grnnumber").toUpperCase()}
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

                <div style={{ width: '210mm', minHeight: 'min-content', padding: "10px", fontSize: '0.8em' }} id="pdf" >

                    <b>
                        <center>
                            {getValues("customername").toUpperCase()} - {getValues("givenid")}
                            <br />
                            {getValues("customeraddress").toUpperCase()}
                            <br />
                            {getValues("contactnumber")}
                        </center>
                    </b>

                    <br />

                    <table style={{ width: '210mm', tableLayout: 'fixed' }}>
                        <tr>
                            <td>SUPPLIER : {getValues("supplier").toUpperCase()}</td>
                            <td>CREATED AT : {getValues("createdat").toUpperCase()}</td>
                        </tr>
                        <tr>
                            <td>PO NO : {getValues("ponumber").toUpperCase()}</td>
                            <td>CREATED BY : {getValues("createdby").toUpperCase()}</td>
                        </tr>
                        <tr>
                            <td>GRN NO : {getValues("grnnumber").toUpperCase()}</td>
                        </tr>
                    </table>

                    <br />

                    <table style={{ width: '210mm', borderStyle: 'dashed', borderWidth: '1px 0px' }}>
                        <tr style={{}}>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} rowspan="2">
                                #
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} rowspan="2">
                                PROD. ID
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} rowspan="2">
                                DESCRIPTION
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} rowspan="2">
                                RATE
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} colSpan="2">
                                SALES QTY
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} colSpan="2">
                                D. SALES QTY
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} colSpan="2">
                                FREE QTY
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} colSpan="2">
                                D. FREE QTY
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} colSpan="2">
                                DAMAGED (PCS)
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} rowspan="2">
                                GRN VALUE
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', padding: '2px' }} rowspan="2">
                                PO VALUE
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }}>
                                CS
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }}>
                                PCS
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }}>
                                CS
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }}>
                                PCS
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }}>
                                CS
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }}>
                                PCS
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }}>
                                CS
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }}>
                                PCS
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }}>
                                FREE
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '1px' }}>
                                SALES
                            </td>
                        </tr>
                        {
                            data.map((item, i) => (
                                <tr>
                                    <td style={{ textAlign: "left", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {i + 1}
                                    </td>
                                    <td style={{ textAlign: "left", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.productid}
                                    </td>
                                    <td style={{ textAlign: "left", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.description.toUpperCase()}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {NumberWithCommas(item.listprice)}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.salesqtycases}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.salesqtypieces}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.deliveredsalesqtycases}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.deliveredsalesqtypieces}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.freeqtycases}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.freeqtypieces}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.deliveredfreeqtycases}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.deliveredfreeqtypieces}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.damagedsalesqty}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.damagedfreeqty}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {NumberWithCommas(item.grnvalue)}
                                    </td>
                                    <td style={{ textAlign: "right", padding: '3px' }}>
                                        {NumberWithCommas(item.value)}
                                    </td>
                                </tr>
                            ))
                        }
                    </table>

                    <br />

                    <table style={{ width: '210mm' }}>
                        <tr>
                            <td style={{ paddingLeft: "120mm" }}>PURCHASE ORDER TOTAL</td>
                            <td style={{ textAlign: "right" }}>{NumberWithCommas(getValues("pototal"))}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: "120mm" }}>DAMAGED / MISSING ITEMS</td>
                            <td style={{ textAlign: "right" }}>{NumberWithCommas(getValues("damagedmissingitems"))}</td>
                        </tr>
                        <tr>
                            <td style={{ paddingLeft: "120mm" }}>GRN TOTAL</td>
                            <td style={{ textAlign: "right" }}>{NumberWithCommas(getValues("grntotal"))}</td>
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

        </div>
    )
}
