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
import style from './VariantFormStepTwo.module.scss';

export default function VariantFormStepTwo(props) {

    const {
        control,
        handleClosePopUp,
        action,
        backFormStep,
        completeFormStep,
        file
    } = props;

    return (
        <div className={style.container}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        {action === "Create" && "Create Product Variant"}
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
                    {action === "View" && "Step 1 of 2"}
                    {action === "Create" && "Step 2 of 4"}
                </div>

            </div>

            <div className={style.body}>

                <div className={style.columnA}>

                    <div className={style.image}>
                        <div className={style.imgWrapper}>
                            <Controller
                                name={"productimage"}
                                control={control}
                                render={({ field: { value } }) => (
                                    action === "Create" ?
                                        <img src={value ? file : product} alt="" />
                                        : <img src={value ? `http://${value}` : product} alt="" />
                                )}
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
                                name={"name"}
                                control={control}
                                render={({ field: { value } }) => (
                                    <Typography className={style.input}>
                                        {action !== "View" ? value.name : value}
                                    </Typography>
                                )}
                            />
                        </div>
                    </div>

                    <div className={style.row}>
                        <div className={style.boldText}>
                            Supplier
                        </div>
                        <div className={style.productData}>
                            <Controller
                                name={"supplier"}
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
                            Status
                        </div>
                        <div className={style.productData}>
                            <Controller
                                name={"productstatus"}
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
                            Added By
                        </div>
                        <div className={style.productData}>
                            <Controller
                                name={"addedby"}
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
                                name={"addeddate"}
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
                            Variant ID
                        </div>
                        <div className={style.productData}>
                            <Controller
                                name={"variantid"}
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
                            Type
                        </div>
                        <div className={style.productData}>
                            <Controller
                                name={"type"}
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

            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    {
                        action === "Create" &&
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
                        onClick={completeFormStep}
                        variant="contained"
                    >
                        {action === "Create" && "Confrim & Next"}
                        {action !== "Create" && "Next"}
                    </Button>
                </div>

            </div>

        </div>
    )
}
