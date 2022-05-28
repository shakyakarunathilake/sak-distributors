import React, { useState } from 'react';

//Material UI Icons
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

//Material Components
import IconButton from '@mui/material/IconButton';

//SCSS styles
import style from './MissingProducts.module.scss';

export default function MissingProducts(props) {

    const {
        missingProducts,
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
                    <img src={`http://${missingProducts[formStep].productimage}`} alt={missingProducts[formStep].productid} />
                </div>

                <div className={style.itemDetails}>

                    <div className={style.productid}>
                        {missingProducts[formStep].productid}
                    </div>

                    <div className={style.text}>
                        {missingProducts[formStep].name}
                    </div>

                    <div className={style.text}>
                        {missingProducts[formStep].supplier}
                    </div>

                </div>
                
                <div className={style.statistics}>

                    <div className={style.redText}>
                        IN STOCK
                    </div>

                    <div className={style.redText}>
                        {missingProducts[formStep].storecasequantity} &nbsp;
                        {missingProducts[formStep].storecasequantity <= 1 && missingProducts[formStep].storecasequantity >= -1 ? "CASE" : "CASES"}
                    </div>

                    <div className={style.redText}>
                        {missingProducts[formStep].storepiecesquantity} &nbsp;
                        {missingProducts[formStep].storepiecesquantity <= 1 && missingProducts[formStep].storepiecesquantity >= -1 ? "PIECE" : "PIECES"}
                    </div>

                </div>

            </div>

            <IconButton
                disabled={formStep === missingProducts.length - 1}
                onClick={nextProduct}
            >
                <ArrowRightIcon
                    className={style.arrow}
                />
            </IconButton>

        </div>
    )
}
