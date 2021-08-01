import React, { FC } from 'react'
import style from './MenuBar.module.scss'

//Material UI Components
import Avatar from '@material-ui/core/Avatar'

//Images
import Photo from '../../img/original.jpg'

interface IProps {
    title: string
}

const MenuBar: FC<IProps> = (props) => {

    const { title } = props;

    return (
        <div className={style.container}>
            <div className={style.heading}>
                {title}
                {props.children}
            </div>
            <div>
                <Avatar alt="Khione" className={style.avatar} src={Photo} />
            </div>
        </div>
    )
}

export default MenuBar;