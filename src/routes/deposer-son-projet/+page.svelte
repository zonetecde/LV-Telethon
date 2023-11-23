<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import DeleteIcon from '../../assets/delete.svg';
	import EyeIcon from '../../assets/eye.svg';
	import Student from '../../Models/Student.js';
	import Classe from '../../Models/Classe.js';
	import Resource from '../../Models/Resource.js';

	let eleves: Student[] = [new Student('', '', 'S1')];
	let classes: Classe[] = [];
	let resources: File[] = [];
	let mainImage: File | null = null;
	let fichiers: File[] = [];
	let projectName: string = '';
	let description: string = '';
	let hideOurNames: boolean = false;
	let isSending: boolean = false;

	onMount(() => {
		// Ajout des classes
		classes = [
			...Array.from({ length: 14 }, (_, i) => new Classe('Seconde', i + 1)),
			...Array.from({ length: 14 }, (_, i) => new Classe('Première', i + 1)),
			...Array.from({ length: 14 }, (_, i) => new Classe('Terminale', i + 1))
		];
	});

	function addStudentButtonClicked() {
		eleves = [...eleves, new Student('', '', eleves[0].classe ?? 'S1')];
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
		if (
			files.some(
				(file) =>
					file.type.startsWith('image/') ||
					file.type.startsWith('video/') ||
					file.type.startsWith('audio/')
			)
		) {
			toast.warning(
				'Les images, vidéos et audios devraient être ajoutés dans la séction "Joindre des images du projet".'
			);
		}
	}

	function imagesUploaded(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!event.currentTarget.files) return;

		// Vérifie que les fichiers sélectionnées sont des images ou vidéos
		let files = Array.from(event.currentTarget.files).filter(
			(file) =>
				file.type.startsWith('image/') ||
				file.type.startsWith('video/') ||
				file.type.startsWith('audio/')
		);

		if (files.length === 0) {
			toast.error('Vous devez sélectionner au moins une ressource');
			return;
		}

		// Enlève les images déjà ajoutées
		files = files.filter((file) => !resources.some((img) => img.name === file.name));

		if (files.length === 0) {
			toast.error('Vous avez déjà ajouté ces ressources');
			return;
		}

		if (resources.length === 0) {
			mainImage = files[0];
		}

		resources = [...resources, ...files];

		toast.success(`${files.length} ressource(s) importée(s)`);
	}

	function removeResource(image: File): any {
		resources = resources.filter((img) => img !== image);
	}

	function removeFile(fichier: File) {
		fichiers = fichiers.filter((file) => file !== fichier);
	}

	async function sendProject() {
		if (isSending) {
			toast.error("Le projet est en cours d'envoi, merci de patientier.");
			return;
		}

		// Vérifie qu'il y ai au moins une ressource sélectionnée
		if (resources.length === 0) {
			toast.error('Vous devez sélectionner au moins une image, vidéo ou audio.');
			return;
		}

		isSending = true;
		toast.info('Envoi du projet en cours, merci de patienter...');

		// Envoie à l'API les projets
		const formData = new FormData();

		for (const file of [...fichiers, ...resources]) {
			// Envoie sép
			const type = file.type.startsWith('image/')
				? 'image'
				: file.type.startsWith('video/')
				? 'video'
				: file.type.startsWith('audio/')
				? 'audio'
				: 'file';

			var fichier = new Resource(file.name, mainImage === file, type as any);
			formData.append('resources', file);
			formData.append('resourcesData', JSON.stringify(fichier));
		}

		formData.append('projectName', projectName);
		formData.append('projectDescription', description);

		formData.append('students', JSON.stringify(eleves));
		formData.append('hideOurNames', JSON.stringify(hideOurNames));

		try {
			const response = await fetch('/api/send-project', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				toast.success('Projet envoyé !');
				window.location.href = '/merci';
			} else {
				toast.error(
					"Une erreur est survenue lors de l'envoi du projet. Veuillez réessayer plus tard.\n\nErreur :" +
						(await response.text())
				);
			}
		} catch (error) {
			console.error('Error during file upload:', error);
		} finally {
			isSending = false;
		}
	}
</script>

<div class="flex justify-center">
	<div class="p-3 md:p-6 w-full md:w-10/12 xl:w-8/12">
		<h1 class="text-3xl font-bold">Déposer un projet</h1>

		<p class="mt-4">Merci de remplir ce formulaire afin de publier votre projet pour le Téléthon</p>

		<form class="mt-4 flex flex-col" on:submit={sendProject}>
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
							required
						/>
						<input
							type="text"
							class="w-2/5 px-1 outline-gray-200 py-2 border border-[#B5CB99]"
							placeholder="Nom"
							bind:value={eleve.nom}
							required
						/>
						<select
							class="py-2 px-1 w-1/5 border border-[#B5CB99] outline-gray-200"
							required
							bind:value={eleve.classe}
						>
							{#each classes as classe}
								<option>{classe.niveau[0] + classe.nombre}</option>
							{/each}
						</select>

						<!-- Enlève la possibilité d'enlever un élève si c'est le dernier car il en faut 1 au minimum -->
						{#if eleves.length > 1}
							<button class="w-6 h-6" type="button" on:click={() => removeStudent(eleve)}>
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

				<label>
					<input type="checkbox" class="mt-2" bind:checked={hideOurNames} />
					Je ne souhaite pas que nos noms apparaissent sur le site
				</label>
			</div>

			<div class="mt-2.5 border border-gray-400 p-2 rounded-lg bg-[#F5F7F8]">
				<p class="text-base">Nom du projet :</p>
				<input
					bind:value={projectName}
					type="text"
					class="mt-2 w-full px-1 outline-gray-200 py-2 border border-[#B5CB99]"
					placeholder="Espoir pour le Téléthon"
					required
				/>
			</div>

			<div class="mt-2.5 border border-gray-400 p-2 rounded-lg bg-[#F5F7F8]">
				<p class="text-base">Description du projet :</p>
				<textarea
					bind:value={description}
					class="mt-2 w-full px-1 outline-gray-200 py-2 border border-[#B5CB99]"
					placeholder="Expliquer les raisons de votre choix, ses objectifs, etc."
				/>
			</div>

			<div class="mt-2.5 border border-gray-400 p-2 rounded-lg bg-[#F5F7F8]">
				<p class="text-base">Joindre des images, vidéos ou audio du projet :</p>
				<div class="flex flex-row">
					<button type="button" class="relative bg-lime-300 px-3 py-1 border border-lime-500 mt-2">
						<input
							type="file"
							class="outline-gray-200 border border-[#B5CB99] absolute opacity-0 inset-0 cursor-pointer"
							multiple
							on:change={imagesUploaded}
							accept=".jpg, .jpeg, .png, .webp, .mp4, .mp3, .gif, .avi, .webm, .mov, .flv, .ogg, .aac, .wav, .m4a"
						/>
						Ajouter des images
					</button>

					<p class="ml-auto md:mr-3 italic text-sm">
						{resources.length > 0
							? "Cliquez sur une image pour en faire l'image de couverture"
							: ''}
					</p>
				</div>
				<div
					class="grid md:grid-cols-4 grid-cols-3 xl:grid-cols-6 gap-2 mt-2 overflow-y-auto auto-rows-fr"
				>
					{#each resources as image}
						<div
							class="relative border-2 border-orange-700 bg-orange-50 overflow-none flex items-center justify-center"
						>
							<button
								type="button"
								on:click={() => {
									mainImage = image;
								}}
								class="flex justify-center items-center"
							>
								{#if image.type.startsWith('image/')}
									<img src={URL.createObjectURL(image)} alt={image.name} class="object-contain" />
								{:else}
									<!-- Audio ou vidéo -->
									<video
										controls
										src={URL.createObjectURL(image)}
										class="w-full h-full object-contain max-h-[200px]"
									>
										<track kind="captions" class="object-cover" lang="fr" />
									</video>
								{/if}
							</button>

							<button
								type="button"
								class="w-10 h-10 absolute bottom-2 right-2 bg-yellow-200 rounded-full flex justify-center items-center"
								on:click={() => removeResource(image)}
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
				<button type="button" class="relative bg-lime-300 px-3 py-1 border border-lime-500 mt-2">
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
							<button type="button" class="ml-auto" on:click={() => removeFile(fichier)}>
								<img src={DeleteIcon} alt="Supprimer" class="w-6 h-6" />
							</button>
						</div>
					{/each}
				</div>
			</div>

			<button
				type="submit"
				class="mt-5 px-3 py-1.5 bg-green-300 border-2 border-green-700 w-8/12 self-center rounded-lg hover:bg-green-500 duration-150"
				>Envoyer votre projet !</button
			>
		</form>
	</div>
</div>
