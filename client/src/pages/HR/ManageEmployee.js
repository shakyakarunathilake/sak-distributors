import React from 'react';

//Shared Components
import Page from '../../shared/Page/Page';
// import useTable from '../../components/useTable.js';
import TextField from '../../shared/TextField/TextField';

//SCSS styles
import style from './ManageEmployee.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';

export default function ManageEmployee() {

    // const { Table } = useTable();

    return (
        <Page title="Manage Employees">
            <div className={style.container}>

                <div className={style.actionRow}>
                    <div className={style.search}>
                        <TextField
                            // onChange={e => setSearchVal(e.target.value)}
                            color="primary"
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
                    // onClick={
                    //     () => {
                    //         setOpenPopup(true);
                    //     }
                    // }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Employee
                    </Button>
                </div>

                <div className={style.pagecontent}>

                </div>

            </div>
        </Page>
    )
}
