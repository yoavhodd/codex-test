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
  const applicantFields = [
    ['First Name', 'First Name'],
    ['Middle Name', 'Middle Name'],
    ['Last Name', 'Last Name'],
    ['Street Address', 'Street Address'],
    ['City', 'City'],
    ['State', 'State'],
    ['Zip Code', 'Zip Code'],
    ['Social Security Number', 'Social Security Number'],
    ['Date of Birth', 'Date of Birth'],
    ['Primary Phone', 'Primary Phone'],
    ['Email Address', 'Email Address'],
    ["Driver's License", "Driver's License Number"],
    ['ID Issue Date', 'ID Issue Date'],
    ['ID Expiration Date', 'ID Expiration Date'],
    ['Gross Monthly Income', 'Gross Monthly Income'],
    ['Position', 'Position'],
    ['Length of Employment', 'Length of Employment'],
    ['Monthly Mortgage Payment', 'Monthly Mortgage Payment'],
    ['Years in the House', 'Years in the House']
  ];

  const coApplicantFields = [
    ['First Name', 'Co-First Name'],
    ['Middle Name', 'Co-Middle Name'],
    ['Last Name', 'Co-Last Name'],
    ['Street Address', 'Co-Street Address'],
    ['City', 'Co-City'],
    ['State', 'Co-State'],
    ['Zip Code', 'Co-Zip Code'],
    ['Social Security Number', 'Co-Social Security Number'],
    ['Date of Birth', 'Co-Date of Birth'],
    ['Primary Phone', 'Co-Primary Phone'],
    ['Email Address', 'Co-Email Address'],
    ["Driver's License", "Co-Driver's License Number"],
    ['ID Issue Date', 'Co-ID Issue Date'],
    ['ID Expiration Date', 'Co-ID Expiration Date'],
    ['Gross Monthly Income', 'Co-Gross Monthly Income'],
    ['Position', 'Co-Position'],
    ['Length of Employment', 'Co-Length of Employment'],
    ['Monthly Mortgage Payment', 'Co-Monthly Mortgage Payment'],
    ['Years in the House', 'Co-Years in the House']
  ];

  const aoa = [
    ['Applicant', null, '', 'Co-Applicant', null]
  ];

  for (let i = 0; i < applicantFields.length; i++) {
    const [labelA, keyA] = applicantFields[i];
    const [labelC, keyC] = coApplicantFields[i];
    aoa.push([
      labelA + ':',
      data[keyA] || '',
      '',
      labelC + ':',
      data[keyC] || ''
    ]);
  }

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
    { s: { r: 0, c: 3 }, e: { r: 0, c: 4 } }
  ];
  ws['!cols'] = [
    { wch: 24 },
    { wch: 24 },
    { wch: 3 },
    { wch: 24 },
    { wch: 24 }
  ];

  const thin = { style: 'thin' };
  const border = { top: thin, bottom: thin, left: thin, right: thin };

  for (let r = 0; r < aoa.length; r++) {
    for (let c = 0; c < 5; c++) {
      if (c === 2) continue; // spacer column
      const cellAddress = XLSX.utils.encode_cell({ r, c });
      const cell = ws[cellAddress];
      if (cell) {
        cell.s = {
          border,
          alignment: { vertical: 'center', horizontal: r === 0 ? 'center' : 'left' },
          font: (r === 0 || c === 0 || c === 3) ? { bold: true } : {}
        };
      }
    }
  }

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
