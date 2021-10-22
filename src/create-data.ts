import * as namor from 'namor';
import * as _ from 'lodash';

export interface INewPerson {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: 'relationship' | 'complicated' | 'single';
    tags: Array<string>;
}

const generateId = (): string => {
    const dateString = Date.now().toString(16);
    const randomness = Math.random().toString(16).substring(2);
    return `${dateString}-${randomness}`;
};

const getNewPerson = (): INewPerson => {
    const statusChance = Math.random();
    const getStatus = () => {
        if (statusChance > 0.66) return 'relationship';
        if (statusChance > 0.33) return 'complicated';
        return 'single';
    };

    return {
        id: generateId(),
        firstName: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
        lastName: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status: getStatus(),
        tags: _.range(_.random(10)).map(() =>
            namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
        ),
    };
};

export function createData(length: number): Array<INewPerson> {
    return _.range(length).map(() => getNewPerson());
}
