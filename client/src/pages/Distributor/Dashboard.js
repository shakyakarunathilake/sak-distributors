import React from 'react';

//Shared Components
import Page from '../../shared/Page/Page';

// import style from './Dashboard.module.scss';

export default function Dashboard() {

    localStorage.setItem("Role", "Distributor");

    return (
        <Page
            title="Dashboard">
                
        </Page>
    )
};
