// Formulaire pour ajouter un utilisateur

import axios from 'axios';
import React from 'react';
import { Button, Table, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Liste from './liste.js';

class editUser extends React.Component {


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

	componentDidMount(){

		axios.get('http://localhost:4000/User/' + this.props.match.params.id)
			.then(response => {
				this.setState({
					location: response.data.location,
					personsInHouse: response.data.personsInHouse,
					houseSize: response.data.houseSize,

				})
			})
			.catch(err=>{
				console.log(err);
			})

		axios.get('http://localhost:4000/admin/')
		.then(response=>{
			if(response.data.length>0) {
				this.setState({
					users:response.data.map(user=>user.location),
				})
			}
	
		
		})
			.catch(err => {
				console.log(err);
			})
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

		axios.post('http://localhost:4000/User/update/'+this.props.match.params.id, user)
			.then(res => console.log(res.data));

		window.location = '/liste';

	}


	render(){



		return (
			
			<div  className="container">

				<h3>Edit user</h3>
				<div className="header-body">
					<Form onSubmit={this.onSubmit}>
				<FormGroup>
					<Label for="location">Pays : </Label>
					<Input type="text"  value={this.state.location} onChange={this.onChangeLocation}  />
				</FormGroup>

				<FormGroup>
					<Label for="personsInHouse">Nb de personnes dans la maison : </Label>
							<Input type="select" selected={this.state.personsInHouse} onChange={this.onChangeNbPersons} >
						<option>Choisir une option</option>

						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
						</Input>
				</FormGroup>

				<FormGroup>
						<Label for="houseSize">Taille de la maison : </Label>
							<Input type="text" value={this.state.houseSize} onChange={this.onChangeHouseSize} placeholder={this.state.houseSize} />
				</FormGroup>

				<FormGroup>
							<Input type="submit" value="Modifier un utilisateur"   className="btn btn-primary" />
						</FormGroup>

						

			</Form>
					
			
		
			</div>
			</div>
			);
	}


}




export default editUser;
