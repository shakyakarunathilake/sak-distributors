import React, { useEffect, useState } from 'react';

//React Hook Form
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';

//Shared Components
import Page from '../../shared/Page/Page';

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

    const [chartData, setChartData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [label, setLabel] = useState('');
    const [fetched, setFetched] = useState(false);

    const { formState: { errors, isValid }, control, getValues, trigger, reset, watch, setValue } = useForm({
        mode: "all",
        defaultValues: {

            charttype: "line-chart",
            periodical: "daily",
            analytics: "total-sales",
        }
    });

    const analytics = watch("analytics");

    useEffect(() => {
        if (watch("analytics") === "total-sales") {
            setValue("charttype", "line-chart");
        }
        if (watch("analytics") === "sales-per-customer") {
            setValue("charttype", "vertical-bar-chart");
            setValue("periodical", "daily");
        }
        if (watch("analytics") === "sales-per-route") {
            setValue("charttype", "doughnut-chart");
            setValue("periodical", "daily");
        }
        if (watch("analytics") === "sales-per-sales-representative") {
            setValue("charttype", "vertical-bar-chart");
            setValue("periodical", "daily");
        }
    }, [analytics, setValue, watch])

    const renderCharts = () => (
        <>
            {
                watch("charttype") === "line-chart" &&
                < LineChart
                    label={label}
                    labels={labels}
                    chartData={chartData}
                />
            }

            {
                watch("charttype") === "doughnut-chart" &&
                <DoughnutChart
                    labels={labels}
                    chartData={chartData}
                />
            }

            {
                watch("charttype") === "horizontal-bar-chart" &&
                <HorizontalBarChart
                    label={label}
                    labels={labels}
                    chartData={chartData}
                />
            }

            {
                watch("charttype") === "vertical-bar-chart" &&
                <VerticalBarChart
                    label={label}
                    labels={labels}
                    chartData={chartData}
                />
            }
        </>
    );

    const resetData = () => {
        reset();
        setChartData([]);
        setLabels([]);
        setLabel('');
        setFetched(false);
    }

    const onSubmit = () => {
        if (isValid) {

            axios
                .get(`http://localhost:8080/${getValues('analytics')}/${getValues("periodical")}`, {
                    headers: {
                        'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                    }
                })
                .then(res => {
                    setLabel(res.data.label);
                    setLabels(res.data.labels);
                    setChartData(res.data.chartData);
                    setFetched(true);
                })
                .catch(err => {
                    console.log(err);
                });

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
                                        disabled={fetched}
                                    >
                                        <ToggleButton value="total-sales">
                                            Total Sales
                                        </ToggleButton>
                                        <ToggleButton value="sales-per-customer">
                                            Sales per Customer
                                        </ToggleButton>
                                        <ToggleButton value="sales-per-route">
                                            Sales per Route
                                        </ToggleButton>
                                        <ToggleButton value="sales-per-sales-representative">
                                            Sales per Sales Representative
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
                                        disabled={fetched || watch("analytics") !== "total-sales"}
                                    >
                                        <ToggleButton value="daily">
                                            Daily
                                        </ToggleButton>
                                        <ToggleButton value="weekly">
                                            Weekly
                                        </ToggleButton>
                                        <ToggleButton value="monthly">
                                            Monthly
                                        </ToggleButton>
                                        <ToggleButton value="annually">
                                            Annually
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
                                        <ToggleButton value="line-chart" disabled={watch("analytics") !== "total-sales"}>
                                            Line Chart
                                        </ToggleButton>
                                        <ToggleButton value="doughnut-chart" disabled={watch("analytics") === "sales-per-customer"}>
                                            Doughnut Chart
                                        </ToggleButton>
                                        <ToggleButton value="horizontal-bar-chart">
                                            Horizontal Bar Chart
                                        </ToggleButton>
                                        <ToggleButton value="vertical-bar-chart">
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
                            disabled={fetched}
                        >
                            Fetch
                        </Button>

                        <Button
                            className={style.resetButton}
                            onClick={resetData}
                            variant="contained"
                        >
                            Reset
                        </Button>

                    </div>

                </div>

                <div className={style.chart}>

                    {
                        chartData.length !== 0 && renderCharts()
                    }

                </div>

            </div>

        </Page>

    )
}
