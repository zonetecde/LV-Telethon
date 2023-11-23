<script>
	import '../app.css';
	import { Toaster } from 'svelte-sonner';

	import TelethonLogo from '../assets/logo-telethon.png';
</script>

<Toaster />

<div
	class="w-screen h-20 bg-[#F5F300] header-bg flex md:justify-center items-center border-b-2 border-yellow-200 relative z-50"
>
	<button
		on:click={() => (window.location.href = '/')}
		class="flex flex-row items-center justify-center"
	>
		<img src={TelethonLogo} class="ml-1 md:ml-0 md:w-20 md:h-20 w-10 h-10" alt="Logo du Téléthon" />
		<h1 class="text-xl md:text-3xl font-bold">LV Téléthon</h1>
	</button>
	<a
		class="absolute right-2 md:right-5 py-1 md:py-3 px-2 md:px-5 rounded-xl bg-[#F3B664] border md:border-2 border-[#EC8F5E] shadow-md shadow-orange-800 text-md md:hover:scale-105 duration-150 md:hover:shadow-lg"
		href="/deposer-son-projet">Déposer un projet</a
	>
</div>

<div class="main-bg w-screen h-screen -mt-20 pt-20 overflow-x-hidden">
	<slot />
</div>

<style>
	.header-bg {
		background-color: #f9ffce;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='18' viewBox='0 0 100 18'%3E%3Cpath fill='%23ffeb77' fill-opacity='0.4' d='M61.82 18c3.47-1.45 6.86-3.78 11.3-7.34C78 6.76 80.34 5.1 83.87 3.42 88.56 1.16 93.75 0 100 0v6.16C98.76 6.05 97.43 6 96 6c-9.59 0-14.23 2.23-23.13 9.34-1.28 1.03-2.39 1.9-3.4 2.66h-7.65zm-23.64 0H22.52c-1-.76-2.1-1.63-3.4-2.66C11.57 9.3 7.08 6.78 0 6.16V0c6.25 0 11.44 1.16 16.14 3.42 3.53 1.7 5.87 3.35 10.73 7.24 4.45 3.56 7.84 5.9 11.31 7.34zM61.82 0h7.66a39.57 39.57 0 0 1-7.34 4.58C57.44 6.84 52.25 8 46 8S34.56 6.84 29.86 4.58A39.57 39.57 0 0 1 22.52 0h15.66C41.65 1.44 45.21 2 50 2c4.8 0 8.35-.56 11.82-2z'%3E%3C/path%3E%3C/svg%3E");
	}

	.main-bg {
		background-color: #ffffff;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%23beffc1' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");
	}
</style>
