import React, { useState } from 'react';
import classnames from 'classnames';

//Material UI Components
import Button from '@material-ui/core/Button';

//Material UI Icons
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

//Shared Components
import Page from '../../shared/Page/Page';

//SCSS Styles
import style from './Employees.module.scss';

export default function Employees() {
    return (
        <Page
            title="Employees"
        >
            <div className={style.container}>
                <div className={style.actionTab}>
                    <Button
                        className={classnames(style.red, style.button)}
                        variant="contained">
                        <DeleteIcon className={style.icon} />
                        Delete
                    </Button>
                    <Button
                        className={style.button}
                        color="primary"
                        variant="contained">
                        <AddCircleIcon className={style.icon} />
                        Add New Employee
                    </Button>
                </div>
            </div>
        </Page>
    );
};
