// Generate Excel using SheetJS when the user submits the form
function collectFormData() {
  return {
    "First Name": document.getElementById('firstName').value.trim(),
    "Middle Name": document.getElementById('middleName').value.trim(),
    "Last Name": document.getElementById('lastName').value.trim(),
    "Street Address": document.getElementById('streetAddress').value.trim(),
    "City": document.getElementById('city').value.trim(),
    "State": document.getElementById('state').value.trim(),
    "Zip Code": document.getElementById('zipCode').value.trim(),
    "Social Security Number": document.getElementById('ssn').value.trim(),
    "Date of Birth": document.getElementById('dob').value,
    "Primary Phone": document.getElementById('phone').value.trim(),
    "Email Address": document.getElementById('email').value.trim(),
    "Driver’s License Number": document.getElementById('driversLicense').value.trim(),
    "ID Issue Date": document.getElementById('issueDate').value,
    "ID Expiration Date": document.getElementById('expirationDate').value
  };
}

document.getElementById('submitBtn').addEventListener('click', function () {
  const data = collectFormData();
  const headers = Object.keys(data);
  const values = Object.values(data);

  // Build worksheet
  const ws = XLSX.utils.aoa_to_sheet([headers, values]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Application');

  const firstName = data["First Name"] || 'Application';
  const lastName = data["Last Name"] || '';
  const fileName = `${firstName}${lastName}_Financing.xlsx`;
  XLSX.writeFile(wb, fileName);
});
