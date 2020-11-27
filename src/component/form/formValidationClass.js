import * as yup from 'yup';
import StringSchema from 'yup/lib/string.js';
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
      // pattern: /^.*$/,

      message: 'Not a valid password',
    },
  ],
};

class FormValidationClass {
  static getObjectOfDefaultFieldValidation = (
    fieldData: strictFieldData
  ): { [string]: StringSchema } => {
    console.log('re run');
    const { key, type, isRequired } = fieldData;
    const object = {
      [key]: yup.string(),
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
    const match_pattern = matchPattern[type];

    if (match_pattern) {
      match_pattern.forEach((slug) => {
        if (isRequired) {
          object[key] = object[key].matches(slug.pattern, slug.message);
        } else {
          // //   if optional, can be no fill or fill in correct format
          object[key] = object[key].test(
            'key is empty or correctly formatted',
            slug.message,
            (value: string) => value === '' || slug.pattern.test(value)
          );
        }
      });
    }
    return object;
  };

  static getFullObjectOfDefaultValidation = (
    data: Array<strictFieldData>
  ): { [string]: StringSchema } => {
    let objectOfValidation = {};
    data.forEach((field) => {
      if (!field.optOut) {
        Object.assign(
          objectOfValidation,
          this.getObjectOfDefaultFieldValidation(field)
        );
      }
    });
    return objectOfValidation;
  };

  static getObjectOfCustomValidation = (
    customValidation = {}
  ): { [string]: StringSchema } => {
    return customValidation;
  };

  static getValidationSchema = (
    data: Array<strictFieldData>,
    customValidation: ?{ [string]: StringSchema }
  ): YupObject => {
    // return this.getCustomValidationObject(customValidation)
    //     .concat(this.getValidationObject(data));

    const customObject = this.getObjectOfCustomValidation(customValidation);
    const defaultObject = this.getFullObjectOfDefaultValidation(data);

    console.log('234234');
    console.log(Object.keys(customObject), Object.keys(defaultObject));

    Object.keys(customObject).forEach((key) => {
      if (defaultObject.hasOwnProperty(key)) {
        defaultObject[key] = customObject[key];
      } else {
        defaultObject[key] = customObject[key];
      }
    });

    return yup.object().shape(defaultObject);
  };
}

type YupObject = typeof ObjectSchema;

type patternErrorBlob = {
  pattern: RegExp,
  message: string,
};

export { FormValidationClass };
