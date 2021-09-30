<script lang="ts">
  import EquationView from '../lib/EquationView.svelte';
  import Equation from '../lib/Equation.svelte';
  import Chart from '../lib/Chart.svelte';
</script>

<main>
  <section class="_view">
    <div class="_container">
      <section class="_header">
        <h3 class="title">Function Plotter</h3>
        <i class="icon fas fa-drafting-compass fa-lg" />
      </section>
      <section class="_body">
        <EquationView />
        <Equation />
        <Chart />
      </section>
    </div>
  </section>
</main>

<style>
  ._view {
    width: 100%;
    height: auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3c415e;
  }

  ._view::after {
    content: '';
    display: block;
    min-height: inherit;
    font-size: 0;
  }

  ._container {
    width: calc(100% - 2rem);
    max-width: 50rem;
    margin: 0.5rem;
    display: flex;
    align-items: stretch;
    justify-content: center;
  }

  ._header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    box-sizing: border-box;
    background-color: #494ca2;
  }

  ._header .icon {
    color: #f5f5f5;
    margin-top: 0.5rem;
    transform: rotate(-90deg);
  }

  ._header .title {
    color: #f5f5f5;
    margin: 0 0.2rem 0 0;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  ._body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    padding: 1rem;
    background-color: #f3f9fb;
  }
</style>
