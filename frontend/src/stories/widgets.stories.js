import React from 'react';
import App from '../App.js';
import Formu from '../vue/form.js';


export default {
	component: App, Formu,
	title: 'Projet',
};


export const Dashboard = () => <App />;

export const Formulaire = () => <Formu />;
