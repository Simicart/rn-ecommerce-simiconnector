import * as yup from 'yup';
import ObjectSchema from 'yup/lib/object.js';
import type { strictFieldData } from './data.flow.js';
import { fieldType } from './fieldType.js';

const errorMessageForRequiredField = 'This field is required';

const matchPattern: { [string]: Array<patternErrorBlob> } = {
  [fieldType.EMAIL]: [
    {
      pattern: /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
      message: 'Not a valid email',
    },
  ],
  [fieldType.PASSWORD]: [
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message: 'Not a valid password',
    },
  ],
};

class FormValidationClass {
  static getFieldValidationObject = (fieldData: strictFieldData): YupObject => {
    const { key, isRequired } = fieldData;
    const object = {
      [key]: yup.string().ensure(),
    };
    if (isRequired) {
      object[key] = object[key]
        .required(errorMessageForRequiredField)
        .test(
          `key has value`,
          errorMessageForRequiredField,
          (value) => value !== ''
        );
    }
    //match input type to correct pattern (if exists)
    //ex: inputKey = 'email' ---> get match_pattern(s) of email
    const match_pattern: Array<patternErrorBlob> = matchPattern[key];
    if (match_pattern) {
      match_pattern.forEach((slug) => {
        if (isRequired) {
          object[key] = object[key].matches(slug.pattern, slug.message);
        } else {
          //if optional, can be no fill or fill in correct format
          object[key] = object[key].test(
            'key is empty or correctly formatted',
            slug.message,
            (value: ?string) =>
              value === '' || value === null || slug.pattern.test(value)
          );
        }
      });
    }
    return yup.object().shape(object);
  };

  static getValidationObject = (data: Array<strictFieldData>): YupObject => {
    let validationSchema = yup.object();
    data.forEach((field) => {
      if (!field.optOut) {
        validationSchema = validationSchema.concat(
          this.getFieldValidationObject(field)
        );
      }
    });
    return validationSchema;
  };

  static getCustomValidationObject = (
    customValidation: ?YupObject
  ): YupObject => {
    return customValidation ?? yup.object();
  };

  static getValidationSchema = (
    data: Array<strictFieldData>,
    customValidation: ?YupObject
  ): YupObject => {
    return this.getValidationObject(data).concat(
      this.getCustomValidationObject(customValidation)
    );
  };
}

type YupObject = typeof ObjectSchema;

type patternErrorBlob = {
  pattern: RegExp,
  message: string,
};

export { FormValidationClass };
