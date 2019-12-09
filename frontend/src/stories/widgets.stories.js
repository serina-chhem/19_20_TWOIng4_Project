import React from 'react';
import App from '../App.js';
import Formu from '../vue/admin.js';


export default {
	component: App, Formu,
	title: 'Projet',
};


export const Dashboard = () => <App />;

export const Formulaire = () => <Formu />;
