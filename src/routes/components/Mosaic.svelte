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

	let isUnderDev = false;
	onMount(async () => {
		var currentUrl = window.location.href;
		if (currentUrl.includes('localhost')) {
			isUnderDev = true;
		}

		const response = await fetch('/api/get-images');

		imagesPath = await response.json();
	});

	let hoveredElement: HTMLImageElement | null;
	let hoveredElementToShow: HTMLImageElement | null;

	function handleMouseEnter(event: MouseEvent) {
		const target = event.target as HTMLImageElement;

		hoveredElement = target;

		setTimeout(() => {
			const onPhone = window.innerWidth < 640; // Un simple clique suffit alors à afficher les informations
			if (hoveredElement === target || onPhone) {
				projectId = parseInt(target.alt);
				hoveredElementToShow = target;

				const INFORMATION_WIDTH = 700;
				// Place la fenêtre d'information au centre bas de l'image
				offsetX = `${target.offsetLeft - INFORMATION_WIDTH / 2}px`;
				offsetY = `${target.offsetTop + target.offsetHeight / 2 - 20}px`;

				// Si on est sur les bords de l'écran, on décale la fenêtre d'information
				if (target.offsetLeft < INFORMATION_WIDTH / 2) {
					offsetX = `${target.offsetLeft}px`;
				} else if (target.offsetLeft + INFORMATION_WIDTH / 2 > window.innerWidth) {
					offsetX = `${window.innerWidth - INFORMATION_WIDTH}px`;
				}
			}
		}, 750);
	}

	function handleMouseLeave(event: any) {
		if (event.currentTarget.classList.contains('projectInfo') === false) {
			hoveredElementToShow = null;
			hoveredElement = null;
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="bg-white w-full h-full" on:mouseenter={handleMouseLeave}>
	<div class="w-full h-full grid grid-cols gap-0 place-content-start">
		{#each imagesPath as { projectId, imagePaths }}
			{#each imagePaths as { nomFichier, Type }, i}
				{#if Type !== 'other'}
					<img
						src={Type === 'audio'
							? './src/assets/audio.png'
							: Type === 'text'
							? 'text.png'
							: (!isUnderDev ? 'https://lv-telethon.fr/static' : '') + // pour servire les images en static
							  nomFichier.replace('./uploaded', '/uploaded') +
							  (Type === /* Path de la miniature de la vidéo */ 'video' ? '.jpg' : '')}
						alt={projectId.toString()}
						class="w-full aspect-square object-fill hover:scale-[3] duration-150 hover:z-50 transition-all cursor-pointer projectInfo"
						on:mouseenter={handleMouseEnter}
						on:mouseleave={handleMouseLeave}
					/>
				{/if}
			{/each}
		{/each}
	</div>

	<img
		src={Telethon}
		alt=""
		class="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60"
	/>
</div>

{#if hoveredElementToShow}
	<div
		class="md:absolute block w-full z-50 overflow-hidden hidden"
		style="left: {offsetX}; top: {offsetY}"
	>
		<ProjectInfo
			{projectId}
			on:mouseleave={() => {
				hoveredElementToShow = null;
				hoveredElement = null;
			}}
		/>
	</div>
{/if}

<style>
	@media (min-width: 640px) {
		.grid-cols {
			grid-template-columns: repeat(21, minmax(0, 1fr));
		}
	}

	@media (max-width: 639px) {
		.grid-cols {
			grid-template-columns: repeat(8, minmax(0, 1fr));
		}
	}
</style>
