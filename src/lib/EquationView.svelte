<script lang="ts">
  import { afterUpdate } from 'svelte';
  import katex from 'katex';
  import { equationStore } from '../stores';

  let equTex: string | null;
  $: {
    equTex = $equationStore?.equTex;
  }

  let equationViewer: HTMLSpanElement;
  afterUpdate(() => {
    katex.render(equTex ? `f(x)=${equTex}` : 'f(x)', equationViewer);
    equTex = null;
  });
</script>

<div class="_equation_viewer">
  <span bind:this={equationViewer} />
</div>

<style>
  ._equation_viewer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 1.8rem;
  }
</style>
