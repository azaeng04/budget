import { validate } from 'class-validator';
import { createBudgetDto } from './create-budget.dto.test.data';

describe(`CreateBudget DTO`, () => {
  it('should have name property with 4 rules set', async () => {
    const expected = expect.arrayContaining([
      expect.objectContaining({
        children: expect.arrayContaining([]),
        constraints: {
          isDefined: '_name should not be null or undefined',
          maxLength: '_name must be shorter than or equal to 30 characters',
          minLength: '_name must be longer than or equal to 5 characters',
          isNotEmpty: '_name should not be empty',
        },
        property: '_name',
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
        constraints: {
          isDefined: '_description should not be null or undefined',
          maxLength:
            '_description must be shorter than or equal to 250 characters',
          minLength:
            '_description must be longer than or equal to 10 characters',
          isNotEmpty: '_description should not be empty',
        },
        property: '_description',
      }),
    ]);

    createBudgetDto.description = undefined;
    const actual = await validate(createBudgetDto);

    expect(actual).toEqual(expected);
  });

  it('should have year property with 5 rules set', async () => {
    const expected = expect.arrayContaining([
      expect.objectContaining({
        children: expect.arrayContaining([]),
        constraints: {
          isDefined: '_year should not be null or undefined',
          max: '_year must not be greater than 9999',
          min: '_year must not be less than 1000',
          isInt: '_year must be an integer number',
          isNotEmpty: '_year should not be empty',
        },
        property: '_year',
      }),
    ]);

    createBudgetDto.year = undefined;
    const actual = await validate(createBudgetDto);

    expect(actual).toEqual(expected);
  });
});
