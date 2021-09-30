<script lang="ts">
  import { parse, derivative } from 'mathjs';
  import { equationStore, equationBoundsStore } from '../stores';

  let equation: string = 'x+4';
  let equationError: string | null = null;

  let minX: number | null = -10;
  let maxX: number | null = 10;
  let minY: number | null = -6;
  let maxY: number | null = 14;
  let equationBoundsError: string | null = null;

  $: {
    try {
      // Check equation string
      if (!equation) throw Error('Please enter equation f(x) to plot');

      // Parse equation string
      const paresdEqu = parse(equation);

      // Check parsed equation symbols validity
      paresdEqu.traverse((node, path) => {
        switch (node.type) {
          case 'SymbolNode':
            if (path !== 'fn' && node.name !== 'x')
              throw Error(`Undefined symbol ${node.name}`);
            break;
          case 'OperatorNode':
          case 'ConstantNode':
          case 'FunctionNode':
          case 'ParenthesisNode':
            break;
          default:
            throw Error(`Undefined node ${node.type}`);
        }
      });

      // Compile equation then check evaluation
      const compiledEqu = paresdEqu.compile();
      compiledEqu.evaluate({ x: 4 });

      // Get and compile derivative then check evaluation
      const equDerivative = derivative(paresdEqu, 'x');
      const compiledEquDerivative = equDerivative.compile();
      compiledEquDerivative.evaluate({ x: 4 });

      // Stringify equation
      const equTex = paresdEqu.toTex();

      // Store equation
      equationStore.set({
        evalEqu: compiledEqu.evaluate,
        evalDerivative: compiledEquDerivative.evaluate,
        equTex,
      });

      // Mark equation as valid
      equationError = null;
    } catch (error) {
      // Reset equation store
      equationStore.set(null);

      // Mark equation as invalid and report error
      equationError = (error as Error).message;
    }
  }

  $: {
    if (minX && maxX && minY && maxY && maxX > minX && maxY > minY) {
      equationBoundsStore.set({ minX, maxX, minY, maxY });
      equationBoundsError = null;
    } else {
      equationBoundsError = 'Min x(y) must be bigger than max x(y)';
    }
  }
</script>

<div class="tile">
  <div class="tile is-parent">
    <div class="_equation_field field">
      <label class="label" for="_equation"> Enter equation f(x) to plot </label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="_equation input {equationError ? 'is-danger' : ''}"
          type="text"
          spellcheck="false"
          placeholder="sqrt(x)"
          bind:value={equation}
        />
        <span class="icon is-small is-left">
          <i class="fas fa-square-root-alt" />
        </span>
        {#if equationError}
          <span class="icon is-small is-right fas">
            <i class="fas fa-exclamation-triangle" />
          </span>
        {/if}
      </div>
      <p class="_error help is-danger">
        <span hidden={!equationError}>{equationError}</span>
      </p>
    </div>
  </div>
</div>
<div class="tile">
  <div class="tile is-vertical is-12">
    <div class="tile">
      <div class="tile is-parent">
        <div class="field">
          <label class="label" for="_minX"> Min x value </label>
          <div class="control">
            <input
              class="_minX input"
              type="number"
              spellcheck="false"
              placeholder="-10"
              bind:value={minX}
            />
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="field">
          <label class="label" for="_maxX"> Max x value </label>
          <div class="control">
            <input
              class="_maxX input"
              type="number"
              spellcheck="false"
              placeholder="10"
              bind:value={maxX}
            />
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="field">
          <label class="label" for="_minY"> Min y value </label>
          <div class="control">
            <input
              class="_minY input"
              type="number"
              spellcheck="false"
              placeholder="-10"
              bind:value={minY}
            />
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="field">
          <label class="label" for="_maxY"> Max y value </label>
          <div class="control">
            <input
              class="_maxY input"
              type="number"
              spellcheck="false"
              placeholder="10"
              bind:value={maxY}
            />
          </div>
        </div>
      </div>
    </div>
    <div class="_bounds_error_tile tile is-parent">
      <p class="_bounds_error help is-danger">
        <span hidden={!equationBoundsError}>{equationBoundsError}</span>
      </p>
    </div>
  </div>
</div>

<style>
  ._equation_field {
    width: 100%;
    margin-bottom: 0;
  }

  ._bounds_error_tile {
    padding-top: 0;
    padding-bottom: 0;
  }

  ._bounds_error {
    margin-top: 0;
  }
</style>
