<script>
	import { onMount } from 'svelte';
	import { TrendingUp } from 'lucide-svelte';

	// Example for the marks database
	let exampleMarks = [
		{
			id: 'T401',
			name: 'H1 Bewegingen beschrijven',
			subject: {
				id: 'nat',
				name: 'natuurkunde'
			},
			retakable: true,
			weight: 1,
			type: 'exam',
			conduct: {
				planned: true,
				date: '2023-10-18',
				semester: 1,
				inExamWeek: true,
				duration: 90
			},
			result: {
				grades: [
					{
						grade: '8.9',
						pass: true,
						date: '2023-10-18',
						new: false,
						feedback: ''
					}
				]
			}
		},
		{
			id: 'T402',
			name: 'Leesvaardigheid',
			subject: {
				id: 'entl',
				name: 'Engels'
			},
			retakable: false,
			weight: 1,
			type: 'exam',
			conduct: {
				planned: true,
				date: '2023-10-19',
				semester: 1,
				inExamWeek: true,
				duration: 45
			},
			result: {
				grades: [
					{
						grade: '7.9',
						pass: true,
						date: '2023-10-28',
						new: true,
						feedback: ''
					}
				]
			}
		},
		{
			id: 'T401',
			name: 'Levensloop deel 1',
			subject: {
				id: 'econ',
				name: 'Economie'
			},
			retakable: false,
			weight: 1,
			type: 'exam',
			conduct: {
				planned: true,
				date: '2023-9-7',
				semester: 1,
				inExamWeek: false,
				duration: 45
			},
			result: {
				grades: [
					{
						grade: '5.0',
						pass: false,
						date: '2023-9-12',
						new: false,
						feedback: ''
					}
				]
			}
		},
		{
			id: 'T402',
			name: 'Levensloop deel 2',
			subject: {
				id: 'econ',
				name: 'Economie'
			},
			retakable: false,
			weight: 2,
			type: 'exam',
			conduct: {
				planned: true,
				date: '2023-10-16',
				semester: 1,
				inExamWeek: true,
				duration: 90
			},
			result: {
				grades: [
					{
						grade: '7.0',
						pass: true,
						date: '2023-10-20',
						new: true,
						feedback: ''
					}
				]
			}
		},
		{
			id: 'T403',
			name: 'Levensloop afsluiting',
			subject: {
				id: 'econ',
				name: 'Economie'
			},
			retakable: true,
			weight: 2,
			type: 'exam',
			conduct: {
				planned: true,
				date: '2023-11-16',
				semester: 1,
				inExamWeek: true,
				duration: 90
			},
			result: {
				grades: [
					{
						grade: '7.0',
						pass: true,
						date: '2023-11-20',
						new: true,
						feedback: ''
					},
					{
						grade: ''
					}
				]
			}
		}
	];

	let marks = [];
	let marksToBeGraded = [];
	let marksGroupedBySubject = [];
	let marksGroupedByExamWeek = [];

	let modalMark = {};

	// Function to fetch data from marks.json
	const fetchMarks = async () => {
		marks = exampleMarks;

		marksToBeGraded = marks.filter(
			(mark) => !mark.result.grades[mark.result.grades.length - 1]?.grade
		);

		marksGroupedBySubject = await marks.reduce((acc, obj) => {
			const subject = obj.subject.name;

			if (!acc[subject]) {
				acc[subject] = [];
			}

			acc[subject].push(obj);

			return acc;
		}, {});

		marksGroupedByExamWeek = await marks.reduce((acc, obj) => {
			const semester = obj.conduct.semester;
			const inExamWeek = obj.conduct.inExamWeek;

			if (inExamWeek) {
				if (!acc[semester]) {
					acc[semester] = [];
				}

				acc[semester].push(obj);
			}
			return acc;
		}, {});
	};

	// Fetch marks when the component is mounted
	onMount(() => {
		fetchMarks();
	});

	// Define the function to log the mark object
	function openMarkModal(mark) {
		modalMark = mark;
		mark_modal.showModal();
		console.log(modalMark);
	}
</script>

<head>
	<title>Cijfers</title>
</head>

<div class="scroll-smooth stats stats-horizontal max-w-full shadow snap-x">
	<div class="stat snap-center">
		<div class="stat-title">Toetsen gemaakt</div>
		<div class="stat-value">23</div>
		<div class="stat-desc">2022 - 2023 (34%)</div>
	</div>

	<div class="stat snap-center">
		<div class="stat-title">Gemiddelde</div>
		<div class="stat-value">8,24</div>
		<div class="stat-desc text-success">
			<TrendingUp class="text-success w-3 h-3 inline" /> 0,46 (5,5%)
		</div>
	</div>

	<div class="stat snap-center">
		<div class="stat-title">Voldoendes</div>
		<div class="stat-value">91,3%</div>
		<div class="stat-desc">
			<span class="text-success">21</span> / <span class="text-error">2</span>
		</div>
	</div>
</div>

<div role="tablist" class="tabs tabs-lifted pt-5">
	<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Recent" checked />
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		<h3 class="text-xl font-bold">Recent nagekeken</h3>
		<div class="overflow-x-auto mb-3">
			<table class="table">
				<thead>
					<tr>
						<th>Naam</th>
						<th>Vak</th>
						<th>Cijfer</th>
						<th>Weging</th>
					</tr>
				</thead>
				<tbody>
					{#each marks
						.sort((a, b) => new Date(b.result.grades[0].date) - new Date(a.result.grades[0].date))
						.filter((mark) => mark.result.grades[mark.result.grades.length - 1]?.grade) as mark}
						<tr class="hover" on:click={() => openMarkModal(mark)}>
							<td
								><b>{mark.id}</b> - {mark.name}
								{#if mark.result.grades[mark.result.grades.length - 1].new}
									<div class="badge badge-primary ml-2">nieuw</div>
								{/if}</td
							>
							<td class="capitalize">{mark.subject.name}</td>
							<td
								class="text-{mark.result.grades[mark.result.grades.length - 1].pass
									? 'success'
									: 'error'}">{mark.result.grades[mark.result.grades.length - 1].grade}</td
							>
							<td>{mark.weight}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<h3 class="text-xl font-bold">Nog niet nagekeken</h3>
		<div class="overflow-x-auto mb-3">
			<table class="table">
				<thead>
					<tr>
						<th>Naam</th>
						<th>Vak</th>
						<th>Datum</th>
						<th>Weging</th>
					</tr>
				</thead>
				<tbody>
					{#each marksToBeGraded as mark}
						<tr class="hover" on:click={() => openMarkModal(mark)}>
							<td
								><b>{mark.id}</b> - {mark.name}
								{#if mark.result.grades[mark.result.grades.length - 1].new}
									<div class="badge badge-primary ml-2">nieuw</div>
								{/if}</td
							>
							<td class="capitalize">{mark.subject.name}</td>
							<td class="">{mark.conduct.date}</td>
							<td>{mark.weight}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Vakken" />
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		{#each Object.keys(marksGroupedBySubject) as subject}
			<h3 class="text-xl font-bold capitalize">{subject}</h3>
			<div class="overflow-x-auto mb-3">
				<table class="table">
					<thead>
						<tr>
							<th>Naam</th>
							<th>Datum</th>
							<th>Cijfer</th>
							<th>Weging</th>
						</tr>
					</thead>
					<tbody>
						{#each marksGroupedBySubject[subject] as mark}
							<tr class="hover" on:click={() => openMarkModal(mark)}>
								<td
									><b>{mark.id}</b> - {mark.name}
									{#if mark.result.grades[mark.result.grades.length - 1].new}
										<div class="badge badge-primary ml-2">nieuw</div>
									{/if}</td
								>
								<td class="capitalize">{mark.conduct.date}</td>
								<td
									class="text-{mark.result.grades[mark.result.grades.length - 1].pass
										? 'success'
										: 'error'}">{mark.result.grades[mark.result.grades.length - 1].grade}</td
								>
								<td>{mark.weight}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/each}
	</div>

	<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Toetsweken" />
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		{#each Object.keys(marksGroupedByExamWeek) as examWeek}
			<h3 class="text-xl font-bold capitalize">Toetsweek {examWeek}</h3>
			<div class="overflow-x-auto mb-3">
				<table class="table">
					<thead>
						<tr>
							<th>Naam</th>
							<th>Vak</th>
							<th>Cijfer</th>
							<th>Weging</th>
						</tr>
					</thead>
					<tbody>
						{#each marksGroupedByExamWeek[examWeek] as mark}
							<tr class="hover" on:click={() => openMarkModal(mark)}>
								<td
									><b>{mark.id}</b> - {mark.name}
									{#if mark.result.grades[mark.result.grades.length - 1].new}
										<div class="badge badge-primary ml-2">nieuw</div>
									{/if}</td
								>
								<td class="capitalize">{mark.subject.name}</td>
								<td
									class="text-{mark.result.grades[mark.result.grades.length - 1].pass
										? 'success'
										: 'error'}">{mark.result.grades[mark.result.grades.length - 1].grade}</td
								>
								<td>{mark.weight}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/each}
	</div>

	<input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Aankomend" />
	<!-- TODO: fix this shit so it is really aankomend. -->
	<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
		<h3 class="text-xl font-bold capitalize">Deze week</h3>
		<p class="mb-3">Alle toetsen van deze week die nog niet gemaakt zijn komen hier te staan</p>
		<h3 class="text-xl font-bold capitalize">Deze periode</h3>
		<p class="mb-3">
			Alle toetsen van deze periode die nog niet zijn gemaakt en niet deze week zijn komen hier te
			staan
		</p>
	</div>
</div>

<dialog id="mark_modal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<h3 class="font-bold text-lg"><b>{modalMark.id}</b> - {modalMark.name}</h3>
		<p class="py-4">WOW</p>
		<div class="modal-action"><button class="btn">huh</button></div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
