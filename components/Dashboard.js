export const renderDashboard = (books) => {
    const total = books.length;
    const authors = [...new Set(books.map(b => b.author))].length;
    return `
    <div class="dashboard-grid">
        <div class="stat-card"><h3>Books</h3><p>${total}</p></div>
        <div class="stat-card"><h3>Authors</h3><p>${authors}</p></div>
    </div>`;
};