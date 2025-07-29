'use client';

import React, { useEffect, useRef } from 'react';

interface ChartCanvasProps {
  type: 'candlestick' | 'line' | 'support-resistance' | 'pattern' | 'macd' | 'rsi-bollinger' | 
        'financial-statement' | 'valuation' | 'portfolio' | 'backtest';
  data?: any;
}

export function ChartCanvas({ type, data }: ChartCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 10; i++) {
      const y = (canvas.offsetHeight / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.offsetWidth, y);
      ctx.stroke();
    }

    switch (type) {
      case 'candlestick':
        drawCandlestickChart(ctx, canvas.offsetWidth, canvas.offsetHeight);
        break;
      case 'line':
        drawLineChart(ctx, canvas.offsetWidth, canvas.offsetHeight);
        break;
      case 'support-resistance':
        drawSupportResistance(ctx, canvas.offsetWidth, canvas.offsetHeight);
        break;
      case 'pattern':
        drawPattern(ctx, canvas.offsetWidth, canvas.offsetHeight);
        break;
      case 'macd':
        drawMACDChart(ctx, canvas.offsetWidth, canvas.offsetHeight);
        break;
      case 'rsi-bollinger':
        drawRSIBollingerChart(ctx, canvas.offsetWidth, canvas.offsetHeight);
        break;
      case 'financial-statement':
        drawFinancialStatement(ctx, canvas.offsetWidth, canvas.offsetHeight);
        break;
      case 'valuation':
        drawValuationChart(ctx, canvas.offsetWidth, canvas.offsetHeight);
        break;
      case 'portfolio':
        drawPortfolioChart(ctx, canvas.offsetWidth, canvas.offsetHeight);
        break;
      case 'backtest':
        drawBacktestChart(ctx, canvas.offsetWidth, canvas.offsetHeight);
        break;
    }
  }, [type, data]);

  const drawCandlestickChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const candles = [
      { open: 100, high: 110, low: 95, close: 105 },
      { open: 105, high: 115, low: 100, close: 112 },
      { open: 112, high: 118, low: 108, close: 110 },
      { open: 110, high: 112, low: 102, close: 108 },
      { open: 108, high: 120, low: 105, close: 118 },
      { open: 118, high: 125, low: 115, close: 122 },
    ];

    const candleWidth = width / (candles.length * 2);
    const maxPrice = 130;
    const minPrice = 90;
    const priceRange = maxPrice - minPrice;

    candles.forEach((candle, i) => {
      const x = (i * 2 + 1) * candleWidth;
      const color = candle.close > candle.open ? '#00c853' : '#ff1744';

      // Draw wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, height - ((candle.high - minPrice) / priceRange) * height);
      ctx.lineTo(x, height - ((candle.low - minPrice) / priceRange) * height);
      ctx.stroke();

      // Draw body
      ctx.fillStyle = color;
      const bodyTop = Math.max(candle.open, candle.close);
      const bodyBottom = Math.min(candle.open, candle.close);
      const bodyHeight = ((bodyTop - bodyBottom) / priceRange) * height;
      const bodyY = height - ((bodyTop - minPrice) / priceRange) * height;
      
      ctx.fillRect(x - candleWidth / 2, bodyY, candleWidth, bodyHeight);
    });

    // Add labels
    ctx.fillStyle = '#fff';
    ctx.font = '12px Inter';
    ctx.fillText('캔들스틱 차트', 10, 20);
  };

  const drawLineChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw moving averages
    const ma5 = generateMA(5, width, height);
    const ma20 = generateMA(20, width, height);
    const ma60 = generateMA(60, width, height);

    // Draw MA lines
    drawLine(ctx, ma5, '#00c853', '5일선');
    drawLine(ctx, ma20, '#ff9800', '20일선');
    drawLine(ctx, ma60, '#2196f3', '60일선');

    // Add legend
    ctx.font = '12px Inter';
    ctx.fillStyle = '#00c853';
    ctx.fillText('● 5일선', 10, 20);
    ctx.fillStyle = '#ff9800';
    ctx.fillText('● 20일선', 80, 20);
    ctx.fillStyle = '#2196f3';
    ctx.fillText('● 60일선', 150, 20);
  };

  const drawSupportResistance = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw price action
    const priceData = generatePriceData(width, height);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    priceData.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    // Draw support line
    ctx.strokeStyle = '#00c853';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.lineTo(width, height * 0.7);
    ctx.stroke();

    // Draw resistance line
    ctx.strokeStyle = '#ff1744';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.3);
    ctx.lineTo(width, height * 0.3);
    ctx.stroke();
    ctx.setLineDash([]);

    // Add labels
    ctx.fillStyle = '#00c853';
    ctx.font = '12px Inter';
    ctx.fillText('지지선', 10, height * 0.7 - 5);
    ctx.fillStyle = '#ff1744';
    ctx.fillText('저항선', 10, height * 0.3 - 5);
  };

  const drawPattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw head and shoulders pattern
    const points = [
      { x: width * 0.1, y: height * 0.6 },
      { x: width * 0.2, y: height * 0.4 }, // Left shoulder
      { x: width * 0.3, y: height * 0.5 },
      { x: width * 0.4, y: height * 0.2 }, // Head
      { x: width * 0.5, y: height * 0.5 },
      { x: width * 0.6, y: height * 0.4 }, // Right shoulder
      { x: width * 0.7, y: height * 0.6 },
    ];

    // Draw pattern line
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    // Draw neckline
    ctx.strokeStyle = '#ff9800';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.5);
    ctx.lineTo(width * 0.7, height * 0.5);
    ctx.stroke();
    ctx.setLineDash([]);

    // Add labels
    ctx.fillStyle = '#fff';
    ctx.font = '11px Inter';
    ctx.fillText('좌측 어깨', width * 0.15, height * 0.35);
    ctx.fillText('머리', width * 0.38, height * 0.15);
    ctx.fillText('우측 어깨', width * 0.55, height * 0.35);
    ctx.fillStyle = '#ff9800';
    ctx.fillText('넥라인', width * 0.72, height * 0.5);
  };

  const generateMA = (period: number, width: number, height: number) => {
    const points = [];
    const numPoints = 50;
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * width;
      const baseY = height * 0.5;
      const variation = Math.sin(i / period) * height * 0.2;
      const trend = (i / numPoints) * height * -0.3;
      points.push({ x, y: baseY + variation + trend });
    }
    return points;
  };

  const generatePriceData = (width: number, height: number) => {
    const points = [];
    const numPoints = 100;
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * width;
      const baseY = height * 0.5;
      const noise = (Math.random() - 0.5) * height * 0.1;
      const trend = Math.sin(i / 10) * height * 0.15;
      points.push({ x, y: baseY + noise + trend });
    }
    return points;
  };

  const drawLine = (ctx: CanvasRenderingContext2D, points: any[], color: string, label: string) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  };

  const drawMACDChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const chartHeight = height * 0.7;
    const macdHeight = height * 0.3;
    
    // Draw MACD lines
    const macdLine = generateMACDData(width, chartHeight, 'macd');
    const signalLine = generateMACDData(width, chartHeight, 'signal');
    
    drawLine(ctx, macdLine, '#2196f3', 'MACD');
    drawLine(ctx, signalLine, '#ff9800', 'Signal');
    
    // Draw histogram
    ctx.fillStyle = '#666';
    for (let i = 0; i < 50; i++) {
      const x = (i / 50) * width;
      const histHeight = Math.sin(i / 5) * 20;
      const color = histHeight > 0 ? '#00c853' : '#ff1744';
      ctx.fillStyle = color;
      ctx.fillRect(x - 2, chartHeight + macdHeight * 0.5 - histHeight, 4, Math.abs(histHeight));
    }
    
    // Add labels
    ctx.fillStyle = '#fff';
    ctx.font = '12px Inter';
    ctx.fillText('MACD', 10, 20);
    ctx.fillStyle = '#2196f3';
    ctx.fillText('● MACD선', 10, chartHeight + 20);
    ctx.fillStyle = '#ff9800';
    ctx.fillText('● 신호선', 100, chartHeight + 20);
  };

  const drawRSIBollingerChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const priceHeight = height * 0.6;
    const rsiHeight = height * 0.4;
    
    // Draw Bollinger Bands
    const upperBand = generateBollingerData(width, priceHeight, 'upper');
    const middleBand = generateBollingerData(width, priceHeight, 'middle');
    const lowerBand = generateBollingerData(width, priceHeight, 'lower');
    const priceData = generatePriceData(width, priceHeight);
    
    // Fill between bands
    ctx.fillStyle = 'rgba(33, 150, 243, 0.1)';
    ctx.beginPath();
    upperBand.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    for (let i = lowerBand.length - 1; i >= 0; i--) {
      ctx.lineTo(lowerBand[i].x, lowerBand[i].y);
    }
    ctx.closePath();
    ctx.fill();
    
    drawLine(ctx, upperBand, '#2196f3', 'Upper');
    drawLine(ctx, middleBand, '#666', 'Middle');
    drawLine(ctx, lowerBand, '#2196f3', 'Lower');
    drawLine(ctx, priceData, '#fff', 'Price');
    
    // Draw RSI
    const rsiOffset = priceHeight + 20;
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // RSI 70 line
    ctx.beginPath();
    ctx.moveTo(0, rsiOffset + rsiHeight * 0.3);
    ctx.lineTo(width, rsiOffset + rsiHeight * 0.3);
    ctx.stroke();
    
    // RSI 30 line
    ctx.beginPath();
    ctx.moveTo(0, rsiOffset + rsiHeight * 0.7);
    ctx.lineTo(width, rsiOffset + rsiHeight * 0.7);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw RSI line
    const rsiData = generateRSIData(width, rsiHeight, rsiOffset);
    drawLine(ctx, rsiData, '#ff9800', 'RSI');
    
    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = '11px Inter';
    ctx.fillText('볼린저밴드', 10, 20);
    ctx.fillText('RSI', 10, rsiOffset - 5);
    ctx.fillStyle = '#666';
    ctx.fillText('70', width - 20, rsiOffset + rsiHeight * 0.3);
    ctx.fillText('30', width - 20, rsiOffset + rsiHeight * 0.7);
  };

  const generateMACDData = (width: number, height: number, type: string) => {
    const points = [];
    const numPoints = 50;
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * width;
      const offset = type === 'macd' ? 0 : 5;
      const y = height * 0.5 + Math.sin((i + offset) / 8) * height * 0.2;
      points.push({ x, y });
    }
    return points;
  };

  const generateBollingerData = (width: number, height: number, band: string) => {
    const points = [];
    const numPoints = 50;
    const offset = band === 'upper' ? -50 : band === 'lower' ? 50 : 0;
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * width;
      const baseY = height * 0.5 + offset;
      const variation = Math.sin(i / 10) * 20;
      points.push({ x, y: baseY + variation });
    }
    return points;
  };

  const generateRSIData = (width: number, height: number, offset: number) => {
    const points = [];
    const numPoints = 50;
    for (let i = 0; i < numPoints; i++) {
      const x = (i / numPoints) * width;
      const value = 50 + Math.sin(i / 5) * 30 + (Math.random() - 0.5) * 10;
      const y = offset + height * (1 - value / 100);
      points.push({ x, y });
    }
    return points;
  };

  const drawFinancialStatement = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw bar chart for financial data
    const years = ['2021', '2022', '2023', '2024'];
    const revenues = [100, 120, 150, 180];
    const profits = [10, 15, 25, 35];
    
    const barWidth = width / (years.length * 3);
    const maxValue = 200;
    
    // Draw revenue bars
    ctx.fillStyle = '#2196f3';
    revenues.forEach((revenue, i) => {
      const barHeight = (revenue / maxValue) * height * 0.8;
      const x = (i * 3 + 1) * barWidth;
      const y = height * 0.9 - barHeight;
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Add value label
      ctx.fillStyle = '#fff';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(revenue.toString(), x + barWidth/2, y - 5);
      ctx.fillStyle = '#2196f3';
    });
    
    // Draw profit bars
    ctx.fillStyle = '#00c853';
    profits.forEach((profit, i) => {
      const barHeight = (profit / maxValue) * height * 0.8;
      const x = (i * 3 + 2) * barWidth;
      const y = height * 0.9 - barHeight;
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Add value label
      ctx.fillStyle = '#fff';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(profit.toString(), x + barWidth/2, y - 5);
      ctx.fillStyle = '#00c853';
    });
    
    // Draw year labels
    ctx.fillStyle = '#aaa';
    ctx.font = '12px Inter';
    years.forEach((year, i) => {
      const x = (i * 3 + 1.5) * barWidth;
      ctx.fillText(year, x, height - 5);
    });
    
    // Legend
    ctx.fillStyle = '#2196f3';
    ctx.fillRect(10, 10, 15, 15);
    ctx.fillStyle = '#fff';
    ctx.fillText('매출액', 30, 22);
    
    ctx.fillStyle = '#00c853';
    ctx.fillRect(100, 10, 15, 15);
    ctx.fillStyle = '#fff';
    ctx.fillText('순이익', 120, 22);
  };

  const drawValuationChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw PER comparison chart
    const companies = ['삼성전자', 'SK하이닉스', 'LG전자', '현대차'];
    const perValues = [12, 8, 15, 10];
    const avgPER = 11.25;
    
    const sectionWidth = width / companies.length;
    
    // Draw horizontal average line
    ctx.strokeStyle = '#ff9800';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    const avgY = height * (1 - avgPER / 20);
    ctx.beginPath();
    ctx.moveTo(0, avgY);
    ctx.lineTo(width, avgY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw PER bars
    perValues.forEach((per, i) => {
      const x = i * sectionWidth + sectionWidth * 0.2;
      const barWidth = sectionWidth * 0.6;
      const barHeight = (per / 20) * height;
      const y = height - barHeight;
      
      // Color based on comparison to average
      ctx.fillStyle = per < avgPER ? '#00c853' : '#ff1744';
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Company name
      ctx.fillStyle = '#aaa';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(companies[i], x + barWidth/2, height - 25);
      
      // PER value
      ctx.fillStyle = '#fff';
      ctx.fillText(`PER ${per}`, x + barWidth/2, y - 5);
    });
    
    // Labels
    ctx.fillStyle = '#ff9800';
    ctx.fillText('업계평균 PER', width - 80, avgY - 5);
  };

  const drawPortfolioChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw pie chart for portfolio allocation
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    
    const portfolio = [
      { name: '성장주', value: 40, color: '#2196f3' },
      { name: '가치주', value: 30, color: '#00c853' },
      { name: '배당주', value: 30, color: '#ff9800' }
    ];
    
    let startAngle = -Math.PI / 2;
    
    portfolio.forEach((sector, i) => {
      const angle = (sector.value / 100) * Math.PI * 2;
      
      // Draw sector
      ctx.fillStyle = sector.color;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle);
      ctx.closePath();
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw label
      const labelAngle = startAngle + angle / 2;
      const labelX = centerX + Math.cos(labelAngle) * radius * 0.7;
      const labelY = centerY + Math.sin(labelAngle) * radius * 0.7;
      
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${sector.value}%`, labelX, labelY);
      
      startAngle += angle;
    });
    
    // Legend
    let legendY = 20;
    portfolio.forEach((sector) => {
      ctx.fillStyle = sector.color;
      ctx.fillRect(20, legendY, 15, 15);
      ctx.fillStyle = '#fff';
      ctx.font = '12px Inter';
      ctx.fillText(sector.name, 40, legendY + 12);
      legendY += 25;
    });
  };

  const drawBacktestChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw performance comparison chart
    const months = 36;
    const strategyReturns: number[] = [];
    const marketReturns: number[] = [];
    
    // Generate cumulative returns
    let strategyCum = 100;
    let marketCum = 100;
    
    for (let i = 0; i < months; i++) {
      strategyCum *= 1 + (Math.random() * 0.04 - 0.01); // -1% to +3%
      marketCum *= 1 + (Math.random() * 0.03 - 0.015); // -1.5% to +1.5%
      strategyReturns.push(strategyCum);
      marketReturns.push(marketCum);
    }
    
    const maxValue = Math.max(...strategyReturns, ...marketReturns) * 1.1;
    const minValue = 90;
    
    // Draw grid lines
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 5; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      
      // Y-axis labels
      const value = minValue + ((maxValue - minValue) * (1 - i/5));
      ctx.fillStyle = '#666';
      ctx.font = '10px Inter';
      ctx.fillText(value.toFixed(0) + '%', 5, y + 3);
    }
    
    // Draw strategy performance
    ctx.strokeStyle = '#00c853';
    ctx.lineWidth = 2;
    ctx.beginPath();
    strategyReturns.forEach((value, i) => {
      const x = (i / months) * width;
      const y = height * (1 - (value - minValue) / (maxValue - minValue));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Draw market performance
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    marketReturns.forEach((value, i) => {
      const x = (i / months) * width;
      const y = height * (1 - (value - minValue) / (maxValue - minValue));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Legend
    ctx.fillStyle = '#00c853';
    ctx.fillRect(width - 150, 20, 15, 3);
    ctx.fillStyle = '#fff';
    ctx.font = '12px Inter';
    ctx.fillText('전략 수익률', width - 130, 24);
    
    ctx.fillStyle = '#666';
    ctx.fillRect(width - 150, 40, 15, 3);
    ctx.fillStyle = '#fff';
    ctx.fillText('시장 수익률', width - 130, 44);
    
    // Final returns
    const strategyFinal = strategyReturns[strategyReturns.length - 1] - 100;
    const marketFinal = marketReturns[marketReturns.length - 1] - 100;
    
    ctx.fillStyle = '#00c853';
    ctx.font = 'bold 14px Inter';
    ctx.fillText(`+${strategyFinal.toFixed(1)}%`, width - 150, height - 40);
    
    ctx.fillStyle = '#666';
    ctx.fillText(`+${marketFinal.toFixed(1)}%`, width - 150, height - 20);
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}