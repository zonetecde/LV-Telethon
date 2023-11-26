<script lang="ts">
	import { onMount } from 'svelte';
	import Telethon from '../../assets/telethon.png';
	import type Resource from '../../Models/Resource.js';

	let imagesPath: {
		projectId: number;
		imagePaths: Resource[];
	}[] = [];

	onMount(async () => {
		const response = await fetch('/api/get-images');

		imagesPath = await response.json();
	});
</script>

<div class="bg-white w-full h-full">
	<div class="w-full h-full grid grid-cols-32 gap-0 place-content-start">
		{#each imagesPath as { projectId, imagePaths }}
			{#each imagePaths as { nomFichier, Type }}
				<!-- Image ou vidéo -->
				<img
					src={Type === 'audio'
						? './src/assets/audio.png'
						: nomFichier + (Type === /* Path de la miniature de la vidéo */ 'video' ? '.jpg' : '')}
					alt=""
					class="w-full aspect-square object-fill"
					on:mouseenter={() => {
						console.log('hover');
					}}
				/>
			{/each}
		{/each}
	</div>

	<img
		src={Telethon}
		alt=""
		class="absolute z-50 w-11/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
	/>
</div>

<style>
	.grid-cols-32 {
		grid-template-columns: repeat(32, minmax(0, 1fr));
	}
</style>
