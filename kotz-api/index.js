//BEGINNING OF QUERY-SELECTORS
const results = document.querySelector('#results');

const newResults = document.querySelector('#secondary-results');

const searchBox = document.querySelector('#search-box');

const listTitle = document.querySelector('#list-title');

const curiositiesList = document.querySelector('#list-title-curiosities');

const inputSearch = document.querySelector('#dynamic-input');

const char = document.querySelector('#btn')

const spin = document.querySelector('.spin')
//END OF QUERY-SELECTORS

//BEGINNING OF EVENTS
char.addEventListener('click', (e) =>{
	fetchingApi(e.target.textContent.trim().toLowerCase());
});
//END OF EVENTS

//BEGINNING OF FUNCTIONS
async function fetchingApi(value){

	try{
		let res = await fetch(`https://saint-seiya-api.herokuapp.com/api/${value}`);
		spin.classList.remove('spin');
		let data = await res.json();
		spin.classList.add('spin');

		displayingResults(data, value);
		filteringData(data);
	}

	catch(e){
		console.log(e);
	}


}

//Filtering data from API
function filteringData(data){
	//Beginning of input event
	inputSearch.addEventListener('input',(e)=>{
		let newInputSearch = e.target.value.trim().toLowerCase();

		//Beginning of keyup event to capture Enter button
		inputSearch.addEventListener('keyup', (event)=>{
			
			//Beginning of If
			if(event.key === 'Enter' && newInputSearch !== ''){
				
				let filteredData = data.filter(item =>{

					return item.name.trim().toLowerCase().indexOf(newInputSearch) > -1;
				})//End of filteredData
				
				renderFilteredData(filteredData);
			}//End of If
		})//End of keyup event
	})//End of input event
}//End of filtering data from API

//Rendering filtered data from API
function renderFilteredData(filteredData){
	let newOutput = '';
	//Beginning of cards creation with forEach
	filteredData.forEach(eachItem =>{

		newOutput +=
		// `<span class="sub-span">
		// 				${master.name}
		// 			 </span>
		// 			`
		`
		<div class="card p-3 m-3 text-white border-primary text-primary bg-dark" style="opacity: .8;">
		<h4 class="card-title text-center">
		${eachItem.name}
			</h4>

			<h5 class="card-title text-center">
				Mestre: ${eachItem.master.map(master => master.name)}
			</h5>
			
			<div class="card-content">
				<span>
					Actual Date
				</span>: ${eachItem.actualDate}
						<br>
				<span>
					Gender
				</span>: ${eachItem.gender}
						<br>
				<span>
					Height
				</span>: ${eachItem.height}
						<br>
				<span>
					Nationality
				</span>: ${eachItem.nationality}
						<br>
				<span>
					Training
				</span>: ${eachItem.training}
						<br>
				<span>
					Attacks
				</span>: ${eachItem.attacks.map(item => `${item}<br>`)}
				<br>
				<span>
					Family
				</span>: ${eachItem.family.map(fam =>{ 
					return `<br>${fam.member}`
					
					})}
					<br>
				<span>
					Armor
				</span>: ${eachItem.cloths.map(armor =>{
					return(`
							<br>
					<span class="sub-span">
						Armor
					</span>:	${armor.cloth}
							<br>
					<span class="sub-span">
						Group
					</span>:	${armor.group}
							<br>
					<span class="sub-span">
						Rank
					</span>:	${armor.rank}
							<br>
					`)
				})}
						<br>
			</div>
		</div>
		`
	})//End of cards creation with forEach
	let formattedOutput = newOutput.replace(/,/g, "\n");
	newResults.innerHTML = formattedOutput;
}

//Displaying results
function displayingResults(data, value){
	let output = '';

	//Beginning of characters if
	if(value === 'characters'){

		if(searchBox.classList.contains('search-char')){

			searchBox.classList.remove('search-char');
			searchBox.classList.add('search-char-input');
		}//End of inner if one

		if(listTitle.classList.contains('search-char-h1')){
					
			listTitle.classList.remove('search-char-h1');
			curiositiesList.classList.add('search-char-h1');
		}//End of inner if two

		//Beginning of data forEach
		data.forEach(eachItem =>{
			output += 
			`
				<div class="card p-3 m-3 text-white border-primary text-primary bg-dark" style="opacity: .8;">
					<h4 class="card-title text-center">
						${eachItem.name}
					</h4>

					<h5 class="card-title text-center">
						Master: ${eachItem.master.map(master =>{
							master.name;
						})}
					</h5>
					
					<div class="card-content">
						<span>
							Actual Date
						</span>: ${eachItem.actualDate}
								<br>
								<br>
						<span>
							Gender
						</span>: ${eachItem.gender}
								<br>
								<br>
						<span>
							Height
						</span>: ${eachItem.height}
								<br>
								<br>
						<span>
							Nationality
						</span>: ${eachItem.nationality}
								<br>
								<br>
						<span>
							Training
						</span>: ${eachItem.training}
								<br>
								<br>
						<span>
							Attacks
						</span>: ${eachItem.attacks.map(item => `<br>${item}`)}
								<br>
								<br>
						<span>
							Family
						</span>${eachItem.family.map(fam =>{ 
							return `<br>${fam.member}`
							
							})}
								<br>
								<br>
						<span>
							Armor
						</span>: ${eachItem.cloths.map(armor =>{
							return(`
									<br>
							<span class="sub-span">
								Armor
							</span>:	${armor.cloth}
									<br>
							<span class="sub-span">
								Group
							</span>:	${armor.group}
									<br>
							<span class="sub-span">
								Rank
							</span>:	${armor.rank}
									<br>
							`)
						})}
								<br>
					</div>
				</div>
			`
		})//End of data forEach
	}//End of characters if

	//Beginning of Else If curiosities
	else if(value === 'curiosities'){
		
		if (curiositiesList.classList.contains('search-char-h1')) {
			curiositiesList.classList.remove('search-char-h1');
			searchBox.classList.add('search-char');
			listTitle.classList.add('search-char-h1');
			newResults.classList.add('search-char')
		}//End of inner if

		data.forEach(eachItem =>{

			output +=
			`
				<div class="card p-3 m-3 text-white border-primary text-primary bg-dark" style="opacity: .8">
					<h4 class="card-title text-center">
						${eachItem.subTitle}
					</h4>
					<p class="card-title text-center">
						${eachItem.description}
					</p>
				</div>
			`
		})//End of data.forEach
	}//end of Else If Curiosities
	inputSearch.focus();
	let formattedOutput = output.replace(/,/g, "\n");
	results.innerHTML = formattedOutput;
}
//END OF FUNCTIONS