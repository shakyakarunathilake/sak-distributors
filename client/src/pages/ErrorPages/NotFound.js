import React from 'react';

//Material UI Components
import { Button } from '@material-ui/core';

//images
import NotFoundImage from './Page Not Found.jpg';

import style from './NotFound.module.scss';

export default function NotFound() {

  return (
    <div className={style.container}>

      <div className={style.top}>
        <center>
          <img src={NotFoundImage} style={{ width: "40%", height: "auto" }} />
        </center>
      </div>

      <div className={style.bottom}>
        <div className={style.label}>
          Page Not Found
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
