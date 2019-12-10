import React from 'react';
import Fragment from 'render-fragment';
import axios from 'axios';
import { Switch, BrowserRouter, Route, Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem , Table, TabPane, Row, Card, TabContent} from 'reactstrap';
import { Col, CardHeader, CardBody, CardTitle } from 'reactstrap';
import {
	Bar, BarChart, PieChart, Pie, Legend, Cell, Tooltip, Sector,
	Label, LabelList, XAxis, YAxis, LineChart, Line, CartesianGrid, ResponsiveContainer
} from 'recharts';
import extraitListe from './extraitListe.js';
import {
	faAngleUp,
	faArrowRight,
	faArrowUp,
	faArrowLeft,
	faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { defaults } from 'react-chartjs-2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const data = [
	{ name: 'humidity', value: 356 },
	{ name: 'airPollution', value: 334 },
	{ name: 'temperature', value: 310 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const {
		cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
		fill, payload, percent, value,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
				{`(Quantité ${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};


class Homepage extends React.Component{


	constructor(props) {
		super(props);
		 
		this.toggle = this.toggle.bind(this);

		this.state = {
			firstCountryName: '',
			count1:'',
			secondCountryName: '',
			count2: '',
			thirdCountryName: '',
			count3: '',
			fourthCountryName:'',
			count4: '',
			nbDocs:'',
			nbSensor:'',
			maxPol:'',
			activeIndex: 0,
			countryData:[],
			minPol: '',
			maxTemp:'',
			isOpen: false,
			
		};


		this.avgData = [
			{
				type: 'temperature',
				value: 20.441935483870967
			},
			{
				type: "airPollution",
				value: 50.24550898203593
			},
			{
				type: "humidity",
				value: 51.46348314606742
			}
		];

		this.sensorLoc = [
			{
				location: 'bedroom',
				nb: 31
			},
			{
				location: 'entrance',
				nb: 26
			},
			{
				location: 'bathroom',
				nb: 25
			},
			{
				location: 'livingroom',
				nb: 18
			}
		];

		this.renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
			return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}> </text>;
		};



		this.onPieEnter = (data, index) => {
			this.setState({
				activeIndex: index,
			});
		};


	}

	componentDidMount() {

		axios.get('http://localhost:4000/admin/nbDocs')
			.then(response => {
				this.setState({
					nbDocs: response.data,
				})
			})
			.catch(err => {
				console.log(err);
			})	


		axios.get('http://localhost:4000/admin/nbCountry')
			.then(response => {

				this.setState({
					firstCountryName: response.data[0]._id,
					count1: response.data[0].count,
					secondCountryName: response.data[1]._id,
					count2: response.data[1].count,
					thirdCountryName: response.data[2]._id,
					count3: response.data[2].count,
					fourthCountryName: response.data[3]._id,
					count4: response.data[3].count,
				})
			})
			.catch(err => {
				console.log(err);
			})


		axios.get('http://localhost:4000/admin/getMinPollution')
		.then(response=>{
			this.setState({
				minPol: response.data[0].value
			})
		})

		axios.get('http://localhost:4000/admin/getMaxPollution')
			.then(response => {
				this.setState({
					maxPol: response.data[0].value
				})
			})


		axios.get('http://localhost:4000/admin/nbSensors')
			.then(response => {
				this.setState({
					nbSensor: response.data,
				})
			})
			.catch(err => {
				console.log(err);
			})


		axios.get('http://localhost:4000/admin/measureData')
			.then(response => {
				this.setState({	
					measures: response.data,
				})
			})
			.catch(err => {
				console.log(err);
			})


		axios.get('http://localhost:4000/admin/getMaxTemp')
			.then(response => {
				this.setState({
					maxTemp: response.data[0].maxTemp,
				})
			})
			.catch(err => {
				console.log(err);
			})

	
		
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}



	render(){
		return (
	<Fragment>

	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous" /> 

	<div id="fragment" class="container">

					<Row>
						<Col md="12" lg="6">
							<Card className="mb-3">
								<CardHeader className="card-header-tab">
									<div tag="h5"
										className="text-uppercase text-muted mb-0 card-header-title" >
										<i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
										Types de capteurs et quantités 
                                        </div>

								</CardHeader>
								<TabContent >
									<TabPane>


										<div className="widget-chart p-0">

											<ResponsiveContainer height={270}>
												<PieChart width={300} height={300}>
													<Pie
														activeIndex={this.state.activeIndex}
														activeShape={renderActiveShape}
														data={data}
														cx={this.cx}
														cy={this.cy}
														innerRadius={50}
														outerRadius={60}
														fill="#FFBB28"
														dataKey="value"
														onMouseEnter={this.onPieEnter}
													>
													{
														data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
													}
													</Pie>
												</PieChart>
											</ResponsiveContainer>
										</div>

									</TabPane>

								</TabContent>
							</Card>

									<div className="card mb-3 bg-midnight-bloom widget-chart text-white card-border">
										
										<CardHeader>
											<div tag="h5"
												className="text-uppercase text-muted mb-0 card-header-title" >
												Fréquence de localisation des capteurs 
										</div>
										</CardHeader>
								

										<ResponsiveContainer width = '100%' height={220}>
										<BarChart
											width={500}
											height={300}
											data={this.sensorLoc}
											margin={{
												top: 5, right: 30, left: 20, bottom: 5,
											}}>
										
											<XAxis dataKey="location" />
											<YAxis />
											<Tooltip />
											
											<Bar dataKey="nb" fill="#8884d8">
											{
												data.map((entry, index) => (
													<Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
												))
											}
											</Bar>
										
										</BarChart>
										</ResponsiveContainer>

									</div>
						
							

						</Col>



						<Col md="12" lg="6">
							<Row>
								<Col lg="6">
									<div className="card mb-3 widget-chart">
										<div className="widget-chart-content">
											<div className="icon-wrapper rounded-circle">
												<div className="icon-wrapper-bg bg-danger" />
												<i className="lnr-laptop-phone text-danger" />
											</div>
											<CardHeader>
												<div tag="h5"
													className="text-uppercase text-muted mb-0 card-header-title" >
													Pays les plus consommateurs de capteurs
                                            </div>
											</CardHeader>
											<Col>
												<div className="h4 font-weight-bold mb-0" >
													<span className="text-warning mr-2">
														<i className="fa fa-flag" />		{this.state.firstCountryName} ({this.state.count1} users)

												</span>
												</div>

												<div className="h6 text-muted font-weight-bold mb-0">	{this.state.secondCountryName} ({this.state.count2} users) </div>
												<div className="h6 text-muted font-weight-bold mb-0">	{this.state.thirdCountryName} ({this.state.count3} users)</div>
												<div className="h6 text-muted font-weight-bold mb-0">	{this.state.fourthCountryName} ({this.state.count4} users)</div>

											</Col>


										</div>

									</div>

									<div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">

										<CardHeader>
											<div tag="h5"
												className="text-uppercase text-muted mb-0 card-header-title" >
												Pollution de l'air minimum capté
										</div>

										</CardHeader>

										<Col>
											<div className="h4 font-weight-bold mb-0" >
												<span className="text-primary mr-2">

													<i className="fa fa-cloud" /> {"  "}	{this.state.minPol}
												</span>
											</div>
											<div className="h6 font-weight mb-0" >
												<span className="text-success mr-2">
													Maximum : {this.state.maxPol} <i className="fa fa-arrow-up" /> 
												</span>
											</div>

										</Col>

									</div>
								</Col>
							

								<Col lg="6">
									<div className="card mb-3 widget-chart">
										<div className="widget-chart-content">
											<div className="icon-wrapper rounded-circle">
												<div className="icon-wrapper-bg bg-primary" />
												<i className="lnr-cog text-primary" />
											</div>
											<CardHeader>
												<div tag="h5"
													className="text-uppercase text-muted mb-0 card-header-title" >
													Nombre total d'utilisateurs
                                            </div>
											</CardHeader>
											<Col>
											<div className="h4 font-weight-bold mb-0" >
												<span className="text-success mr-2">

												<i className="fa fa-users"/> {"  "}	{this.state.nbDocs} 
	
												</span>
											</div>
											</Col>
										


										</div>

									</div>
							

									<div className="card mb-3 bg-love-kiss widget-chart card-border">
										<div className="widget-chart-content text-white">
											<div className="icon-wrapper rounded-circle">
												<div className="icon-wrapper-bg bg-white opacity-4" />
												<i className="lnr-cog" />
											</div>
											<CardHeader>
												<div tag="h5"
													className="text-uppercase text-muted mb-0 card-header-title" >
													Température la plus élevée
										</div>
											</CardHeader>
											<Col>

											<div className="h4 font-weight-bold mb-0" >
												<span className="text-danger mr-2">
														<i className="fa fa-fire"/> {this.state.maxTemp} degrés
												</span>
												
											 
											</div>
												</Col>

										
										</div>

									</div>
								
									<div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">

										<CardHeader>
											<div tag="h5"
												className="text-uppercase text-muted mb-0 card-header-title" >
												Nombre de capteurs en circulation
										</div>

										</CardHeader>

										<Col>
											<div className="h4 font-weight-bold mb-0" >
												<span className="text-dark mr-2">

													<i className="fa fa-wifi" /> {"  "}	{this.state.nbSensor}
												</span>
											</div>

										</Col>

									</div>
								</Col>
							</Row>


							<div className="card mb-3 widget-chart">
								<div className="widget-chart-content">
									<div className="icon-wrapper rounded-circle">
										<div className="icon-wrapper-bg bg-warning" />
										<i className="lnr-heart icon-gradient bg-premium-dark"> </i>
									</div>
									<CardHeader>
										<div tag="h5"
											className="text-uppercase text-muted mb-0 card-header-title" >
											Moyenne des valeurs des capteurs
										</div>
									</CardHeader>
									

								</div>
								<div className="widget-chart-wrapper chart-wrapper-relative">
									<ResponsiveContainer height={200}>
										<LineChart data={this.avgData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} >

											<Line type="monotone" dataKey="value" stroke="#8884d8" />
											<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
											<XAxis dataKey="type" />
											<YAxis />
											<Tooltip />

										</LineChart>
									</ResponsiveContainer>
								</div>
							</div>
						</Col>
					</Row>

					<BrowserRouter>


						<Switch>

							<Route path="/" component={extraitListe} />

						</Switch>
					</BrowserRouter>

</div>


</Fragment>

			);
	}
}


export default Homepage;


