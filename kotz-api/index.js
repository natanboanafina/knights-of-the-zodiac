//BEGINNING OF QUERY-SELECTORS
const results = document.querySelector('#results');

const newResults = document.querySelector('#secondary-results');

const searchBox = document.querySelector('#search-box');

const listTitle = document.querySelector('#list-title');

const curiositiesList = document.querySelector('#list-title-curiosities');

const inputSearch = document.querySelector('#dynamic-input');

const char = document.querySelector('#btn')
//END OF QUERY-SELECTORS

//BEGINNING OF EVENTS
char.addEventListener('click', (e) =>{
	fetchingApi(e.target.textContent.trim().toLowerCase());
});
//END OF EVENTS

//BEGINNING OF FUNCTIONS
async function fetchingApi(value){
	let res = await fetch(`https://saint-seiya-api.herokuapp.com/api/${value}`);

	let data = await res.json();

	displayingResults(data, value);
	filteringData(data);
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
	//Beginning of cards creation withd forEach
	filteredData.forEach(eachItem=>{
		newOutput +=
		`
		<div class="card p-3 m-3 text-white border-primary text-primary bg-dark" style="opacity: .8;">
		<h4 class="card-title text-center">
		${eachItem.name}
			</h4>

			<h5 class="card-title text-center">
				Mestre: ${eachItem.master.map(master =>{
					`<span class="sub-span">
						${master.name}
					 </span>
					`
				})}
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
				</span>: ${eachItem.attacks}
						<br>
				<span>
					Family
				</span>: ${eachItem.family.map(fam =>{
					`${fam.member}`
				})}
						<br>
				<span>
					Armor
				</span>: ${eachItem.cloths.map(armor =>{
					`
					<span class="sub-span">
						Name
					</span>:	${armor.name}
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
					`
				})}
						<br>
			</div>
		</div>
		`
	})//End of cards creation with forEach
	newResults.innerHTML = newOutput;
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
						</span>: ${eachItem.attacks}
								<br>
						
						<span>
							Family
						</span>: ${eachItem.family.map(fam => {
							`
								<span class="sub-span">
									Name
								</span>: ${fam.member} 
										<br>
							`
						})}
								<br>
						<span>
							Armor
						</span>: ${eachItem.cloths.map(cl=>{
									`<br>
								<span class="sub-span">Nome: ${cl.name}</span><br>
								<span class="sub-span">Armadura: ${cl.cloth}</span><br>
								<span class="sub-span">Grupo: ${cl.group}</span><br>
								<span class="sub-span">Nível: ${cl.rank}</span><br>
									`
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
	results.innerHTML = output;
}
//END OF FUNCTIONS