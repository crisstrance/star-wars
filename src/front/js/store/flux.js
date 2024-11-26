const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			host: 'https://playground.4geeks.com/contact/agendas/cristian/contacts',
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			owner: 'Cristian Aravena',
			cohorte: 'Spain-77',
			number: 8,
			isLoged: false,
			alert: {
				text: 'A simple primary alert—check it out!',
				background: 'primary',
				visible: false
			},
			host_swapi: 'https://www.swapi.tech/api',
			characters: [],
			planets: [],
			starships: [],
			characterDetails: {},
			planetDetails: {},
			starshipDetails: {},
			favorites: [],
			contacts: [],
			newContact: {}

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			setIsLoged: (newState) => { setStore({ isLoged: newState }) },

			addFavorite: (newFavorite) => {
				const duplicate = getStore().favorites.some((favorite) => favorite.name === newFavorite.name)
				if (duplicate) return
				setStore({ favorites: [...getStore().favorites, newFavorite] })
				localStorage.setItem("favorites", JSON.stringify(favorites))

			},
			removeFavorite: (item) => {
				setStore({ favorites: getStore().favorites.filter(fav => fav !== item) })
			},

			login: async (dataToSend) => {
				const uri = `https://cautious-pancake-9jg465767pj374rp-3001.app.github.dev/api/login`;
				console.log(`https://cautious-pancake-9jg465767pj374rp-3001.app.github.dev/api/login`);
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dataToSend)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					// Tratamos el error
					// nuestro back devuelve el 401
					console.log('Error', response.status, response.statusText);
					return
				}
				const data = await response.json()

				console.log(data)
			},

			accessProtected: async () => {
				const token = localStorage.getItem('token')
				const uri = `https://cautious-pancake-9jg465767pj374rp-3001.app.github.dev/api/protected`;
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					// Tratamos el error
					// nuestro back devuelve el 401
					console.log('Error', response.status, response.statusText);
					return
				}no
				const data = await response.json()
			},

			logout: () => {

			},

			isLogged: () => {
				const token = localStorage.getItem('token')
				if (token) {
					// recuperamos usuario
					const userData = (localStorage.getItem('user'))
					setStore({ isLoged: true, user: userData.email })
				}
			},

			getCharacter: async () => {
				// ALERT PARA SABER SI ESTA TODO CARGADO
				// if (localStorage.getItem('characters')) {
				// 	alert ('Ya existen los characters')
				// 	setStore({ characters: JSON.parse(localStorage.getItem('characters'))})
				// 	return
				// }
				const response = await fetch(`${getStore().host_swapi}/people`)
				if (!response.ok) {
					setStore({
						alert: {
							text: 'Error loading data in API',
							background: 'danger',
							visible: true
						}
					})
					return
				}
				const data = await response.json();
				console.log(data)
				setStore({ characters: data.results })
				localStorage.setItem('characters', JSON.stringify(data.results))
			},
			getPlanets: async () => {
				// ALERT PARA SABER SI ESTA TODO CARGADO
				// if (localStorage.getItem('planets')) {
				// 	alert ('Ya existen los planets')
				// 	setStore({ planets: JSON.parse(localStorage.getItem('planets'))})
				// 	return
				// }
				const response = await fetch(`${getStore().host_swapi}/planets`)
				if (!response.ok) {
					setStore({
						alert: {
							text: 'Error loading data in API',
							background: 'danger',
							visible: true
						}
					})
					return
				}
				const data = await response.json();
				console.log(data)
				setStore({ planets: data.results })
				localStorage.setItem('planets', JSON.stringify(data.results))
			},
			getStarships: async () => {
				// ALERT PARA SABER SI ESTA TODO CARGADO
				// if (localStorage.getItem('starships')) {
				// 	alert ('Ya existen los starships')
				// 	setStore({ starships: JSON.parse(localStorage.getItem('planets'))})
				// 	return
				// }
				const response = await fetch(`${getStore().host_swapi}/starships`)
				if (!response.ok) {
					setStore({
						alert: {
							text: 'Error loading data in API',
							background: 'danger',
							visible: true
						}
					})
					return
				}
				const data = await response.json();
				console.log(data)
				setStore({ starships: data.results })
				localStorage.setItem('starships', JSON.stringify(data.results))
			},

			getCharacterDetails: async (id) => {
				console.log('en flux:', id)
				const response = await fetch(`${getStore().host_swapi}/people/${id}`)
				if (!response.ok) { return }
				const data = await response.json()
				console.log(data.result.properties)
				setStore({ characterDetails: data.result.properties })
			},
			getPlanetDetails: async (id) => {
				console.log('en flux:', id)
				const response = await fetch(`${getStore().host_swapi}/planets/${id}`)
				if (!response.ok) { return }
				const data = await response.json()
				console.log(data.result.properties)
				setStore({ planetDetails: data.result.properties })
			},
			getStarshipDetails: async (id) => {
				console.log('en flux:', id)
				const response = await fetch(`${getStore().host_swapi}/starships/${id}`)
				if (!response.ok) { return }
				const data = await response.json()
				console.log(data.result.properties)
				setStore({ starshipDetails: data.result.properties })
			},

			createAgenda: async (dataToSend) => {
				const uri = 'https://playground.4geeks.com/contact/agendas/cristian';
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return;
				};
				getActions().getContacts();
			},

			getContacts: async () => {
				const uri = `${getStore().host}`;
				const response = await fetch(uri);

				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);

					if (response.status === 404) {
						console.log('Agenda no encontrada. Creando una nueva...');
						await getActions().createAgenda();
					}

					return;
				}

				const data = await response.json();
				setStore({ contacts: data.contacts });
			},
			addContact: async (dataToSend) => {
				const uri = `${getStore().host}`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return;
				};
				getActions().getContacts();
			},
			editContact: async (item, dataToSend) => {
				const uri = `${getStore().host}/${item.id}`;
				const options = {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return;
				}
				getActions().getContacts();
			},
			deleteContact: async (item) => {
				const uri = `${getStore().host}/${item.id}`;
				const options = {
					method: 'DELETE',
					headers: {
						"Content-Type": "application/json"
					}
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return;
				}
				getActions().getContacts();
			}


		}
	};
};

export default getState;
