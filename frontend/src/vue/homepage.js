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
			countryName:'',
			count:'',
			nbDocs:'',
			nbSensor:'',
			activeIndex: 0,
			countryData:[],
			
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

		this.renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
			return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}> </text>;
		};



		this.onPieEnter = (data, index) => {
			this.setState({
				activeIndex: index,
			});
		};


	}


// getData(){

// 	axios.get('http://localhost:4000/admin/getLoc')
// 		.then(response => {
// 			this.setState({
// 				countryData: response.data.map((pays, index) => {
// 					return <tr>
// 						<td> {pays._id} </td>
// 						<td> {pays.count} </td>
// 					</tr>

// 				})


// 			})
// 			// const table = this.state.countryData.split('\n').slice(1);
// 			this.state.countryData.forEach(row => {
// 				const columns = row.split(',');
// 				const pays = columns[0];
// 				const nbUser = columns[1];
// 				console.log(pays, nbUser);
// 			})

// 		})
	
// 		.catch(err => {
// 			console.log(err);
// 		})
// }



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




		axios.get('http://localhost:4000/admin/latestRec')
			.then(response => {

				this.setState({
					countryName: response.data[0]._id,
					count: response.data[0].count,
				})
			})
			.catch(err => {
				console.log(err);
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

											<ResponsiveContainer height={187}>
												<PieChart width={200} height={200}>
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

							<Row>
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
											<div  className="h4 font-weight-bold mb-0" >
												{this.state.nbDocs}
											</div>
											

										</div>

									</div>
								</Col>

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
													Pays le plus consommateur 
                                            </div>
											</CardHeader>

											<div className="h4 font-weight-bold mb-0" >
												<span className="text-danger mr-2">
													{this.state.countryName} avec {this.state.count} utilisateurs 
	
												</span>
											</div>

													
											

										</div>

									</div>
								</Col>
							</Row>
						</Col>



						<Col md="12" lg="6">
							<Row>
								<Col md="6">
									
									<div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">
										<div className="icon-wrapper rounded-circle">
											<div className="icon-wrapper-bg bg-white opacity-10" />
											<i className="lnr-cog icon-gradient bg-arielle-smile" />
										</div>
										<CardHeader>
										<div tag="h5"
											className="text-uppercase text-muted mb-0 card-header-title" >
											Nombre de capteurs en circulation
										</div>
										</CardHeader>
										<div className="mt-3 mb-0 text-muted text-sm" >
											<span className="text-danger mr-2">
											{this.state.nbSensor}
											</span>

										</div>
										

									</div>
								</Col>
								<Col md="6">
									<div className="card mb-3 bg-midnight-bloom widget-chart text-white card-border">
										<div className="icon-wrapper rounded">
											<div className="icon-wrapper-bg bg-white opacity-10" />
											<i className="lnr-screen icon-gradient bg-warm-flame" />
										</div>
										<CardHeader>
											<div tag="h5"
												className="text-uppercase text-muted mb-0 card-header-title" >
												Nombre de capteurs en circulation
										</div>
										</CardHeader>
										<div className="mt-3 mb-0 text-muted text-sm" >
											<span className="text-danger mr-2">
												{this.state.nbSensor}
											</span>

										</div>
									</div>
								</Col>
								<Col md="6">
									<div className="card mb-3 bg-grow-early widget-chart text-white card-border">
										<div className="icon-wrapper rounded">
											<div className="icon-wrapper-bg bg-dark opacity-9" />
											<i className="lnr-graduation-hat text-white" />
										</div>
										<CardHeader>
											<div tag="h5"
												className="text-uppercase text-muted mb-0 card-header-title" >
												Nombre de capteurs 
										</div>
										</CardHeader>
										<div className="mt-3 mb-0 text-muted text-sm" >
											<span className="text-danger mr-2">
												{this.state.nbSensor}
											</span>

										</div>
									</div>
								</Col>
								<Col md="6">
									<div className="card mb-3 bg-love-kiss widget-chart card-border">
										<div className="widget-chart-content text-white">
											<div className="icon-wrapper rounded-circle">
												<div className="icon-wrapper-bg bg-white opacity-4" />
												<i className="lnr-cog" />
											</div>
											<CardHeader>
												<div tag="h5"
													className="text-uppercase text-muted mb-0 card-header-title" >
													Pays
										</div>
											</CardHeader>
											<div className="mt-3 mb-0 text-muted text-sm" >
												<span className="text-danger mr-2">
													{this.state.countryName}
												</span>

											</div>
										</div>

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


