import React, { useState } from 'react';

//Material UI Icons
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

//Material Components
import IconButton from '@mui/material/IconButton';

//SCSS styles
import style from './PurchaseOrderAnalytics.module.scss';

export default function PurchaseOrderAnalytics(props) {

    const {
        getMissingProductItemList,
    } = props;


    const [formStep, setFormStep] = useState(0);

    const nextProduct = () => {
        setFormStep(x => x + 1);
    }

    const previousProduct = () => {
        setFormStep(x => x - 1);
    }

    return (
        <div className={style.container}>

            <IconButton
                onClick={previousProduct}
                disabled={formStep === 0}
            >
                <ArrowLeftIcon
                    className={style.arrow}
                />
            </IconButton>

            <div className={style.card}>

                <div className={style.imageDiv}>
                    <img src={`http://${getMissingProductItemList[formStep].productimage}`} alt={getMissingProductItemList[formStep].productid} />
                </div>

                <div className={style.itemDetails}>

                    <div className={style.productid}>
                        {getMissingProductItemList[formStep].productid}
                    </div>

                    <div className={style.text}>
                        {getMissingProductItemList[formStep].name}
                    </div>

                    <div className={style.text}>
                        {getMissingProductItemList[formStep].supplier}
                    </div>

                </div>

                <div className={style.statistics}>
                    <div className={style.redText}>
                        IN STOCK
                    </div>
                    <div className={style.redText}>
                        {getMissingProductItemList[formStep].storecasequantity} &nbsp;
                        {getMissingProductItemList[formStep].storecasequantity <= 1 && getMissingProductItemList[formStep].storecasequantity >= -1 ? "CASE" : "CASES"}
                    </div>
                    <div className={style.redText}>
                        {getMissingProductItemList[formStep].storepiecesquantity} &nbsp;
                        {getMissingProductItemList[formStep].storepiecesquantity <= 1 && getMissingProductItemList[formStep].storepiecesquantity >= -1 ? "PIECE" : "PIECES"}
                    </div>
                </div>

            </div>

            <IconButton
                disabled={formStep === getMissingProductItemList.length - 1}
                onClick={nextProduct}
            >
                <ArrowRightIcon
                    className={style.arrow}
                />
            </IconButton>

        </div>
    )
}
