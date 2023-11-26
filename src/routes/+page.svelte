<script lang="ts">
	import Mosaic from './components/Mosaic.svelte';

	let debug = true;
</script>

<div class="w-full h-full flex items-center justify-center flex-col text-center">
	{#if debug}
		<p class="text-4xl">Cette page est en travaux !</p>
		<p class="mt-10 text-2xl">
			Il y aura ici une mosaïque de tous vos projets aux couleurs du Téléthon ♥
		</p>
		<p class="mt-3">
			Pour déposer un projet, <a href="/deposer-son-projet" class="text-blue-700 underline"
				>cliquez ici</a
			>
		</p>
	{:else}
		<Mosaic />
	{/if}
</div>
