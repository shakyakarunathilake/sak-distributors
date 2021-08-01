import React, { FC } from 'react'
import style from './Page.module.scss'

import SideBar from '../SideBar/SideBar'

const Page: FC = (props) => {
    return (
        <div className={style.container}>
            <div className={style.sideBar}>
                <SideBar />
            </div>
            <div className={style.pageContent}>
                {props.children}
            </div>
        </div>
    )
}

export default Page;