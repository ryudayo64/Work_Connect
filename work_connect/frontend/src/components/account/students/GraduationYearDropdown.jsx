import React, { useState } from 'react';

const GraduationYearDropdown = () => {
    const startYear = 2024;
    const endYear = new Date().getFullYear() + 5;  // 未来の年数を含める
    const [selectedYear, setSelectedYear] = useState('');

    const years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }

    const handleChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div>
            <select id="graduationYear" value={selectedYear} onChange={handleChange}>
                <option value="" disabled>選択してください</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GraduationYearDropdown;