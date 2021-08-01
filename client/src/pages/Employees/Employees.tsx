import style from './Employees.module.scss'

//Shared Components
import Page from '../../shared/Page/Page'
import MenuBar from '../../shared/MenuBar/MenuBar'

const Employees = () => {
    return (
        <Page>
            <div className={style.container}>
                <MenuBar title="Employees" />
            </div>
            <div className={style.table}>
            </div>
        </Page>
    )
}

export default Employees;
