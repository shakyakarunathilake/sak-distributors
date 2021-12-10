import React from 'react';

//Material UI 
import { Button } from '@material-ui/core';

//SCSS styles
import style from './Quotations.module.scss';

//Components
import PurchaseOrderAnalytics from './PurchaseOrderAnalytics';

export default function Quotations(props) {

    const { } = props

    return (

        <div className={style.container}>

            <PurchaseOrderAnalytics />

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
                    // onClick={ }
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
