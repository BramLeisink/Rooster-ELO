<script>
	const date = new Date();

	const today = {
		dayNumber: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear()
	}
    const monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
	let monthIndex = date.getMonth();
	$: month =  monthNames[monthIndex];
	let year = date.getFullYear();

	$: firstDayIndex = new Date(year, monthIndex, 1).getDay();
	$: numberOfDays = new Date(year, monthIndex+1, 0).getDate();
	let currentDay = date.getDate();
    $: cellQty = firstDayIndex <= 4 ? 35 : 42; 

	const goToPrevMonth = () => {
		if(monthIndex <= 0){
			year -= 1;
			return monthIndex = 11;
		}
      monthIndex -= 1;
	}

	const goToNextMonth = () => {
		if(monthIndex >= 11){
			year += 1;
			return monthIndex = 0;
		}
		monthIndex += 1;
	}

	$: console.log(monthIndex)
</script>
<main>
<div class="month">
	<ul>
	  <li class="prev" on:click={goToPrevMonth}>&#10094;</li>
	  <li class="next" on:click={goToNextMonth}>&#10095;</li>
	  <li>{month}<br>
		<span style="font-size:18px">{year}</span></li>
	</ul>
  </div>
  
  <ul class="weekdays">
	<li>Su</li>
	<li>Mo</li>
	<li>Tu</li>
	<li>We</li>
	<li>Th</li>
	<li>Fr</li>
	<li>Sa</li>
	
  </ul>
  
  <ul class="days">
	{#each Array(cellQty) as _, i}
		 <!-- content here -->
	{#if i < firstDayIndex || i >= numberOfDays+firstDayIndex}
	<li>&nbsp;</li>

	{:else}
	<li class:active={i === today.dayNumber && monthIndex === today.month && year === today.year}>{(i-firstDayIndex)+1}</li>
	{/if}
	
	{/each}
  </ul>

</main>

  <style>ul {list-style-type: none;}
	main {font-family: Verdana, sans-serif;}
	
	/* Month header */
	.month {
	  padding: 70px 25px;
	  width: auto;
	  background: #1abc9c;
	  text-align: center;
	}
	
	/* Month list */
	.month ul {
	  margin: 0;
	  padding: 0;
	}
	
	.month ul li {
	  color: white;
	  font-size: 20px;
	  text-transform: uppercase;
	  letter-spacing: 3px;
	}
	
	/* Previous button inside month header */
	.month .prev {
	  float: left;
	  padding-top: 10px;
	  cursor: pointer;
	}
	
	/* Next button */
	.month .next {
	  float: right;
	  padding-top: 10px;
	  cursor: pointer;
	}
	
	/* Weekdays (Mon-Sun) */
	.weekdays {
	  margin: 0;
	  padding: 10px 0;
	  background-color:#ddd;
	}
	
	.weekdays li {
	  display: inline-block;
	  width: 13.6%;
	  color: #666;
	  text-align: center;
	}
	
	/* Days (1-31) */
	.days {
	  padding: 10px 0;
	  background: #eee;
	  margin: 0;
	}
	
	.days li {
	  list-style-type: none;
	  display: inline-block;
	  width: 13.6%;
	  text-align: center;
	  margin-bottom: 5px;
	  font-size:12px;
	  color: #777;
	}
	
	/* Highlight the "current" day */
	.active {
	  padding: 5px;
	  background: #1abc9c;
	  color: white !important
	}
	</style>