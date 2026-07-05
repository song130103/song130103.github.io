function enter() {
	const ifr=document.getElementById('ifr');	
	ifr.src=document.getElementById('ipt').value;
}function handleClick() {
	const ifr=document.getElementById('ifr');	
	ifr.src='https://www.zreamer.top';
}function refresh(parameters) {
	const ifr=document.getElementById('ifr');
	let i = ifr.src;
	ifr.src='about:blank';
	ifr.src=i;
}