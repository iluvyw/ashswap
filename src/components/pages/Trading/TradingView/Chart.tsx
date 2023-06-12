import { ChartItem } from '@/api/models';
import { ColorType, createChart, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

type ChartProps = {
  data: ChartItem[];
};

export default function Chart({ data }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current === null) {
      return;
    }
    const handleResize = () => {
      if (chartContainerRef.current !== null) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        chart.applyOptions({ height: chartContainerRef.current.clientHeight });
      }
    };

    const chart = createChart(chartContainerRef.current as HTMLElement, {
      width: chartContainerRef.current.clientWidth || 800,
      height: chartContainerRef.current.clientHeight || 1000,
      layout: {
        background: {
          type: ColorType.Solid,
          color: '#fff',
        },
        textColor: '#000',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
    });
    chart.timeScale().fitContent();

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#05C9A1',
      downColor: '#FF005C',
      borderDownColor: '#FF005C',
      borderUpColor: '#05C9A1',
      wickDownColor: '#FF005C00', //transparent
      wickUpColor: '#05C9A100', //transparent
    });

    candleSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [data]);

  return <div className="h-full w-full" ref={chartContainerRef} />;
}
