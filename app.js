const businesses = [
  {
    name: "Shine & Lube Express",
    category: "Car Wash with Lube",
    dailyIncome: 2840,
    monthlyIncome: 76850,
  },
  {
    name: "Oak Barrel Liquor",
    category: "Liquor Store",
    dailyIncome: 4635,
    monthlyIncome: 128900,
  },
  {
    name: "Sunset Stay Motel",
    category: "Motel",
    dailyIncome: 3890,
    monthlyIncome: 104300,
  },
  {
    name: "Fresh Spin Laundry",
    category: "Laundromat",
    dailyIncome: 1760,
    monthlyIncome: 48950,
  },
  {
    name: "Summit Rental Property Group",
    category: "Rental Property",
    dailyIncome: 5210,
    monthlyIncome: 141600,
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const totalDaily = businesses.reduce((sum, business) => sum + business.dailyIncome, 0);
const totalMonthly = businesses.reduce((sum, business) => sum + business.monthlyIncome, 0);

document.getElementById("totalDailyRevenue").textContent = formatCurrency(totalDaily);
document.getElementById("totalMonthlyRevenue").textContent = formatCurrency(totalMonthly);

const cardsContainer = document.getElementById("businessCards");

businesses.forEach((business) => {
  const percentOfDaily = ((business.dailyIncome / totalDaily) * 100).toFixed(1);
  const card = document.createElement("article");
  card.className = "business-card";
  card.innerHTML = `
    <span class="badge">${business.category}</span>
    <h3>${business.name}</h3>
    <div class="metric-row">
      <span>Daily income</span>
      <span>${formatCurrency(business.dailyIncome)}</span>
    </div>
    <div class="metric-row">
      <span>Monthly income</span>
      <span>${formatCurrency(business.monthlyIncome)}</span>
    </div>
    <div class="metric-row">
      <span>Share of today</span>
      <span>${percentOfDaily}%</span>
    </div>
  `;
  cardsContainer.appendChild(card);
});

const sortedMonthly = [...businesses].sort((a, b) => b.monthlyIncome - a.monthlyIncome);
const summaryList = document.getElementById("monthlySummaryList");

sortedMonthly.forEach((business, index) => {
  const item = document.createElement("div");
  item.className = "summary-item";
  item.innerHTML = `
    <div>
      <strong>#${index + 1} ${business.name}</strong>
      <span class="muted">${business.category}</span>
    </div>
    <div>${formatCurrency(business.monthlyIncome)}</div>
  `;
  summaryList.appendChild(item);
});

const ctx = document.getElementById("revenuePieChart");

new Chart(ctx, {
  type: "pie",
  data: {
    labels: businesses.map((business) => business.name),
    datasets: [
      {
        data: businesses.map((business) => business.dailyIncome),
        backgroundColor: [
          "#2F6DF6",
          "#19B394",
          "#FFB648",
          "#8B5CF6",
          "#F25F5C",
        ],
        borderColor: "#ffffff",
        borderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 14,
          padding: 16,
          font: {
            family: "Inter",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${formatCurrency(context.raw)}`;
          },
        },
      },
    },
  },
});
