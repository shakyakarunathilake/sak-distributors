import React, { useEffect, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';

//Material UI Components
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//Default Image
import product from '../../images/product.svg';

//SCSS Styles
import style from './ViewProduct.module.scss';

export default function ViewProductVariant(props) {

    const { setOpenPopup, productRecords } = props;

    const { handleSubmit, control, setValue } = useForm();

    const [show, setShow] = useState(false);

    useEffect(() => {
        setValue("productid", productRecords.productid);
        setValue("name", productRecords.name);
        setValue("supplier", productRecords.supplier);
        setValue("productimage", productRecords.productimage);
        setValue("addeddate", productRecords.addeddate);
        setValue("addedby", productRecords.addedby);
        setValue("productstatus", productRecords.status);
        setValue("variantid", productRecords.variant["variantid"]);
        setValue("type", productRecords.variant.type);
        setValue("bulkprice", productRecords.variant.bulkprice);
        setValue("mrp", productRecords.variant.mrp);
        setValue("sellingprice", productRecords.variant.sellingprice);
        setValue("purchaseprice", productRecords.variant.purchaseprice);
        setValue("offercaption", productRecords.variant.offercaption);
        setValue("variantstatus", productRecords.variant.status);
        setValue("variantaddeddate", productRecords.variant.addeddate);
        setValue("variantaddedby", productRecords.variant.addedby);

        setShow(productRecords.offercaption ? true : false);

    }, [productRecords, setValue])

    const onSubmit = () => {
        setOpenPopup(false);
    };

    return (
        <div>
            <div className={style.container}>

                <div className={style.header}>
                    <div>View Product Variant</div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={() => { setOpenPopup(false) }}
                        />
                    </div>
                </div>

                <div className={style.body}>
                    <form
                        className={style.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={style.formFields}>

                            <div className={style.columnA}>

                                <div className={style.image}>
                                    <div className={style.imgWrapper}>
                                        <Controller
                                            name={"productimage"}
                                            control={control}
                                            render={({ field: { value } }) => (
                                                <img src={value ? `http://${value}` : product} alt="" />
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
                                                Product ID: {value}
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
                                                    {value}
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

                                {
                                    show &&

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
                                        Bulk Price
                                    </div>
                                    <div className={style.productData}>
                                        <Controller
                                            name={"bulkprice"}
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
                                        Purchase Price
                                    </div>
                                    <div className={style.productData}>
                                        <Controller
                                            name={"purchaseprice"}
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
                                        Selling Price
                                    </div>
                                    <div className={style.productData}>
                                        <Controller
                                            name={"sellingprice"}
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
                                        MRP
                                    </div>
                                    <div className={style.productData}>
                                        <Controller
                                            name={"mrp"}
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

                                <div className={style.buttonRow}>
                                    <Button
                                        className={style.doneBtn}
                                        type="submit"
                                        variant="contained"
                                    >
                                        Done
                                    </Button>
                                </div>
                            </div>


                        </div>
                    </form>
                </div>
            </div>

        </div >
    )
}
