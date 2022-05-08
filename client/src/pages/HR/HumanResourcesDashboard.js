import React from 'react';

//Shared Components
import PageTwo from '../../shared/PageTwo/PageTwo';
import Profile from '../../shared/PageTwo/Profile';

//SCSS Styles
import style from './HumanResourcesDashboard.module.scss';

export default function HumanResourcesDashboard(props) {

    return (
        <PageTwo>
            <div className={style.container}>

                <div className={style.columnA}>
                    <Profile />
                </div>

                <div className={style.columnB}>


                </div>
            </div>
        </PageTwo>
    )
};
