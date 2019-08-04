import React, { Component } from 'react';
import Weather from './Weather';
import ActionModal from './ActionModal';
import axios from 'axios';

class App extends Component {
	state = {
		location: 'Tagbilaran City',
		city: undefined,
		country: undefined,
		description: undefined,
		temp: undefined,
		icon: undefined,
		humidity: undefined,
		cloudiness: undefined,
		wind: undefined,
		pressure: undefined,
		show: false,
		error: '',
		bgColor: ''
	};

	componentDidMount() {
		this.getWeather(this.state.location);
	}

	componentDidUpdate(prevProps, prevState) {
		const { bgColor } = this.state;

		if (prevProps.bgColor !== prevState.bgColor) {
			const bodyElt = document.querySelector('body');
			bodyElt.style.background = `url(${bgColor}) no-repeat center center fixed`;
		}
	}

	handleShow = () => {
		this.setState({
			show: true
		});
	};

	onHide = () => {
		this.setState({
			show: false
		});
	};

	handleChange = (e) => {
		this.setState({
			location: e.target.value
		});
	};

	handleChangeLocation = (e) => {
		e.preventDefault();
		const location = this.state.location;
		this.getWeather(location);
	};

	getWeather = (location) => {
		if (location === '') {
			this.setState({ error: 'Fields must not be empty' });
		} else {
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${location}
          &appid=2297341e552a6cf9736f3ab3d19248c3&units=metric`
				)
				.then((res) => {
					console.log(res.data);
					this.setState({
						city: res.data.name,
						country: res.data.sys.country,
						description: res.data.weather[0].main,
						temp: res.data.main.temp,
						icon: res.data.weather[0].icon,
						humidity: res.data.main.humidity,
						wind: res.data.wind.speed,
						cloudiness: res.data.weather[0].description,
						pressure: res.data.main.pressure,
						show: false,
						error: ''
					});
					this.setbackgroundImage();
				})
				.catch((err) => {
					if (err.response.status === 404) {
						this.setState({ error: 'City not Found' });
					}
				});
		}
	};

	setbackgroundImage = () => {
		let bgColor;
		const conditions = this.state.description;
		switch (conditions) {
			case 'Clear':
				bgColor = './images/clear.jpeg';
				break;

			case 'Clouds':
				bgColor = './images/cloudy.jpeg';
				break;

			case 'Rain':
			case 'Drizzle':
			case 'Mist':
			case 'Smoke':
			case 'Haze':
			case 'Dust':
			case 'Fog':
			case 'Sand':
			case 'Ash':
			case 'Squall':
			case 'Tornado':
				bgColor = './images/rain.jpeg';
				break;

			case 'Thunderstorm':
				bgColor = './images/storm.jpeg';
				break;

			case 'Snow':
				bgColor = './images/snow.jpeg';
				break;

			default:
				bgColor = './images/water-blue-ocean.jpg';
		}

		this.setState({
			bgColor
		});
	};

	render() {
		return (
			<div>
				<Weather
					city={this.state.city}
					country={this.state.country}
					description={this.state.description}
					temp={this.state.temp}
					icon={this.state.icon}
					humidity={this.state.humidity}
					wind={this.state.wind}
					cloudiness={this.state.cloudiness}
					pressure={this.state.pressure}
					handleShow={this.handleShow}
				/>
				<ActionModal
					show={this.state.show}
					onHide={this.onHide}
					value={this.state.location}
					handleChange={this.handleChange}
					handleChangeLocation={this.handleChangeLocation}
					error={this.state.error}
				/>
			</div>
		);
	}
}

export default App;
