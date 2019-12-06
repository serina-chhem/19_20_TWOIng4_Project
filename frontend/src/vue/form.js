// Formulaire pour ajouter un utilisateur


import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class Formu extends React.Component {




	render(){
		return (

			<Form>
				<FormGroup>
					<Label for="nom">Nom</Label>
					<Input type="text" name="text" id="nom" placeholder=" " />
				</FormGroup>
				<FormGroup>
					<Label for="nom">Prénom</Label>
					<Input type="text" name="text" id="prenom" placeholder=" " />
				</FormGroup>
				<FormGroup>
					<Label for="num">Numéro de tel</Label>
					<Input type="number" id="num" placeholder=" " />
				</FormGroup>
				<FormGroup>
					<Label for="exampleSelect">Nombre de personnes</Label>
					<Input type="select" name="select" id="exampleSelect">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</Input>
				</FormGroup>
			</Form>
			);
	}


}




export default Formu;
