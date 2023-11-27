<script lang="ts">
	import { onMount } from 'svelte';
	import Telethon from '../../assets/telethon.png';
	import type Resource from '../../Models/Resource.js';
	import ProjectInfo from './ProjectInfo.svelte';

	// Offset de la fenêtre d'information
	let offsetX = 'left-0';
	let offsetY = 'top-0';
	let projectId = 0;

	let imagesPath: {
		projectId: number;
		imagePaths: Resource[];
	}[] = [];

	onMount(async () => {
		const response = await fetch('/api/get-images');

		imagesPath = await response.json();
	});

	let hoveredElement: HTMLImageElement | null;
	let hoveredElementToShow: HTMLImageElement | null;

	function handleMouseEnter(event: MouseEvent) {
		const target = event.target as HTMLImageElement;

		hoveredElement = target;

		setTimeout(() => {
			if (hoveredElement === target) {
				// Place la fenêtre d'information au centre bas de l'image
				offsetX = `${target.offsetLeft - 322 / 2}px`;
				offsetY = `${target.offsetTop + target.offsetHeight / 2 + 25}px`;
				projectId = parseInt(target.alt);
				hoveredElementToShow = target;
			}
		}, 750);
	}

	function handleMouseLeave() {
		hoveredElementToShow = null;
		hoveredElement = null;
	}
</script>

<div class="bg-white w-full h-full">
	<div class="w-full h-full grid grid-cols-32 gap-0 place-content-start">
		{#each imagesPath as { projectId, imagePaths }}
			{#each imagePaths as { nomFichier, Type }, i}
				<!-- Image ou vidéo -->
				<img
					src={Type === 'audio'
						? './src/assets/audio.png'
						: nomFichier + (Type === /* Path de la miniature de la vidéo */ 'video' ? '.jpg' : '')}
					alt={projectId.toString()}
					class="w-full aspect-square object-fill hover:scale-150 duration-150 hover:z-50 transition-all cursor-pointer"
					on:mouseenter={handleMouseEnter}
					on:mouseleave={handleMouseLeave}
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

{#if hoveredElementToShow}
	<div class="absolute z-50" style="left: {offsetX}; top: {offsetY}">
		<ProjectInfo {projectId} />
	</div>
{/if}

<style>
	.grid-cols-32 {
		grid-template-columns: repeat(32, minmax(0, 1fr));
	}
</style>
