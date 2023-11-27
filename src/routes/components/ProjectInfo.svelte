<script lang="ts">
	import { onMount } from 'svelte';
	import type Project from '../../Models/Project.js';

	export let projectId: number = 0;
	let project: Project;

	onMount(async () => {
		const response = await fetch('/api/get-project?projectId=' + projectId);

		project = await response.json();
	});
</script>

<div class="w-96 h-52 bg-red-100 rounded-xl border-2 border-black">
	{#if project}
		<h1>{project.projectName}</h1>
	{:else}
		<h1>Chargement...</h1>
	{/if}
</div>
