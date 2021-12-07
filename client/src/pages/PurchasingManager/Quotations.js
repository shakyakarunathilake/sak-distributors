import React from 'react';

//Development Stage
import itemImg from '../../images/itemImg.png'

//Material UI 
import { Button } from '@material-ui/core';

//Material UI Icons
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

//SCSS styles
import style from './Quotations.module.scss';

export default function Quotations(props) {

    const { setOpenPopup } = props
    
    return (

        <div className={style.container}>

            <div className={style.analytics}>

                <div>
                    <ArrowLeftIcon className={style.arrow} />
                </div>

                <div className={style.card}>

                    <div className={style.imageDiv}>
                        <img src={itemImg} alt="" />
                    </div>

                    <div className={style.itemDetails}>

                        <div className={style.productid}>
                            SWAD-P44893
                        </div>

                        <div className={style.name}>
                            RANI SANDAL GEL BAR - WITH SANDAL & HONEY SOAP - 70G
                        </div>

                    </div>

                    <div className={style.statistics}>
                        <div className={style.redText}>
                            IN NEXT 10 DAYS
                        </div>
                        <div className={style.redText}>
                            65 CASES
                        </div>
                        <div className={style.redText}>
                            5 PIECES
                        </div>
                    </div>

                </div>

                <div>
                    <ArrowRightIcon className={style.arrow} />
                </div>

            </div>

            <div className={style.quotationHeader}>
                <div className={style.title}>
                    Quotations
                </div>
                <div>

                </div>
                <div>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => { setOpenPopup(true) }}
                    >
                        Add new quotaions
                    </Button>
                </div>
            </div>

            <div className={style.quotationTable}>

            </div>

        </div>
    )
}
