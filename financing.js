// Open Aqua Finance OAuth2 sign-in in a new tab
const signinBtn = document.getElementById('signinBtn');
if (signinBtn) {
  signinBtn.addEventListener('click', () => {
    const url = 'https://aquaauth.b2clogin.com/b6ff0ca4-b13d-4240-b73b-2f379291089e/b2c_1a_orbit_signin_web/oauth2/v2.0/authorize?scope=787ce0e0-e8fe-4769-af2c-947643d52e2e%20offline_access&response_type=code&client_id=787ce0e0-e8fe-4769-af2c-947643d52e2e&redirect_uri=https%3A%2F%2Fportal.aquafinance.com%2Fsignin&acr_values=acrValues';
    window.open(url, '_blank');
  });
}

function collectFormData() {
  return {
    'First Name': document.getElementById('firstName').value.trim(),
    'Middle Name': document.getElementById('middleName').value.trim(),
    'Last Name': document.getElementById('lastName').value.trim(),
    'Street Address': document.getElementById('streetAddress').value.trim(),
    'City': document.getElementById('city').value.trim(),
    'State': document.getElementById('state').value.trim(),
    'Zip Code': document.getElementById('zipCode').value.trim(),
    'Social Security Number': document.getElementById('ssn').value.trim(),
    'Date of Birth': document.getElementById('dob').value,
    'Primary Phone': document.getElementById('phone').value.trim(),
    'Email Address': document.getElementById('email').value.trim(),
    "Driver's License Number": document.getElementById('driversLicense').value.trim(),
    'ID Issue Date': document.getElementById('issueDate').value,
    'ID Expiration Date': document.getElementById('expirationDate').value,
    'Gross Monthly Income': document.getElementById('monthlyIncome').value.trim(),
    'Position': document.getElementById('position').value.trim(),
    'Length of Employment': document.getElementById('employmentYears').value.trim(),
    'Monthly Mortgage Payment': document.getElementById('mortgagePayment').value.trim(),
    'Years in the House': document.getElementById('yearsInHouse').value.trim(),
    'Co-First Name': document.getElementById('coFirstName').value.trim(),
    'Co-Middle Name': document.getElementById('coMiddleName').value.trim(),
    'Co-Last Name': document.getElementById('coLastName').value.trim(),
    'Co-Street Address': document.getElementById('coStreetAddress').value.trim(),
    'Co-City': document.getElementById('coCity').value.trim(),
    'Co-State': document.getElementById('coState').value.trim(),
    'Co-Zip Code': document.getElementById('coZipCode').value.trim(),
    'Co-Social Security Number': document.getElementById('coSsn').value.trim(),
    'Co-Date of Birth': document.getElementById('coDob').value,
    'Co-Primary Phone': document.getElementById('coPhone').value.trim(),
    'Co-Email Address': document.getElementById('coEmail').value.trim(),
    "Co-Driver's License Number": document.getElementById('coDriversLicense').value.trim(),
    'Co-ID Issue Date': document.getElementById('coIssueDate').value,
    'Co-ID Expiration Date': document.getElementById('coExpirationDate').value,
    'Co-Gross Monthly Income': document.getElementById('coMonthlyIncome').value.trim(),
    'Co-Position': document.getElementById('coPosition').value.trim(),
    'Co-Length of Employment': document.getElementById('coEmploymentYears').value.trim(),
    'Co-Monthly Mortgage Payment': document.getElementById('coMortgagePayment').value.trim(),
    'Co-Years in the House': document.getElementById('coYearsInHouse').value.trim()
  };
}

function generateExcel(data) {
  const headers = Object.keys(data);
  const values = Object.values(data);
  const ws = XLSX.utils.aoa_to_sheet([headers, values]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Application');
  const firstName = data['First Name'] || 'Application';
  const lastName = data['Last Name'] || '';
  XLSX.writeFile(wb, `${firstName}${lastName}_Financing.xlsx`);
}

function submitToAquaAPI(formData) {
  // TODO: Use access token to send POST request to Aqua Finance API endpoint
}

const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const data = collectFormData();
    generateExcel(data);
    submitToAquaAPI(data);
  });
}
