// ==========================
// COMPONENT: FILTER SIDEBAR
// ==========================
"use client";
export const FilterSidebar = () => {
return (
<div className="w-72 bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-white space-y-4 border border-white/10">
<h2 className="text-xl font-bold">Filters</h2>
<input
type="text"
placeholder="Search location..."
className="w-full p-2 bg-black/30 border border-white/20 rounded"
/>
<input
type="number"
placeholder="Min Price"
className="w-full p-2 bg-black/30 border border-white/20 rounded"
/>
<input
type="number"
placeholder="Max Price"
className="w-full p-2 bg-black/30 border border-white/20 rounded"
/>
<button className="w-full bg-blue-600 py-2 rounded-xl hover:bg-blue-700">Apply</button>
</div>
);
};