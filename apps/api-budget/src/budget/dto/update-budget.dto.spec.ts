import { validate } from 'class-validator';
import { UpdateBudgetDto } from './update-budget.dto';

describe(`UpdateBudget DTO`, () => {
  it('should have all values defined and not empty', async () => {
    const expected = [
      {
        children: [],
        constraints: {
          isDefined: 'name should not be null or undefined',
          isNotEmpty: 'name should not be empty',
          maxLength: 'name must be shorter than or equal to 30 characters',
          minLength: 'name must be longer than or equal to 5 characters',
        },
        property: 'name',
        target: {},
      },
      {
        children: [],
        constraints: {
          isDefined: 'description should not be null or undefined',
          isNotEmpty: 'description should not be empty',
          maxLength:
            'description must be shorter than or equal to 250 characters',
          minLength:
            'description must be longer than or equal to 10 characters',
        },
        property: 'description',
        target: {},
      },
      {
        children: [],
        constraints: {
          isDefined: 'year should not be null or undefined',
          isNotEmpty: 'year should not be empty',
          isInt: 'year must be an integer number',
          min: 'year must not be less than 1900',
        },
        property: 'year',
        target: {},
      },
    ];

    const updateBudgetDto = new UpdateBudgetDto();
    const actual = await validate(updateBudgetDto);

    expect(actual).toEqual(expected);
  });
});
