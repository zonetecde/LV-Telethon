<script lang="ts">
	import type Resource from '../../Models/Resource.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import type Project from '../../Models/Project.js';
	import Student from '../../Models/Student.js';

	export let projectId: number = 0;
	let project: Project;

	let isUnderDev = false;

	let mounted = false;
	onMount(async () => {
		var currentUrl = window.location.href;
		if (currentUrl.includes('localhost')) {
			isUnderDev = true;
		}

		mounted = true;

		const response = await fetch('/api/get-project?projectId=' + projectId);

		project = await response.json();
	});

	$: {
		projectId;
		if (mounted) {
			fetch('/api/get-project?projectId=' + projectId).then(
				async (response) => (project = await response.json())
			);
		}
	}

	const dispatcher = createEventDispatcher();
	function handleMouseLeave(event: MouseEvent) {
		dispatcher('mouseleave', event);
	}

	function handleDownloadFile(resource: Resource) {
		const url =
			(isUnderDev ? '/uploaded/' : 'https://lv-telethon.fr/static/uploaded/') +
			resource.nomFichier.replace('./uploaded/', '');

		// Télécharge la ressource
		const link = document.createElement('a');
		link.href = url;
		link.download = resource.nomFichier.replace('./uploaded/', '');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="w-full md:w-[700px] h-80 bg-white rounded-xl border-t-2 md:border-2 border-black flex flex-col px-3 pt-3 overflow-y-auto projectInfo"
	on:mouseleave={handleMouseLeave}
>
	{#if project}
		<h1 class="text-center text-xl font-bold">{project.projectName}</h1>

		{#if project.projectDescription !== ''}
			<h3 class="font-bold mt-3 text-left">Description du projet :</h3>
			<p class=" text-left">{project.projectDescription}</p>
		{/if}

		<!-- Les images -->
		{#if project.resources}
			<h3 class="font-bold mt-3 text-left">Images du projet :</h3>
			<div class="flex flex-col flex-wrap justify-center">
				{#each project.resources as resource}
					{#if resource.Type === 'image'}
						<img
							src={(!isUnderDev ? 'https://lv-telethon.fr/static' : '') + // pour servire les images en static
								resource.nomFichier.replace('./uploaded', '/uploaded')}
							alt={resource.nomFichier}
							class="w-full object-cover"
						/>
					{:else if resource.Type === 'video' || resource.Type === 'audio'}
						<video
							src={(!isUnderDev ? 'https://lv-telethon.fr/static' : '') + // pour servire les images en static
								resource.nomFichier.replace('./uploaded', '/uploaded')}
							class="w-40 h-40 object-cover m-1"
							controls
						>
							<track kind="captions" />
						</video>
					{:else}
						<div class="flex flex-row">
							<p>Pièce(s) jointe(s) :</p>
							<button
								class="text-blue-500 px-3 bg-sky-200 py-1.5 hover:underline ml-2"
								on:mousedown={() => handleDownloadFile(resource)}
							>
								{resource.nomFichier.replace('./uploaded/', '')}
							</button>
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		{#if project.students}
			<p class="text-left font-bold">
				De :
				{#each project.students as student, i}
					{student.prenom}
					{student.nom} ({student.classe}){#if i < project.students.length - 1},{' '}{/if}
				{/each}
			</p>
		{/if}
	{:else}
		<h1>Chargement...</h1>
	{/if}
</div>
