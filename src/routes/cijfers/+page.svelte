<script>
	import { onMount } from 'svelte';

	let marks = [];
	let marksGroupedBySubject = [];
	let marksGroupedByExamWeek = [];

	// Function to fetch data from marks.json
	const fetchMarks = async () => {
		const response = await fetch('src/routes/cijfers/marks.json');
		marks = await response.json();

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
</script>

<div class="stats stats-vertical sm:stats-horizontal shadow">
	<div class="stat">
		<div class="stat-title">Toetsen gemaakt</div>
		<div class="stat-value">23</div>
		<div class="stat-desc">2022 - 2023 (34%)</div>
	</div>

	<div class="stat">
		<div class="stat-title">Gemiddelde</div>
		<div class="stat-value">8,24</div>
		<div class="stat-desc text-success">↗︎ 0,46 (5,5%)</div>
	</div>

	<div class="stat">
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
		<h3 class="text-xl font-bold">Recent toegevoegd</h3>
		<div class="overflow-x-auto">
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
					{#each marks.sort((a, b) => new Date(b.result.grades[0].date) - new Date(a.result.grades[0].date)) as mark}
						<tr class="hover">
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
							<tr class="hover">
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
							<tr class="hover">
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
</div>