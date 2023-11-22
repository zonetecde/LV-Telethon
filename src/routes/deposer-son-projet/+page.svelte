<script lang="ts">
	import { onMount } from 'svelte';
	import { Student } from '../../Models/Student';
	import Classe from '../../Models/Classe';
	import { toast } from 'svelte-sonner';
	import DeleteIcon from '../../assets/delete.svg';
	import EyeIcon from '../../assets/eye.svg';

	let eleves: Student[] = [new Student('', '', '')];
	let classes: Classe[] = [];
	let images: File[] = [];
	let mainImage: File | null = null;
	let fichiers: File[] = [];

	onMount(() => {
		// Ajout des classes
		classes = [
			...Array.from({ length: 14 }, (_, i) => new Classe('Seconde', i + 1)),
			...Array.from({ length: 14 }, (_, i) => new Classe('Première', i + 1)),
			...Array.from({ length: 14 }, (_, i) => new Classe('Terminale', i + 1))
		];
	});

	function addStudentButtonClicked() {
		eleves = [...eleves, new Student('', '', '')];
	}

	function removeStudent(student: Student) {
		eleves = eleves.filter((eleve) => eleve !== student);
	}

	function filesUploaded(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!event.currentTarget.files) return;

		let files = Array.from(event.currentTarget.files);

		if (files.length === 0) {
			toast.error('Vous devez sélectionner au moins un fichier');
			return;
		}

		// Enlève les fichiers déjà ajoutés
		files = files.filter((file) => !fichiers.some((fichier) => fichier.name === file.name));

		if (files.length === 0) {
			toast.error('Vous avez déjà ajouté ces fichiers');
			return;
		}

		fichiers = [...fichiers, ...files];

		toast.success(`${files.length} fichier(s) importé(s)`);

		// Si il y a une image, on prévient l'utilisateur que ce n'est
		// pas la bonne catégorie
		if (files.some((file) => file.type.startsWith('image/'))) {
			toast.warning(
				'Les images devraient être ajoutées dans la séction "Joindre des images du projet".'
			);
		}
	}

	function imagesUploaded(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!event.currentTarget.files) return;

		// Vérifie que les fichiers sélectionnées sont des images
		let files = Array.from(event.currentTarget.files).filter((file) =>
			file.type.startsWith('image/')
		);

		if (files.length === 0) {
			toast.error('Vous devez sélectionner au moins une image');
			return;
		}

		// Enlève les images déjà ajoutées
		files = files.filter((file) => !images.some((img) => img.name === file.name));

		if (files.length === 0) {
			toast.error('Vous avez déjà ajouté ces images');
			return;
		}

		if (images.length === 0) {
			mainImage = files[0];
		}

		images = [...images, ...files];

		toast.success(`${files.length} image(s) importée(s)`);
	}

	function removeImage(image: File): any {
		images = images.filter((img) => img !== image);
	}

	function removeFile(fichier: File) {
		fichiers = fichiers.filter((file) => file !== fichier);
	}

	function sendProject() {}
</script>

<div class="flex justify-center">
	<div class="p-3 md:p-6 w-full md:w-10/12 xl:w-8/12">
		<h1 class="text-3xl font-bold">Déposer un projet</h1>

		<p class="mt-4">Merci de remplir ce formulaire afin de publier votre projet pour le Téléthon</p>

		<form class="mt-4 flex flex-col">
			<p class="text-base">Élève(s) concerné(s) :</p>
			<div
				class="border border-gray-400 p-2 w-full rounded-lg mt-2 bg-[#F5F7F8] flex flex-col gap-y-1.5"
			>
				{#each eleves as eleve}
					<div class="gap-x-0.5 md:gap-x-2 flex flex-row items-center">
						<input
							type="text"
							class="w-2/5 px-1 outline-gray-200 py-2 border border-[#B5CB99]"
							placeholder="Prénom"
							bind:value={eleve.prenom}
						/>
						<input
							type="text"
							class="w-2/5 px-1 outline-gray-200 py-2 border border-[#B5CB99]"
							placeholder="Nom"
							bind:value={eleve.nom}
						/>
						<select class="py-2 px-1 w-1/5 border border-[#B5CB99] outline-gray-200">
							{#each classes as classe}
								<option>{classe.niveau[0] + classe.nombre}</option>
							{/each}
						</select>

						<!-- Enlève la possibilité d'enlever un élève si c'est le dernier car il en faut 1 au minimum -->
						{#if eleves.length > 1}
							<button class="w-6 h-6" on:click={() => removeStudent(eleve)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="red"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
									/>
								</svg>
							</button>
						{/if}
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

			<div class="mt-2.5 border border-gray-400 p-2 rounded-lg bg-[#F5F7F8]">
				<p class="text-base">Nom du projet :</p>
				<input
					type="text"
					class="mt-2 w-full px-1 outline-gray-200 py-2 border border-[#B5CB99]"
					placeholder="Espoir pour le Téléthon"
				/>
			</div>

			<div class="mt-2.5 border border-gray-400 p-2 rounded-lg bg-[#F5F7F8]">
				<p class="text-base">Description du projet :</p>
				<textarea
					class="mt-2 w-full px-1 outline-gray-200 py-2 border border-[#B5CB99]"
					placeholder="Expliquer les raisons de votre choix, ses objectifs, etc."
				/>
			</div>

			<div class="mt-2.5 border border-gray-400 p-2 rounded-lg bg-[#F5F7F8]">
				<p class="text-base">Joindre des images du projet :</p>
				<div class="flex flex-row">
					<button class="relative bg-lime-300 px-3 py-1 border border-lime-500 mt-2">
						<input
							type="file"
							class="outline-gray-200 border border-[#B5CB99] absolute opacity-0 inset-0 cursor-pointer"
							multiple
							on:change={imagesUploaded}
						/>
						Ajouter des images
					</button>

					<small class="ml-auto italic">
						{images.length > 0 ? "Cliquez sur une image pour en faire l'image de couverture" : ''}
					</small>
				</div>
				<div class="grid grid-cols-6 gap-2 mt-2">
					{#each images as image}
						<div class="relative">
							<button
								on:click={() => {
									mainImage = image;
								}}
							>
								<img src={URL.createObjectURL(image)} alt={image.name} />
							</button>

							<button
								class="w-10 h-10 absolute bottom-2 right-2 bg-yellow-200 rounded-full flex justify-center items-center"
								on:click={() => removeImage(image)}
							>
								<img src={DeleteIcon} alt="Supprimer" class="w-6 h-6" />
							</button>

							{#if image === mainImage}
								<div
									class="w-10 h-10 absolute top-2 left-2 bg-lime-300 rounded-full flex justify-center items-center"
									title="Image principale"
								>
									<img src={EyeIcon} alt="Image principale" class="w-6 h-6" aria-hidden="true" />
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<div class="mt-2.5 border border-gray-400 p-2 rounded-lg bg-[#F5F7F8]">
				<p class="text-base">Joindre des fichiers annexes :</p>
				<button class="relative bg-lime-300 px-3 py-1 border border-lime-500 mt-2">
					<input
						type="file"
						class="outline-gray-200 border border-[#B5CB99] absolute opacity-0 inset-0 cursor-pointer"
						multiple
						on:change={filesUploaded}
					/>
					Ajouter des fichiers
				</button>

				<div class="flex flex-col gap-y-2 mt-2">
					{#each fichiers as fichier}
						<div
							class="relative flex flex-row bg-yellow-100 rounded-lg p-2 border border-yellow-300"
						>
							<p>{fichier.name}</p>
							<button class="ml-auto" on:click={() => removeFile(fichier)}>
								<img src={DeleteIcon} alt="Supprimer" class="w-6 h-6" />
							</button>
						</div>
					{/each}
				</div>
			</div>

			<label>
				<input type="checkbox" class="mt-5" />
				Je sais que je ne pourrais pas modifier mon projet après l'avoir envoyé
			</label>
			<label>
				<input type="checkbox" class="mt-2" />
				Je sais que le projet sera d'abord envoyé à un modérateur avant d'être publié
			</label>

			<button
				class="mt-5 px-3 py-1.5 bg-green-300 border-2 border-green-700 w-8/12 self-center rounded-lg"
				on:click={sendProject}>Envoyer votre projet !</button
			>
		</form>
	</div>
</div>
