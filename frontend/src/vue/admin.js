// Formulaire pour ajouter un utilisateur

import axios from 'axios';
import React from 'react';
import { Button, Table, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Liste from './liste.js';

class Formu extends React.Component {


	constructor(props){

		super(props);

		this.onChangeLocation = this.onChangeLocation.bind(this);
		this.onChangeNbPersons = this.onChangeNbPersons.bind(this);
		this.onChangeHouseSize = this.onChangeHouseSize.bind(this);
		this.onSubmit = this.onSubmit.bind(this);


		this.state = {
			location: '',
			personsInHouse:'',
			houseSize:'',
			users:[],
		}
	}

	onChangeLocation(e){
		this.setState({
			location: e.target.value
		});
	}

	onChangeNbPersons(e) {
		this.setState({
			personsInHouse: e.target.value
		});
	}
	onChangeHouseSize(e) {
		this.setState({
			houseSize: e.target.value
		});
	}

	onSubmit(e){
		e.preventDefault();
		const user = {
			location: this.state.location,
			personsInHouse: this.state.personsInHouse,
			houseSize: this.state.houseSize,


		};

		console.log(user);


		axios.post('http://localhost:4000/admin', user)
			.then(res => console.log(res.data));

		this.state = {
			location: '',
			personsInHouse: '',
			houseSize: '',
		}

		window.location = '/liste';


	}





	render(){



		return (
			
			<div  className="container">


				<div className="header-body">
					<Form onSubmit={this.onSubmit}>
				<FormGroup>
					<Label for="location">Pays : </Label>
					<Input type="text"  value={this.state.location} onChange={this.onChangeLocation} placeholder=" " />
				</FormGroup>

				<FormGroup>
					<Label for="personsInHouse">Nb de personnes dans la maison : </Label>
							<Input type="select" value={this.state.personsInHouse} onChange={this.onChangeNbPersons} >
						<option>Choisir</option>
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						</Input>
				</FormGroup>

				<FormGroup>
						<Label for="houseSize">Taille de la maison : </Label>
							<Input type="text" value={this.state.houseSize} onChange={this.onChangeHouseSize} placeholder=" " />
				</FormGroup>

				<FormGroup>
							<Input type="submit" value="Ajouter un utilisateur "  className="btn btn-primary" />
						</FormGroup>

						

			</Form>
					
			
		
			</div>
			</div>
			);
	}


}




export default Formu;
