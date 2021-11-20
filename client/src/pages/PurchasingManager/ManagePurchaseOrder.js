import React from 'react';

//Shared Components
import Page from '../../shared/Page/Page';

//SCSS styles
import style from './ManagePurchaseOrder.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function ManagePurchaseOrder() {

    return (
        <Page title="Manage Purchase Order">
            <div className={style.container}>

                <div className={style.actionRow}>

                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                window.location.replace("http://localhost:3000/purchasing-manager/create-purchase-order")
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Create Purchase Order
                    </Button>

                </div>

                <div className={style.pagecontent}>
                </div>

            </div>

        </Page>
    )
}
