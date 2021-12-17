import * as namor from 'namor';
import * as _ from 'lodash';

const STATUSES = {
    RELATIONSHIP: 'relationship',
    COMPLICATED: 'complicated',
    SINGLE: 'single',
} as const;

/* enum STATUSES {
    RELATIONSHIP = 'relationship',
    COMPLICATED = 'complicated',
    SINGLE = 'single',
} */

// below is an interesting type definition
// to understand it see https://stackoverflow.com/questions/53662208/types-from-both-keys-and-values-of-object-in-typescript
// and this https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
// equals to
// type Key = keyof typeof STATUSES; // RELATIONSHIP | COMPLICATED | SINGLE
// export type TStatus = typeof STATUSES[Key]; // 'relationship' | 'complicated' | 'single'
export type TStatus = typeof STATUSES[keyof typeof STATUSES];

export interface INewPerson {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: TStatus;
    // status: STATUSES;
    tags: Array<string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [index: string]: any;
}

const generateId = (): string => {
    const dateString = Date.now().toString(16);
    const randomness = Math.random().toString(16).substring(2);
    return `${dateString}-${randomness}`;
};

const getNewPerson = (): INewPerson => {
    const statusChance = Math.random();
    const getStatus = (): TStatus => {
        // const getStatus = (): STATUSES => {
        if (statusChance > 0.66) return STATUSES.RELATIONSHIP;
        // if (statusChance > 0.66) return 'hoho';
        if (statusChance > 0.33) return STATUSES.COMPLICATED;
        return STATUSES.SINGLE;
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
