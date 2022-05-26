import React from 'react';
import { Controller } from 'react-hook-form';

//Shared
import NumberWithCommas from '../NumberWithCommas';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//SCSS Styles
import style from './VariantFormStepFour.module.scss';

export default function VariantFormStepFour(props) {

    const {
        control,
        handleClosePopUp,
        action,
        backFormStep,
        onSubmit,
        watch
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Create" && "Create Product Variant"}
                        {action === "Edit" && "Edit Product Variant"}
                        {action === "View" && "View Product Variant"}
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { handleClosePopUp() }}
                        />
                    </div>
                </div>


                <div className={style.step}>
                    {action !== "Create" && "Step 2 of 2"}
                    {action === "Create" && "Step 4 of 4"}
                </div>

            </div>

            <div className={style.body}>

                {
                    watch('type') !== "General" &&
                    <div className={style.row}>
                        <div className={style.boldText}>
                            Offer Caption
                        </div>
                        <div className={style.productData}>
                            <Controller
                                name={"offercaption"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {value}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>
                }

                <div className={style.row}>
                    <div className={style.boldText}>
                        Status
                    </div>
                    <div className={style.productData}>
                        <Controller
                            name={"variantstatus"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Pieces per Case
                    </div>
                    <div className={style.productData}>
                        <Controller
                            name={"piecespercase"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Case Price
                    </div>
                    <div className={style.productData}>
                        <Controller
                            name={"bulkprice"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    Rs. {NumberWithCommas(value)}
                                </Typography>
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Purchase Price
                    </div>
                    <div className={style.productData}>
                        <Controller
                            name={"purchaseprice"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    Rs. {NumberWithCommas(value)}
                                </Typography>
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Selling Price
                    </div>
                    <div className={style.productData}>
                        <Controller
                            name={"sellingprice"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    Rs. {NumberWithCommas(value)}
                                </Typography>
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        MRP
                    </div>
                    <div className={style.productData}>
                        <Controller
                            name={"mrp"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    Rs. {NumberWithCommas(value)}
                                </Typography>
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Added By
                    </div>
                    <div className={style.productData}>
                        <Controller
                            name={"variantaddedby"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                        />
                    </div>
                </div>

                <div className={style.row}>
                    <div className={style.boldText}>
                        Added Date
                    </div>
                    <div className={style.productData}>
                        <Controller
                            name={"variantaddeddate"}
                            control={control}
                            render={({ field: { value } }) => (
                                <Typography className={style.input}>
                                    {value}
                                </Typography>
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    <Button
                        onClick={backFormStep}
                        variant="contained"
                    >
                        Back
                    </Button>
                </div>

                <div className={style.doneBtn}>
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                    >
                        {action !== "View" && "Confrim & Submit"}
                        {action === "View" && "Done"}
                    </Button>
                </div>

            </div>

        </div>
    )
}
