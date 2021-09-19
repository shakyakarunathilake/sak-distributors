import React from 'react';

//Shared Components
import Page from '../../shared/Page/Page';
import useTable from '../../components/useTable.js';

export default function ManageEmployee() {

    const { SharedTable } = useTable();

    return (
        <Page title="Manage Employees">
            <SharedTable />
        </Page>
    )
}
