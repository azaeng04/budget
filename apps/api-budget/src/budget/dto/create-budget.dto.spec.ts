import { validate } from 'class-validator';
import { createBudgetDto } from './create-budget.dto.test.data';

describe(`CreateBudget DTO`, () => {
  it('should have name property with 4 rules set', async () => {
    const expected = expect.arrayContaining([
      expect.objectContaining({
        children: expect.arrayContaining([]),
        constraints: {
          isDefined: 'name should not be null or undefined',
          maxLength: 'name must be shorter than or equal to 30 characters',
          minLength: 'name must be longer than or equal to 5 characters',
          isNotEmpty: 'name should not be empty',
        },
        property: 'name',
      }),
    ]);

    createBudgetDto.name = undefined;
    const actual = await validate(createBudgetDto);

    expect(actual).toEqual(expected);
  });

  it('should have description property with 4 rules set', async () => {
    const expected = expect.arrayContaining([
      expect.objectContaining({
        children: expect.arrayContaining([]),
        constraints: expect.not.objectContaining({
          isDefined: 'description should not be null or undefined',
          maxLength:
            'description must be shorter than or equal to 250 characters',
          isNotEmpty: 'description should not be empty',
        }),
        property: 'description',
      }),
    ]);

    createBudgetDto.description = '';
    const actual = await validate(createBudgetDto);

    expect(actual).toEqual(expected);
  });

  it('should have year property with 5 rules set', async () => {
    const expected = expect.arrayContaining([
      expect.objectContaining({
        children: expect.arrayContaining([]),
        constraints: {
          isDefined: 'year should not be null or undefined',
          max: 'year must not be greater than 9999',
          min: 'year must not be less than 1000',
          isInt: 'year must be an integer number',
          isNotEmpty: 'year should not be empty',
        },
        property: 'year',
      }),
    ]);

    createBudgetDto.year = undefined;
    const actual = await validate(createBudgetDto);

    expect(actual).toEqual(expected);
  });
});
