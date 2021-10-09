import React from 'react';

//Shared Components
import Page from '../../shared/Page/Page';
import useTable from '../../components/useTable.js';
import TextField from '../../shared/TextField/TextField';
import PopUp from '../../shared/PopUp/PopUp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//SCSS styles
import style from './ManageProduct.module.scss';

//Material UI 
import Button from '@material-ui/core/Button';
import { InputAdornment } from '@material-ui/core';
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';

//Material UI Icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

export default function ManageProduct() {
    return (
        <Page title="Manage Products">
            <div className={style.container}>

                <div className={style.actionRow}>
                    <div className={style.search}>
                        <TextField
                            // onChange={e => setSearchVal(e.target.value)}
                            color="primary"
                            className={style.searchtextfield}
                            fullWidth={true}
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
                        onClick={
                            () => {
                                // setAction('Create');
                                // getNextCustomerId();
                                // setOpenPopup(true);
                                // setCustomerRecords(null);
                            }
                        }
                    >
                        <NewReleasesIcon className={style.icon} />
                        Add New Offer
                    </Button>

                    <Button
                        className={style.button}
                        color="primary"
                        size="medium"
                        variant="contained"
                        onClick={
                            () => {
                                // setAction('Create');
                                // getNextCustomerId();
                                // setOpenPopup(true);
                                // setCustomerRecords(null);
                            }
                        }
                    >
                        <AddCircleIcon className={style.icon} />
                        Add New Product
                    </Button>
                </div>

                <div className={style.pagecontent}>
                </div>

            </div>
        </Page>
    )
}
