import React, { useMemo, useState } from 'react';
import { Table, IColumn } from './table';
import { createData } from './create-data';

const columnsData: Array<IColumn> = [
    { key: 'firstName', title: 'First name' },
    { key: 'lastName', title: 'Last name' },
    { key: 'age', title: 'Age' },
    { key: 'visits', title: 'Visits' },
    { key: 'status', title: 'Status' },
    { key: 'tags', title: 'Tags', render: (value) => value.join(', ') },
];

const App: React.FC = () => {
    const columns = useMemo(() => [...columnsData], []);

    const [data, setData] = useState(() => createData(50));

    return (
        <div>
            <h1>Test (1 lvl)</h1>
            <h3>Description of the task in the README.md</h3>
            <Table columns={columns} data={data} setData={setData} />
        </div>
    );
};

export default App;
