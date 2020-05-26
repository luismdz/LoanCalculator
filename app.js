document.querySelector('#loan-form').addEventListener('submit', e => {
    // Hide results
    document.querySelector('#results').style.display = 'none';
    // show Loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calulateResults, 1000);
    e.preventDefault();
});

function calulateResults() {
    // forms variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    // results
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');
    // formula variables
    const principal = parseFloat(amount.value);
    const calulatedInterest = (parseFloat(interest.value) / 100) / 12;
    const payments = parseFloat(years.value) * 12;

    // compute monthly payments
    const x = Math.pow(1 + calulatedInterest, payments);
    const monthly = (principal * x * calulatedInterest) / (x - 1);

    if (isFinite(monthly) && !isNaN(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * payments).toFixed(2);
        totalInterest.value = ((monthly * payments) - principal).toFixed(2);

        // Show results
        document.querySelector('#results').style.display = 'block';

    } else {
        showError('Please check yours numbers');
    }
    // Hide Loader
    document.querySelector('#loading').style.display = 'none';

    amount.value = '';
    interest.value = '';
    years.value = '';
}

function showError(text) {
    // create div and add bootstrap classes
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(text));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);

    // Set timeout to error alert
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}