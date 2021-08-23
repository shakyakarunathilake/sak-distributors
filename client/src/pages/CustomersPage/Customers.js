import React, { useState } from 'react';
import classnames from 'classnames';

//Material UI Components
import Button from '@material-ui/core/Button';

//Material UI Icons
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

//Shared Components
import useTable from '../../components/useTable';
import Page from '../../shared/Page/Page';

//SCSS Styles
import style from './Customers.module.scss';

//Connecting to Backend
import axios from 'axios';

export default function Customers() {
    axios
        .get("http://localhost:8080/customers/")
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            console.log(error);
        })

    const { TblContainer } = useTable();

    return (
        <Page
            title="Customers"
        >
            <div className={style.container}>
                <div className={style.actionRow}>
                    <Button
                        className={classnames(style.red, style.button)}
                        size="medium"
                        variant="contained">
                        <DeleteIcon className={style.icon} />
                        Delete
                    </Button>
                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained">
                        <AddCircleIcon className={style.icon} />
                        Add New Customer
                    </Button>
                </div>
                <div className={style.tableRow}>
                    <TblContainer>
                    </TblContainer>
                </div>
            </div>
        </Page>
    );
};
