(() => {
	const enabledSources = sources.filter(s => s.enabled);
	const sidebar = document.getElementById('sidebar');
	const sidebarBtns = [];
	const container = document.getElementById('maincontainer');
	//const iframe = document.getElementById('mainframe');
	const controls = document.getElementById('controls');

	function multiFrame() { return JSON.parse(localStorage.getItem('multiframe')); }

	let activeSource = null;
	function activateSource(source) {
		if(source === null) return;
		activeSource = source;
		if(!multiFrame()) {
			enabledSources.forEach(s => {
				if(s.id === source.id) return;
				if(s.frame.src !== 'about:blank') {
					s.frame.src = 'about:blank';
					console.log('blank frame');
				}
				s.frame.className = 'hide';
			});
			//source.frame.src = 'about:blank';
			//source.frame.className = 'hide';
			//iframe.className = '';
			//iframe.src = source.fullHost;
			if(!source.frame.src.startsWith(source.fullHost)) {
				console.log('set to full host', source.frame.src, source.fullHost);
				source.frame.src = source.fullHost;
			}
			source.frame.className = '';
		} else {
			enabledSources.forEach(source => {
				source.frame.className = 'hide';
			});
			source.frame.className = '';
			if(source.frame.src === 'about:blank' || source.frame.src === '') source.frame.src = source.fullHost;
			//iframe.src = 'about:blank';
		}
		document.title = `${source.text} - Arrhub`;
		window.location.hash = `#${source.id}`;
		const btn = document.getElementById(`btn-${source.id}`);
		if(!btn.classList.contains('active'))
			btn.classList.add('active');
	}

	function toggleMultiframe(enabled) {
		if(enabled) {
			//iframe.className = 'hide';
			activateSource(activeSource);
			return;
		} 
		enabledSources.forEach(source => {
			if(source.id === activeSource.id) return;
			source.frame.className = 'hide';
			source.frame.src = 'about:blank';
		});
		//iframe.className = '';
		activateSource(activeSource);
	}

	enabledSources.forEach(source => {
		//iframe.className = 'hide';
		const frame = Object.assign(document.createElement('iframe'), {
			id: `frame-${source.id}`,
			className: 'hide',
			src: 'about:blank'
		});
		container.append(frame);
		source.frame = frame;

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

	controls.remove();
	sidebar.append(controls);

	document.getElementById('multiframe').addEventListener('change', e => {
		localStorage.setItem('multiframe', e.target.checked);
		toggleMultiframe(e.target.checked);
	});


})();