import React from 'react';
import classnames from 'classnames';

//Material UI Components
import {
    Table as MuiTable,
    TableContainer as MuiTableContainer,
    TableHead as MuiTableHead,
    TableBody as MuiTableBody,
    TableRow as MuiTableRow,
    TableCell as MuiTableCell,
    Paper,
} from '@material-ui/core';

//Material UI Icons
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

//SCSS Styles
import style from './useTable.module.scss';

export default function useTable(thead, tbody) {

    const TableContainer = props => (
        <MuiTableContainer className={style.tablecontainer} component={Paper}>
            <MuiTable className={style.table}>
                <MuiTableHead className={style.tablehead}>
                    <MuiTableRow className={style.tableheadrow}>
                        {thead.map((x, i) => (
                            <MuiTableCell
                                align="center"
                                className={classnames(
                                    { [style.columnonesticky]: i === 0 },
                                    { [style.columntwosticky]: i === 1 },
                                    { [style.columnlaststicky]: i === thead.length - 1 },
                                    style.tablecell
                                )}
                                key={i}
                            >
                                {x}
                            </MuiTableCell>
                        ))}
                    </MuiTableRow>
                </MuiTableHead>
                <MuiTableBody className={style.tablebody}>
                    {tbody.map((x, i) => (
                        <MuiTableRow
                            className={classnames(
                                { [style.greytablerow]: i % 2 === 1 },
                                style.tablerow
                            )}
                            key={i}
                        >
                            {x.map((y, i) => (
                                <MuiTableCell
                                    className={classnames(
                                        { [style.columnonesticky]: i === 0 },
                                        { [style.columntwosticky]: i === 1 },
                                    )}
                                    align="right"
                                    key={i}
                                >
                                    {y}
                                </MuiTableCell>
                            ))}
                            <MuiTableCell
                                align="center"
                                className={classnames(style.grid, style.columnlaststicky)}
                            >
                                <VisibilityIcon className={style.visibilityIcon} />
                                <EditIcon className={style.editIcon} />
                            </MuiTableCell>
                        </MuiTableRow>
                    ))}
                </MuiTableBody>
            </MuiTable>
        </MuiTableContainer>
    )

    return {
        TableContainer
    }
}
