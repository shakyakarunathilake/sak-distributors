import React from 'react';

import { Controller } from 'react-hook-form';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Default Image
import product from '../../images/product.svg';

//SCSS Styles
import style from './ProductFormStepTwo.module.scss';

export default function ProductFormStepTwo(props) {

    const {
        action,
        handleClosePopUp,
        control,
        backFormStep,
        onSubmit,
        file
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Create" && "Create Product"}
                        {action === "Edit" && "Edit Product"}
                        {action === "View" && "View Product"}
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { handleClosePopUp() }}
                        />
                    </div>
                </div>

                {
                    action !== "View" &&
                    <div className={style.step}>
                        Step 2 of 2
                    </div>
                }

            </div>

            <div className={style.body}>

                <div className={style.columnA}>

                    <div className={style.image}>
                        <div className={style.imgWrapper}>
                            <Controller
                                render={({ field: { value } }) => (
                                    action === "Create" ?
                                        <img src={value ? file : product} alt="" />
                                        : <img src={value ? `http://${value}` : product} alt="" />
                                )}
                                name={"productimage"}
                                control={control}
                            />
                        </div>
                    </div>

                    <div className={style.productId}>
                        <Controller
                            name={"productid"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    ID: {value}
                                </Typography>
                            )}
                        />
                    </div>

                </div>

                <div className={style.columnB}>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Name
                        </div>
                        <div className={style.productData}>
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                                name={"name"}
                                control={control}
                            />
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Supplier
                        </div>
                        <div className={style.productData}>
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                                name={"supplier"}
                                control={control}
                            />
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Added By
                        </div>
                        <div className={style.productData}>
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                                name={"addedby"}
                                control={control}
                            />
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Added Date
                        </div>
                        <div className={style.productData}>
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                                name={"addeddate"}
                                control={control}
                            />
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Status
                        </div>
                        <div className={style.productData}>
                            <Controller
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                                name={"status"}
                                control={control}
                            />
                        </div>
                    </div>

                </div>

            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    {
                        action !== "View" &&
                        <Button
                            onClick={backFormStep}
                            variant="contained"
                        >
                            Back
                        </Button>
                    }
                </div>

                <div className={style.doneBtn}>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                    >
                        {action === "Create" && "Confirm & Submit"}
                        {action === "Edit" && "Confirm & Submit"}
                        {action === "View" && "Done"}
                    </Button>
                </div>

            </div>

        </div>
    )
}
