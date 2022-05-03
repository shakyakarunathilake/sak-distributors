import React from 'react';

//Material UI Components
import { Button } from '@material-ui/core';

//images
import NotFoundImage from './Page Not Found.png';

import style from './NotFound.module.scss';

export default function NotFound() {

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.statuscode}>
          404
        </div>
        <div className={style.label}>
          Not Found
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
        <img src={NotFoundImage} style={{ width: "100%", height: "auto" }} />
      </div>
    </div>
  )
}
