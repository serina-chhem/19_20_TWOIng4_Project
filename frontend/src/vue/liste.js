// Liste de tous les utilisateurs

// Formulaire pour ajouter un utilisateur

import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const User = props => (
	<tr>

		<td> {props.user.location}</td>
		<td> {props.user.personsInHouse}</td>
		<td> {props.user.houseSize}</td>
		<td> <Link to={"/edit/" + props.user._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>Delete</a> </td> 

	</tr>
)


class Liste extends React.Component {


	constructor(props) {

		super(props);

		this.deleteUser = this.deleteUser.bind(this);
		
		this.state = {
			users: []
		};
	}

	componentDidMount(){
		axios.get('http://localhost:4000/User')
			.then(response => {
				this.setState({ users: response.data })
			})
			.catch((error) => { console.log(error) }); 
	}

	deleteUser(id){
		axios.delete('http://localhost:4000/User/' + id)
			.then(res => console.log(res.data));
		this.setState({
			users: this.state.users.filter(el=> el._id !== id)
			})
	}


	userList(){
		return this.state.users.map(currentUser =>{
			return <User user={currentUser} deleteUser={this.deleteUser} key={currentUser._id} />;
		})
	}

	render() {
		return (
			<div className="container">
			<h3> Liste des utilisateurs</h3>
			<Table>
			<thead className="thead-light">
				<tr>
					<th> Pays </th>
					<th> Nombre d'habitants </th>
					<th> Taille  </th>
				</tr>

			</thead>

			<tbody > {this.userList()} </tbody>
			</Table>
			</div>
		);
	}


}




export default Liste;
