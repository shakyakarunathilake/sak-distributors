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
import style from './PrintGINForm.module.scss';

export default function PrintGINForm(props) {

    const { GINRecords, handleClosePopUp } = props;

    const [data, setData] = useState([]);

    const { getValues } = useForm({
        mode: "onChange",
        defaultValues: {
            ginnumber: GINRecords.ginnumber,
            createdat: GINRecords.createdat,
            createdby: GINRecords.createdby,
            route: GINRecords.route,
            total: GINRecords.total,
            vehicle: GINRecords.vehicle ? GINRecords.vehicle : '',
            incharge: GINRecords.incharge ? GINRecords.incharge : '',
        }
    });

    useEffect(() => {
        if (GINRecords != null) {
            setData([...GINRecords.items]);
        }
    }, [setData, GINRecords])

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
            doc.save(`${getValues('ginnumber')}.pdf`);
        });

        // html2canvas(document.querySelector("#pdf")).then(function (canvas) {
        //     const imgData = canvas.toDataURL('image/png');
        //     const pdf = new jsPDF("p", "pt", "a4");
        //     const imgProps = pdf.getImageProperties(imgData);
        //     const pdfWidth = pdf.internal.pageSize.getWidth();
        //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        //     pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        //     pdf.save(`${ getValues('ginnumber') }.pdf`);
        // });

    };

    return (

        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Print GRN: {getValues("ginnumber").toUpperCase()}
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
                            S.A.K DISTRIBUTORS
                            <br />
                            NO.233, KIRIWALLAPITIYA, RAMBUKKANA
                            <br />
                            0352264009
                        </center>
                    </b>
                    <br />

                    <table style={{ width: '210mm', tableLayout: 'fixed' }}>
                        <tr>
                            <td>GIN NO : {getValues("ginnumber").toUpperCase()}</td>
                            <td>ROUTE : {getValues("route").toUpperCase()}</td>
                        </tr>
                        <tr>
                            <td>CREATED AT : {getValues("createdat").toUpperCase()}</td>
                            <td>CREATED BY : {getValues("createdby").toUpperCase()}</td>
                        </tr>
                        <tr>
                            <td>IN CHARGE : {getValues("incharge").toUpperCase()}</td>
                            <td>VEHICLE : {getValues("vehicle").toUpperCase()}</td>
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
                                <br />
                                VAR. ID
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} rowspan="2">
                                DESCRIPTION
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} rowspan="2">
                                SELLING PRICE
                                <br />
                                (RS.)
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} rowSpan="2">
                                PIECES PER CASE
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} colSpan="2">
                                SALES QTY
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} colSpan="2">
                                FREE QTY
                            </td>
                            <td style={{ textAlign: "center", borderBottom: '1px dashed grey', borderRight: '1px dashed grey', padding: '2px' }} rowspan="2">
                                GROSS AMOUNT
                                <br />
                                (RS.)
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
                        </tr>
                        {
                            data.map((item, i) => (
                                <tr>
                                    <td style={{ textAlign: "left", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {i + 1}
                                    </td>
                                    <td style={{ textAlign: "left", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.productid} {item.variantid}
                                    </td>
                                    <td style={{ textAlign: "left", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.name.toUpperCase()}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {NumberWithCommas(item.sellingprice)}
                                    </td>
                                    <td style={{ textAlign: "right", borderRight: '1px dashed grey', padding: '3px' }}>
                                        {item.piecespercase}
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
                                        {NumberWithCommas(item.grossamount)}
                                    </td>
                                </tr>
                            ))
                        }
                    </table>

                    <br />

                    <table style={{ width: '210mm' }}>
                        <tr>
                            <td style={{ paddingLeft: "120mm" }}>TOTAL (RS.) </td>
                            <td style={{ textAlign: "right" }}>{NumberWithCommas(getValues("total"))} </td>
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
