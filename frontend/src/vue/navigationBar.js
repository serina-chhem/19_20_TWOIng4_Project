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
				<NavbarBrand > 					
					<Link to="/" class="nav-link">  
					Dashboard
					</Link>
					</NavbarBrand>
				<Nav className="ml-auto">

					<NavItem >

						<Link to="/admin" class="nav-link"> Formulaire </Link>

					</NavItem>


					<NavItem >	<Link to="/liste" className="nav-link"> Voir la liste entière </Link> </NavItem>
	


				</Nav>

			</Navbar>

				
			);
	}
}


export default NavigationBar;


