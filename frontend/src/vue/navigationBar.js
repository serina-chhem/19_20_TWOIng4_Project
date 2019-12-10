import React from 'react';
import Fragment from 'render-fragment';

import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { Bar, BarChart, XAxis, YAxis, LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class NavigationBar extends React.Component {


	constructor(props) {
		super(props);

	}

	render(){
		return (

			<Navbar color="light" light expand="md">
				<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous" /> 

				<NavbarBrand >
					
						
					<Link to="/" class="nav-link">  <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
						<i className="fa fa-home" />
					</div>

					Dashboard
					</Link>
					</NavbarBrand>
				<Nav className="ml-auto">

					<NavItem >

						<Link to="/admin" class="nav-link"> Nouvel utilisateur </Link>

					</NavItem>


					<NavItem >	<Link to="/liste" className="nav-link"> Liste des utilisateurs </Link> </NavItem>
	


				</Nav>

			</Navbar>

				
			);
	}
}


export default NavigationBar;


