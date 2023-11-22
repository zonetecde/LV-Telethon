<script lang="ts">
	import { onMount } from 'svelte';
	import Student from '../../Models/Student';
	import Classe from '../../Models/Classe';

	let eleves: Student[] = [new Student('', '', '')];
	let classes: Classe[] = [];

	onMount(() => {
		// Ajout des classes
		for (let i = 1; i <= 14; i++) {
			classes = [...classes, new Classe('Seconde', i)];
			classes = [...classes, new Classe('Première', i)];
			classes = [...classes, new Classe('Terminale', i)];
		}
	});

	function addStudentButtonClicked() {
		eleves = [...eleves, new Student('', '', '')];
	}
</script>

<div class="p-6">
	<h1 class="text-3xl font-bold">Déposer un projet</h1>

	<p class="mt-4">Merci de remplir ce formulaire afin de publier votre projet pour le Téléthon</p>

	<form class="mt-4">
		<p class="text-base">Élève(s) concerné(s) :</p>
		<div
			class="border border-gray-400 p-2 w-full md:w-8/12 xl:w-4/12 rounded-lg mt-2 bg-[#F5F7F8] flex flex-col gap-y-1.5"
		>
			{#each eleves as eleve}
				<div class="grid grid-cols-3 gap-x-2">
					<input
						type="text"
						class="w-full px-1 outline-gray-200 py-2 border border-[#B5CB99]"
						placeholder="Prénom"
						bind:value={eleve.prenom}
					/>
					<input
						type="text"
						class="w-full px-1 outline-gray-200 py-2 border border-[#B5CB99]"
						placeholder="Nom"
						bind:value={eleve.nom}
					/>
					<select>
						{#each classes as classe}
							<option>{classe}</option>
						{/each}
					</select>
				</div>
			{/each}

			<button
				class="ml-auto flex flex-row items-center gap-x-0.5 bg-lime-200 px-3.5 pl-2 rounded-lg border border-green-600 py-1"
				on:click={addStudentButtonClicked}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="green"
					class="w-8 h-8"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				Ajouter un élève
			</button>
		</div>
	</form>
</div>
