export const renderDashboard = (books) => `
<div class="dashboard-grid">
    <div class="stat-card"><h3>Books</h3><p>${books.length}</p></div>
    <div class="stat-card"><h3>Authors</h3><p>${[...new Set(books.map(b => b.author))].length}</p></div>
</div>`;