import React from 'react';

//Material UI Components
import { Button } from '@material-ui/core';

//images
import NotAuthorizedImage from './Not Authorized.png';

import style from './NotAuthorized.module.scss';

export default function NotAuthorized() {

    return (
        <div className={style.container}>
            <div className={style.left}>
                <div className={style.statuscode}>
                    403
                </div>
                <div className={style.label}>
                    Forbidden
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
            <div className={style.right}>
                <img src={NotAuthorizedImage} style={{ width: "100%", height: "auto" }} />
            </div>
        </div>
    )
}
