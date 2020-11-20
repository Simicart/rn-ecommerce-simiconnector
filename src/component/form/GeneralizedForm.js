import { Formik, FormikProps, FormikValues } from 'formik';
import React, {
  ReactComponentElement,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import { isObjectTruthy } from '../../utils/isObjectTruthy.js';
import { makeRandomString } from '../../utils/makeRandomString.js';

export type looseFieldData = {
  display?: boolean,
  inputKey?: string,
  inputType?: string,
  inputTitle?: string,
  isRequired?: boolean,
  initialValue?: string,
  pickerData?: Array<>,
  pickerKeyDisplay?: string,
  pickerKeySave?: string,
  disabled?: boolean,
  isPickerEditable?: boolean,
  CustomElement?: any,
  params?: {},
  iconName?: string,
  needWarning?: boolean,
  shouldRenderBorder?: boolean,
};
type strictFieldData = {
  display: boolean,
  key: string,
  type: string,
  title: string,
  isRequired: boolean,
  initialValue: string,
  picker_data: Array<>,
  pickerKeyForDisplay: string,
  pickerKeyForSave: string,
  isDisabled: boolean,
  isPickerEditable: boolean,
  CustomElement: any,
  params: {},
  iconName: string,
  needWarning: boolean,
  shouldRenderBorder: boolean,
};

type patternErrorBlob = {
  pattern: RegExp,
  message: string,
};

const errorMessageForRequiredField = 'This field is required';
const initialErrorDisplayTime = 1000;

const matchPattern: { [string]: Array<patternErrorBlob> } = {
  email: [
    {
      pattern: /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/,
      message: 'Not a valid email',
    },
  ],
};

export const fieldType = {
  TEXT: 'text',
  PASSWORD: 'password',
};

type FormProps = {
  initialData?: { [string]: string },
  shouldUseInitialData?: boolean,
  formShape: Array<looseFieldData>,
  validationObject?: any,
  SubmitButton?: ReactElement<{
    title: string,
    onPress: (submitValues: {}) => any,
  }>,
  onSubmit?: (submitValues: {}) => any,
};

export const GeneralizedForm = (props: FormProps) => {
  const [shouldUseInitialData] = useState(props?.shouldUseInitialData ?? true);
  const [listRefs, setListRefs] = useState([]);
  const formShape = props?.formShape ?? [];
  const customizedValidationObject = props?.validationObject ?? yup.object();

  const SubmitButton = props?.SubmitButton ?? Button;

  const normalizeFormFieldData = useCallback(
    (data: looseFieldData, _initialValue = ''): strictFieldData => {
      const {
        display = true,
        inputKey: key = makeRandomString(5),
        inputType: type = fieldType.TEXT,
        inputTitle: title = '',
        isRequired = false,
        initialValue = _initialValue,
        pickerData: picker_data = [],
        pickerKeyDisplay: pickerKeyForDisplay = '',
        pickerKeySave: pickerKeyForSave = '',
        disabled: isDisabled = false,
        isPickerEditable = true,
        CustomElement = null,
        params = {},
        iconName = '',
        needWarning = false,
        shouldRenderBorder = false,
      } = data;

      return {
        display: display,
        key: key,
        type: type,
        title: title,
        isRequired: isRequired,
        initialValue: initialValue,
        picker_data: picker_data,
        pickerKeyForDisplay: pickerKeyForDisplay,
        pickerKeyForSave: pickerKeyForSave,
        isDisabled: isDisabled,
        isPickerEditable: isPickerEditable,
        CustomElement: CustomElement,
        params: params,
        iconName: iconName,
        needWarning: needWarning,
        shouldRenderBorder: shouldRenderBorder,
      };
    },
    []
  );

  const serialNormalizeFields = useCallback((data: Array<looseFieldData>) => {
    return data
      .map((fieldData) =>
        normalizeFormFieldData(
          fieldData,
          fieldData.inputKey ? fieldData.initialValue : ''
        )
      )
      .filter((fieldData) => fieldData.display === true);
  }, []);

  const getInitialValues = useCallback(
    (data: Array<strictFieldData>, keyName = 'key') => {
      const returnObject = {};
      data.forEach((field) => {
        if (shouldUseInitialData) {
          returnObject[field[keyName]] = field?.initialValue ?? '';
        } else {
          returnObject[field.key] = '';
        }
      });
      return returnObject;
    },
    []
  );

  const getFieldValidationObject = useCallback((fieldData: strictFieldData) => {
    const { key, isRequired, isDisabled, type } = fieldData;
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
  }, []);

  const getValidationObject = (data: Array<strictFieldData>) => {
    let validationSchema = yup.object();
    data.forEach(
      (field) =>
        (validationSchema = validationSchema.concat(
          getFieldValidationObject(field)
        ))
    );
    return validationSchema;
  };

  const getCustomValidationObject = useCallback((customValidation) => {
    return customValidation ?? yup.object();
  });

  const getValidationSchema = (
    data: Array<strictFieldData>,
    customValidation
  ) => {
    return getValidationObject(data).concat(
      getCustomValidationObject(customValidation)
    );
  };

  const renderFieldUI = (fieldData: strictFieldData, formik) => {
    const {
      key,
      isDisabled,
      isRequired,
      type,
      iconName,
      initialValue,
      isPickerEditable,
      display,
      needWarning,
      params,
      picker_data,
      pickerKeyForDisplay,
      pickerKeyForSave,
      shouldRenderBorder,
      title,
      CustomElement,
    } = fieldData;

    const cleanUp = (key: string): void => {
      formik.setFieldTouched(key, false);
      formik.setFieldError(key, '');
    };

    switch (type) {
      case fieldType.TEXT:
        return (
          <TextInput
            key={key}
            inputType={type}
            editable={!isDisabled}
            onChangeText={formik.handleChange(key)}
            onBlur={formik.handleBlur(key)}
            value={formik.values[key]}
          />
        );
      default:
        return <Text>{`Not implemented ${type}`}</Text>;
    }
  };

  const normalizedFieldData = serialNormalizeFields(formShape);
  const initialValues = getInitialValues(normalizedFieldData);
  const validationSchema = getValidationSchema(
    normalizedFieldData,
    customizedValidationObject
  );

  const defaultSubmitHandler = (x) => {
    console.log(JSON.stringify(x, null, 2));
  };
  const submitHandler = props?.onSubmit ?? defaultSubmitHandler;

  return (
    <ScrollView>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(formik: FormikProps<FormikValues>) => {
          // console.log(JSON.stringify(validationSchema.fields, null, 2));
          return (
            <View>
              {normalizedFieldData.map((data) => renderFieldUI(data, formik))}
              <SubmitButton title={'Submit'} onPress={formik.handleSubmit} />
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};
