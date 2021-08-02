import React, {useEffect, useState} from "react";
import moment from "moment/moment";
import TWeather from "../interface/weather";
import CanvasJSReact from '../assets/canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface Props {
    weather: TWeather,
}

interface IPoint {
    y: number, label: string
}

interface IDataPoint {
    type: string,
    name: string,
    showInLegend: boolean,
    dataPoints: IPoint[]
}

interface IChartMeteo {
    animationEnabled: boolean,
    title:{
        text: string
    },
    axisY : {
        title: string
    },
    toolTip: {
        shared: boolean
    },
    data: IDataPoint[]
}

const Graph: React.FC<Props> = ({weather}: Props) => {

    const [options, setOptions] = useState<IChartMeteo>();

        useEffect(() => {
            let dataPointMin: IDataPoint = {type: "spline", name: "min", showInLegend: true, dataPoints: [] };
            let dataPointMax: IDataPoint = {type: "spline", name: "max", showInLegend: true, dataPoints: [] };
            for (let weatherDay of weather.daily) {
                  const date = moment(new Date(weatherDay.dt * 1000)).format('dddd');
                  if (typeof weatherDay.temp !== "number") {
                      const pointMin: IPoint = {y: weatherDay.temp.min, label: date};
                      const pointMax: IPoint = {y: weatherDay.temp.max, label: date};
                      dataPointMin.dataPoints.push(pointMin);
                      dataPointMax.dataPoints.push(pointMax);
                  }
            }
            setOptions({
                  animationEnabled: true,
                  title: { text: "Météo de la semaine" },
                  axisY : { title: "Météo de la semaine" },
                  toolTip: { shared: true },
                  data: [dataPointMin, dataPointMax]
            })
      }, [weather.daily]);

  return <CanvasJSChart options = {options} />;
}

export default Graph;
