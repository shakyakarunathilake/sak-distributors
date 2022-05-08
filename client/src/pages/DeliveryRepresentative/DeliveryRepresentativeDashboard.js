import React from 'react';

//Shared Components
import TabletPageTwo from '../../shared/PageTwo/TabletPageTwo';
import TabletProfile from '../../shared/PageTwo/TabletProfile';

//SCSS Styles
import style from './DeliveryRepresentativeDashboard.module.scss';

export default function DeliveryRepresentativeDashboard() {

    return (
        <TabletPageTwo>
            <div className={style.container}>

                <div className={style.rowA}>
                    <TabletProfile />
                </div>

                <div className={style.rowB}>


                </div>
            </div>
        </TabletPageTwo>
    )
}
