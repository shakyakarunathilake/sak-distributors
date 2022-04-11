import React, { useState } from 'react';

//React Hook Form
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';

//Shared Components
import Page from '../../shared/Page/Page';
import Select from '../../shared/Select/Select';

//Material UI Components
import Button from '@material-ui/core/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

//SCSS styles
import style from './SalesAnalytics.module.scss';

//Charts
import DoughnutChart from './DoughnutChart';
import LineChart from './LineChart';
import HorizontalBarChart from './HorizontalBarChart';
import VerticalBarChart from './VerticalBarChart';

//Connecting to Backend
import axios from 'axios';

export default function SalesAnalytics() {

    const [dataSets, setDataSets] = useState([]);
    const [labels, setLabels] = useState([]);

    const { formState: { errors, isValid }, control, getValues, trigger, reset, watch } = useForm({
        mode: "all",
        defaultValues: {
            charttype: '',
            periodical: '',
            analytics: '',
        }
    });

    const onSubmit = () => {
        if (isValid) {

            {
                watch("analytics") === "Total Sales" &&
                    axios
                        .get(`http://localhost:8080/get-total-sales/${getValues("periodical").toLowerCase()}`, {
                            headers: {
                                'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                            }
                        })
                        .then(res => {
                            setLabels(res.labels);
                            setDataSets(res.dataSets);
                        })
                        .catch(err => {
                            console.log(err);
                        });
            }

            {
                watch("analytics") === "Sales Per Customer" &&
                    axios
                        .get(`http://localhost:8080/get-sales-per-customer/${getValues("periodical").toLowerCase()}`, {
                            headers: {
                                'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                            }
                        })
                        .then(res => {
                            setLabels(res.labels);
                            setDataSets(res.dataSets);
                        })
                        .catch(err => {
                            console.log(err);
                        });
            }

            {
                watch("analytics") === "Sales Per Route" &&
                    axios
                        .get(`http://localhost:8080/get-sales-per-route/${getValues("periodical").toLowerCase()}`, {
                            headers: {
                                'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                            }
                        })
                        .then(res => {
                            setLabels(res.labels);
                            setDataSets(res.dataSets);
                        })
                        .catch(err => {
                            console.log(err);
                        });
            }

            {
                watch("analytics") === "Sales Per Sales Representative" &&
                    axios
                        .get(`http://localhost:8080/get-sales-per-sales-representative/${getValues("periodical").toLowerCase()}`, {
                            headers: {
                                'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                            }
                        })
                        .then(res => {
                            setLabels(res.labels);
                            setDataSets(res.dataSets);
                        })
                        .catch(err => {
                            console.log(err);
                        });
            }

        } else {
            trigger();
        }
    };

    return (

        <Page title="Sales Analytics">

            <div className={style.container}>

                <div className={style.form}>

                    <div className={style.toggleButtonDiv}>

                        <div className={style.toggleButton}>
                            <Controller
                                render={({ field }) => (
                                    <ToggleButtonGroup
                                        {...field}
                                        color="primary"
                                        fullWidth
                                        orientation="vertical"
                                        exclusive
                                    >
                                        <ToggleButton value="Daily">
                                            Daily
                                        </ToggleButton>
                                        <ToggleButton value="Weekly">
                                            Weekly
                                        </ToggleButton>
                                        <ToggleButton value="Monthly">
                                            Monthly
                                        </ToggleButton>
                                        <ToggleButton value="Yearly">
                                            Yearly
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                )}
                                name={"periodical"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" }
                                }}
                            />

                            <div className={style.redFontCenter}>
                                {
                                    errors.periodical && errors.periodical.message
                                }
                            </div>

                        </div>

                        <div className={style.toggleButton}>
                            <Controller
                                render={({ field }) => (
                                    <ToggleButtonGroup
                                        {...field}
                                        color="primary"
                                        fullWidth
                                        orientation="vertical"
                                        exclusive
                                    >
                                        <ToggleButton value="Total Sales">
                                            Total Sales
                                        </ToggleButton>
                                        <ToggleButton value="Sales per Customer">
                                            Sales per Customer
                                        </ToggleButton>
                                        <ToggleButton value="Sales per Route">
                                            Sales per Route
                                        </ToggleButton>
                                        <ToggleButton value="Sales per Sales Rep.">
                                            Sales per Sales Rep.
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                )}
                                name={"analytics"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" }
                                }}
                            />

                            <div className={style.redFontCenter}>
                                {
                                    errors.analytics && errors.analytics.message
                                }
                            </div>

                        </div>

                        <div className={style.toggleButton}>
                            <Controller
                                render={({ field }) => (
                                    <ToggleButtonGroup
                                        {...field}
                                        color="primary"
                                        fullWidth
                                        orientation="vertical"
                                        exclusive
                                    >
                                        <ToggleButton value="Line Chart">
                                            Line Chart
                                        </ToggleButton>
                                        <ToggleButton value="Doughnut Chart">
                                            Doughnut Chart
                                        </ToggleButton>
                                        <ToggleButton value="Horizontal Bar Chart">
                                            Horizontal Bar Chart
                                        </ToggleButton>
                                        <ToggleButton value="Vertical Bar Chart">
                                            Vertical Bar Chart
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                )}
                                name={"charttype"}
                                control={control}
                                rules={{
                                    required: { value: true, message: "Required *" }
                                }}
                            />

                            <div className={style.redFontCenter}>
                                {
                                    errors.charttype && errors.charttype.message
                                }
                            </div>

                        </div>

                    </div>

                    <div className={style.btnDiv}>

                        <Button
                            className={style.fetchButton}
                            onClick={onSubmit}
                            variant="contained"
                        >
                            Fetch
                        </Button>

                        <Button
                            className={style.resetButton}
                            onClick={() => reset()}
                            variant="contained"
                        >
                            Reset
                        </Button>

                    </div>

                </div>

                <div className={style.chart}>

                    {
                        watch("charttype") === "Line Chart" &&
                        <LineChart
                            labels={labels}
                            dataSets={dataSets}
                        />
                    }

                    {
                        watch("charttype") === "Doughnut Chart" &&
                        <DoughnutChart
                            labels={labels}
                            dataSets={dataSets}
                        />
                    }

                    {
                        watch("charttype") === "Horizontal Bar Chart" &&
                        <HorizontalBarChart
                            labels={labels}
                            dataSets={dataSets}
                        />
                    }

                    {
                        watch("charttype") === "Vertical Bar Chart" &&
                        <VerticalBarChart
                            labels={labels}
                            dataSets={dataSets}
                        />
                    }

                </div>

            </div>

        </Page>

    )
}
