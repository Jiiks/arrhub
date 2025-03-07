(() => {
	const enabledSources = sources.filter(s => s.enabled);
	const sidebar = document.getElementById('sidebar');
	const sidebarBtns = [];
	const iframe = document.getElementsByTagName('iframe')[0];

	function activateSource(source) {
		iframe.src = source.fullHost;
		document.title = `${source.text} - Arrhub`;
		window.location.hash = `#${source.id}`;
		const btn = document.getElementById(`btn-${source.id}`);
		if(!btn.classList.contains('active'))
			btn.classList.add('active');
	}

	enabledSources.forEach(source => {
		source.fullHost = `${globalhost !== null ? globalhost : source.host}:${source.port}`;
		const sourceBtn = Object.assign(document.createElement('div'), {
			className: 'sidebarBtn',
			id: 'btn-' + source.id
		});
		sourceBtn.addEventListener('mouseup', e => {
			if(e.button !== 0) return;
			if(sourceBtn.classList.contains('active')) return;
			sidebarBtns.forEach(sb => { if(sb.classList.contains('active')) sb.classList.remove('active'); });

			sourceBtn.classList.add('active');
			activateSource(source);
		});

		const sourceBtnImg = Object.assign(document.createElement('i'), {
			style: `background-image: url(${source.img})`
		});
		sourceBtn.append(sourceBtnImg);
		const sourceBtnText = Object.assign(document.createElement('span'), {
			textContent: source.text
		});
		sourceBtn.append(sourceBtnText);

		sidebar.append(sourceBtn);
		sidebarBtns.push(sourceBtn);
	});

	const initial = sources.find(s => s.id === document.location.hash.substr(1));
	if(initial) {
		activateSource(initial);
	} else if(enabledSources.length >= 1) {
		activateSource(enabledSources[0]);
	}


})();