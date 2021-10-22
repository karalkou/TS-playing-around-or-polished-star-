import React, { useMemo, useState } from 'react';
import { Table, IColumn } from './table';
import { createData } from './create-data';

const App: React.FC = () => {
    const columns = useMemo<IColumn[]>(
        () => [
            { key: 'firstName', title: 'First name' },
            { key: 'lastName', title: 'Last name' },
            { key: 'age', title: 'Age' },
            { key: 'visits', title: 'Visits' },
            { key: 'status', title: 'Status' },
            { key: 'tags', title: 'Tags', render: (value) => value.join(', ') },
        ],
        [],
    );

    const [data] = useState(() => createData(50));

    return (
        <div>
            <h1>Test (1 lvl)</h1>
            <h3>Description of the task in the README.md</h3>
            <Table columns={columns} data={data} />
        </div>
    );
};

export default App;
