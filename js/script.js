const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");

const addTransactionBtn = document.querySelector(".add-transaction");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteBtn = document.querySelector(".delete");
const deleteAllBtn = document.querySelector(".delete-all");
const lightStyleBtn = document.querySelector(".light");
const darkStyleBtn = document.querySelector(".dark");

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];
console.log(moneyArr);

// funkcja pokazująca panel
const showPanel = () => {
	addTransactionPanel.style.display = "flex";
};

// funkcja chowająca panel
const closePanel = () => {
	addTransactionPanel.style.display = "none";
	clearInputs();
};

// funkcja sprawdzająca wypełnienie formularza
const checkForm = () => {
	if (
		nameInput.value !== "" &&
		amountInput.value !== "" &&
		categorySelect.value !== "none"
	) {
		createNewTransaction();
	} else {
		alert("Wypełnij wszystkie pola!");
	}
};

// funkcja czyszcząca formularz
const clearInputs = () => {
	nameInput.value = "";
	amountInput.value = "";
	categorySelect.selectedIndex = 0;
};

// funkcja dodająca transakcję
const createNewTransaction = () => {
	const newTransaction = document.createElement("div");
	newTransaction.classList.add("transaction");
	newTransaction.setAttribute("id", ID);

	checkCategory(selectedCategory);

	newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount">${amountInput.value}zł 
    <button class="delete" onclick="deleteTransaction(${ID})"><i class="fa-solid fa-xmark"></i></button></p>
    `;

	amountInput.value > 0
		? incomeSection.appendChild(newTransaction) &&
		  newTransaction.classList.add("income")
		: expensesSection.appendChild(newTransaction) &&
		  newTransaction.classList.add("expense");

	moneyArr.push(parseFloat(amountInput.value));
	countMoney(moneyArr);
	closePanel();
	ID++;
	clearInputs();
};

// funkcja przypisująca do zmiennej wybraną kategorię
const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

// funkcja sprawdzająca kategorię transakcji + dobór ikon
const checkCategory = transaction => {
	switch (transaction) {
		case "[ + ] Przychód":
			categoryIcon = `<i class="fa-solid fa-money-bill-wave"></i>`;
			break;
		case "[ - ] Zakupy":
			categoryIcon = `<i class="fa-solid fa-cart-arrow-down"></i>`;
			break;
		case "[ - ] Jedzenie":
			categoryIcon = `<i class="fa-solid fa-burger"></i>`;
			break;
		case "[ - ] Kino":
			categoryIcon = `<i class="fa-solid fa-film"></i>`;
			break;
	}
};

// funkcja zliczająca dostępne środki
const countMoney = money => {
	const newMoney = money.reduce((a, b) => a + b);
	console.log(newMoney);
	console.log(typeof newMoney);
	availableMoney.textContent = `${newMoney}zł`;
	console.log(availableMoney.textContent);
	console.log(typeof availableMoney.textContent);
	console.log("---------------");
};

// funkcja usuwająca pojedynczą transakcję
const deleteTransaction = id => {
	const transactionToDelete = document.getElementById(id);
	console.log(transactionToDelete);
	const transactionAmount = parseFloat(
		transactionToDelete.childNodes[3].innerText
	);
	console.log(transactionToDelete.childNodes);
	console.log(transactionToDelete.childNodes[3]);
	console.log(transactionToDelete.childNodes[3].innerText);
	console.log(transactionAmount);
	const indexOfTransaction = moneyArr.indexOf(transactionAmount);
	console.log(indexOfTransaction);

	moneyArr.splice(indexOfTransaction, 1);

	transactionToDelete.classList.contains("income")
		? incomeSection.removeChild(transactionToDelete)
		: expensesSection.removeChild(transactionToDelete);

	countMoney(moneyArr);
};

// funkcja usuwająca wszystkie transakcje
const deleteAllTransactions = () => {
	incomeSection.innerHTML = "<h3>Przychód:</h3>";
	expensesSection.innerHTML = "<h3>Wydatki:</h3>";
	availableMoney.textContent = "0zł";
	moneyArr = [0];
};

// funkcja zmieniająca styl na jasny
const changeStyleToLight = () => {
	root.style.setProperty("--first-color", "#f9f9f9");
	root.style.setProperty("--second-color", "#14161f");
	root.style.setProperty("--border-color", "rgba(0, 0, 0, 0.2)");
};

// funkcja zmieniająca styl na ciemny
const changeStyleToDark = () => {
	root.style.setProperty("--first-color", "#14161f");
	root.style.setProperty("--second-color", "#f9f9f9");
	root.style.setProperty("--border-color", "rgba(255, 255, 255, 0.4)");
};

addTransactionBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", checkForm);
deleteAllBtn.addEventListener("click", deleteAllTransactions);
lightStyleBtn.addEventListener("click", changeStyleToLight);
darkStyleBtn.addEventListener("click", changeStyleToDark);
