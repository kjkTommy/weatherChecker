window.localStorage.setItem("name", ["strada", "world", "IT"]);

const localStorageSize = window.localStorage.length;
for (let i = 0; i < localStorageSize; i++) {
	console.log(window.localStorage.getItem(localStorage.key(i)));
}
