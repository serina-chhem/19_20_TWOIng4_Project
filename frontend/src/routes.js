



import App from "./App.js";
import Form from "vue/form.js";
import Liste from "vue/liste.js";



var routes = [
	{
		path: "/admin",
		name: "Dashboard",
		icon: "ni ni-tv-2 text-primary",
		component: App,
		layout: "/admin"
	},
	{
		path: "/form",
		name: "Form",
		icon: "ni ni-tv-2 text-blue",
		component: Form,
		layout: "/admin"
	},
	{
		path: "/liste",
		name: "Liste",
		icon: "ni ni-tv-2 text-orange",
		component: Liste,
		layout: "/admin"
	}

];

export default routes;
