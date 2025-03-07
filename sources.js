// If using same host for everything you can just set globalhost to it. 
// For example http://localhost else set it to null
const globalhost = null;

const sources = [
	{
		id: 'radarr',
		text: 'Radarr',
		img: 'img/radarr.png',
		host: '',
		port: '7878',
		enabled: true
	},
	{
		id: 'sonarr',
		text: 'Sonarr',
		img: 'img/sonarr.svg',
		host: '',
		port: '8989',
		enabled: true
	},
	{
		id: 'prowlarr',
		text: 'Prowlarr',
		img: 'img/prowlarr.png',
		host: '',
		port: '9696',
		enabled: true
	},
	{
		id: 'lidarr',
		text: 'Lidarr',
		img: 'img/lidarr.png',
		host: '',
		port: '8686',
		enabled: false
	},
	{
		id: 'bazarr',
		text: 'Bazarr',
		img: 'img/bazarr.png',
		host: '',
		port: '6767',
		enabled: false
	},
	{
		id: 'jellyfin',
		text: 'Jellyfin',
		img: 'img/jellyfin.png',
		host: '',
		port: '8096',
		enabled: true
	},
	{
		id: 'transmission',
		text: 'Transmission',
		img: 'img/transmission.png',
		host: '',
		port: '9091',
		enabled: true
	}

];
