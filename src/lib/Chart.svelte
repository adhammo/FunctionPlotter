<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { abs, isNumeric } from 'mathjs';
  import { createChart, updateChartData } from '../chart';
  import { equationStore, equationBoundsStore } from '../stores';

  let validEqu: boolean;
  let evalEqu: (scope: any) => any;
  let evalDerivative: (scope: any) => any;
  let minX: number;
  let maxX: number;
  let minY: number;
  let maxY: number;
  $: {
    validEqu = $equationStore != null;
    evalEqu = $equationStore?.evalEqu;
    evalDerivative = $equationStore?.evalDerivative;
    minX = $equationBoundsStore?.minX;
    maxX = $equationBoundsStore?.maxX;
    minY = $equationBoundsStore?.minY;
    maxY = $equationBoundsStore?.maxY;
  }

  let data: Array<{ x: number; y: number | null }> | null = [];
  $: {
    // Check equation
    if (validEqu) {
      // Create data
      data = [];

      const intStep: number = 0.01;
      const lengthStep: number = 0.01;

      // Calculate function length
      let length: number = 0;
      for (let x = minX; x < maxX; x += intStep) {
        const res = evalDerivative({ x: x + intStep / 2 });
        if (isNumeric(res)) {
          const val: number = res as number;
          length += Math.sqrt(1 + Math.pow(val, 2)) * intStep;
        }
      }

      // Calculate xStep
      const xLength: number = maxX - minX;
      const yLength: number = maxY - minY;
      const modLenStep: number = lengthStep * Math.min(xLength, yLength);
      const xStep: number = xLength / (length / modLenStep);

      // Sample function, recalculate y bounds and fill data
      let x: number = minX;
      let y: number;
      let prevY: number | null = null;
      do {
        const res = evalEqu({ x: x > maxX ? maxX : x });
        if (isNumeric(res)) {
          y = res as number;
          if (prevY && Math.abs(y - prevY) > 1) {
            data.push({
              x,
              y: null,
            });
            prevY = y;
            x += xStep;
            continue;
          }
        } else {
          x += xStep;
          continue;
        }
        data.push({
          x,
          y,
        });
        prevY = y;
        x += xStep;
      } while (x < maxX + xStep);
    } else {
      data = null;
    }
  }

  let chartCanvas: HTMLCanvasElement;
  onMount(() => {
    // Create chart
    createChart(chartCanvas);
  });
  afterUpdate(() => {
    // Check data
    if (data) {
      // Update chart data
      updateChartData(data, minX, maxX, minY, maxY);
      data = null;
    }
  });
</script>

<div class="_chart">
  <canvas
    bind:this={chartCanvas}
    aria-label="chart canvas is not supported"
    role="img"
  />
</div>

<style>
  ._chart {
    margin-top: 1rem;
    width: 100% !important;
  }
</style>
