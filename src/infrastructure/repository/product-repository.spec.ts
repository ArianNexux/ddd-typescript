import { Sequelize } from 'sequelize';

describe('Product repository test', () => {

    let sequelize: Sequelize

    beforeEach(() => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
    })
    test('should first', () => {
        expect(1).toBe(1);
    })
    afterEach(async () => {
        await sequelize.close();
    })
})