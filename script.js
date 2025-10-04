// Dowry Calculator Logic for Bihar
// Initialize jsPDF
const { jsPDF } = window.jspdf;

function calculateDowry() {
    // Get input values
    const jaat = parseFloat(document.getElementById('jaat').value);
    const color = parseFloat(document.getElementById('color').value);
    const jamin = parseFloat(document.getElementById('jamin').value);
    const education = parseFloat(document.getElementById('education').value);
    const salary = parseFloat(document.getElementById('salary').value);
    const girlEducation = parseFloat(document.getElementById('girlEducation').value);
    
    // Bihar-specific dowry calculation formula
    // Weighted factors for Bihar social values
    const jaatWeight = 0.25;
    const colorWeight = 0.15;
    const educationWeight = 0.20;
    const girlEducationWeight = 0.10;
    const salaryWeight = 0.20;
    const landWeight = 0.10;
    
    // Calculate weighted score
    const socialScore = (jaat * jaatWeight) + 
                        (color * colorWeight) + 
                        (education * educationWeight) + 
                        (girlEducation * girlEducationWeight);
    
    // Base dowry value calculation
    const annualIncome = salary * 12;
    const incomeComponent = annualIncome * salaryWeight;
    const landComponent = jamin * 500000 * landWeight; // ₹500,000 per Bigha average in Bihar
    
    // Total base value
    const baseValue = (incomeComponent + landComponent) * socialScore;
    
    // Calculate components
    const goldChain = Math.round((baseValue * 0.00015) + (jaat * 7)); // in grams
    const landValue = jamin; // in Bigha
    const cashValue = Math.round(baseValue * 0.65);
    
    // Electronics calculation based on value thresholds
    let electronics = [];
    if(baseValue > 50000) electronics.push("TV");
    if(baseValue > 100000) electronics.push("Washing machine");
    if(baseValue > 150000) electronics.push("fridge");
    if(baseValue > 300000) electronics.push("AC");

    // car calculation based on value thresholds
    let car = [];
    if(baseValue < 150000) car.push("TVS Jupiter");
    else if(baseValue < 250000) car.push("Honda Shine");
    else if(baseValue < 350000) car.push("Splendor");
    else if(baseValue < 500000) car.push("Royal Enfield Classic 350");

    const electronicsCount = electronics.length;
    const electronicsList = electronics.join(", ") || "कोई नहीं";
    const carList = car.join(", ") || "कोई नहीं";
    
    // Total dowry value
    const totalValue = Math.round(cashValue + landComponent + (goldChain * 4500)); // Gold rate ₹4500/gm
    
    // Update UI with results
    document.getElementById('goldChain').textContent = `${goldChain} gm`;
    document.getElementById('land').textContent = `${landValue/2} bigha`;
    document.getElementById('cash').textContent = `Rs. ${cashValue.toLocaleString('en-IN')}`;
    document.getElementById('electronics').textContent = `${electronicsCount} items (${electronicsList})`;
    console.log(carFinal = document.getElementById('car').textContent = `${carList}`);
    document.getElementById('totalValue').textContent = `Rs. ${totalValue.toLocaleString('en-IN')} + ${carList}`;
}

function downloadPDF() {
    // Get results
    const goldChain = document.getElementById('goldChain').textContent;
    const land = document.getElementById('land').textContent;
    const cash = document.getElementById('cash').textContent;
    const electronics = document.getElementById('electronics').textContent;
    const totalValue = document.getElementById('totalValue').textContent;

    // Create PDF
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("Dahej Calculator", 105, 20, null, null, 'center');

    // Subtitle
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text("Dahej Details Report", 105, 30, null, null, 'center');
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Section Header
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text("Calculation Breakdown:", 20, 45);

    // Details (labels left, values right)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    let y = 55;
    doc.text("Gold Chain:", 25, y);
    doc.text(`${goldChain}`, 80, y);
    y += 10;
    doc.text("Land:", 25, y);
    doc.text(`${land}`, 80, y);
    y += 10;
    doc.text("Cash:", 25, y);
    doc.text(`${cash}`, 80, y);
    y += 10;
    doc.text("Electronics:", 25, y);
    doc.text(`${electronics}`, 80, y);
    y += 10;
    doc.text("vehicle:", 25, y);
    doc.text(`${carFinal}`, 80, y);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text("Total Value:", 25, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${totalValue}`, 80, y);

    // Note section
    y += 20;
    doc.setFontSize(10);
    doc.setTextColor(200, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text("Note:", 20, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text("This calculation is for educational purposes only. Dowry is a crime in India.", 35, y);

    // Slogan
    y += 10;
    doc.setFontSize(11);
    doc.setTextColor(0, 102, 51);
    doc.setFont('helvetica', 'bold');
    doc.text("Support a dowry-free Bihar", 105, y, null, null, 'center');

    // Save the PDF
    doc.save('dowry_calculation_report.pdf');
}

// Initialize with sample calculation
document.addEventListener('DOMContentLoaded', function() {
    calculateDowry();
});