import React, { useState } from 'react';
import classnames from 'classnames';

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
            buttonText="Customer"
        >
            <div className={style.container}>
                <div className={style.tableRow}>
                    <TblContainer>
                    </TblContainer>
                </div>
            </div>
        </Page>
    );
};
