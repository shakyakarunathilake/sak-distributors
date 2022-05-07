import React from 'react';

//Material UI Components
import { Button } from '@material-ui/core';

//images
import NotAuthorizedImage from './Not Authorized.png';

import style from './NotAuthorized.module.scss';

export default function NotAuthorized() {

    return (
        <div className={style.container}>

            <div className={style.top}>
                <center>
                    <img src={NotAuthorizedImage} style={{ width: "30%", height: "auto" }} alt="Not Authorized" />
                </center>
            </div>

            <div className={style.bottom}>
                <div className={style.label}>
                    Access Denied
                </div>
                <div className={style.btnDiv}>
                    <Button
                        onClick={() =>
                            window.history.back()
                        }
                        variant="contained"
                    >
                        Go back
                    </Button>
                </div>
            </div>

        </div>
    )
}
