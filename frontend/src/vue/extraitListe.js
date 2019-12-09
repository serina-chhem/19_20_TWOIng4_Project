// Liste de tous les utilisateurs

import axios from 'axios';
import React from 'react';
import { Switch, BrowserRouter, Route, Link } from "react-router-dom";
import { Button, Nav, Table, Col, Form, FormGroup, Label, Input, FormText, Row, Card } from 'reactstrap';


const User = props => (
	<tr>

		<td> {props.user.location}</td>
		<td> {props.user.personsInHouse}</td>
		<td> {props.user.houseSize}</td>
	</tr>
)


class extraitListe extends React.Component {


	constructor(props) {

		super(props);		
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


	userList()
	{
		return this.state.users.map(currentUser =>
		{
			return <User user={currentUser} key={currentUser._id}/>;
		})
	}

	render() {
		return (
			<Row>
				<Col md="12">
					<Card className="main-card mb-3">
						<div className="card-header">Extrait de la liste utilisateurs
					     </div>
						<div className="table-responsive">
							<table className="align-middle mb-0 table table-borderless table-striped table-hover">
								<thead>
									<tr>

										<th>Pays</th>
										<th className="text-center"> Nombre d'habitants</th>
										<th className="text-center">Taille</th>
									</tr>
								</thead>
								<tbody>
									{this.userList()[0]}
									{this.userList()[1]}
									{this.userList()[2]}

								</tbody>
							</table>
						</div>

					</Card>
				</Col>
			</Row>
		);
	}


}




export default extraitListe;
