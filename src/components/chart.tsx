
import { AreaSeries, createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import { CryptoData } from '../api';

const color = {
    backgroundColor :'white',
    lineColor :'#2962FF',
    textColor :'black',
    areaTopColor :'#2962FF',
    areaBottomColor :'rgba(41, 98, 255, 0.28)',
}

type ChartProps = {data :  CryptoData[]}


export function ChartComponent ({data}: ChartProps ) {
    const {backgroundColor, textColor ,lineColor ,areaTopColor  ,areaBottomColor} = color ;

    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            if(!chartContainerRef.current) return;
            const handleResize = () => {
                if(!chartContainerRef.current) return;
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: 600,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addSeries(AreaSeries, { lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div
            ref={chartContainerRef}
        />
    );
};


export function Chart({data} : ChartProps) {
    return (
        <ChartComponent  data={data}></ChartComponent>
    );
}