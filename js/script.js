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

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

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

addTransactionBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", checkForm);
