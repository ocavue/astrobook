<!-- @component
A counter written with Svelte
-->
<script lang="ts">
import '../../styles/global.css'

import { writable } from 'svelte/store';

export let step = 1;

const count = writable(0);

function add() {
	count.update(n => n + step);
}

function subtract() {
	count.update(n => n - step);
}
</script>

<div class="counter">
	<button on:click={subtract}>-</button>
	<pre>{$count}</pre>
	<button on:click={add}>+</button>
</div>
<div class="counter-message">
	<slot />
</div>
