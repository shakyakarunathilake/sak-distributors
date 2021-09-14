import React from 'react';
import style from './Suppliers.module.scss';

//Shared Components
import Page from '../../shared/Page/Page';
import TextField from '../../shared/TextField/TextField';

//Material UI 
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';

export default function Suppliers() {
    return (
        <Page
            title="Suppliers"
        >

            <div className={style.container}>

                <div className={style.actionRow}>
                    <div className={style.search}>
                        <TextField
                            // onChange={e => setSearchVal(e.target.value)}
                            className={style.searchtextfield}
                            placeholder="Search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Supplier
                    </Button>
                </div>

                <div className={style.pagecontent}>

                </div>

            </div>
        </Page>
    );
};
