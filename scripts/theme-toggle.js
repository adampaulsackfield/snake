const body = document.querySelector('body');
const toggle = document.getElementById('themeSelect');

toggle.addEventListener('change', (e) => {
	body.classList = `container ${toggle.value}`;
});
