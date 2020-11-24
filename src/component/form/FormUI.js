import React, { useCallback } from 'react';
import { Text, TextInput } from 'react-native';
import { BasicText } from './BasicComponents/BasicText.js';
import type { strictFieldData } from './data.flow.js';
import { FormikProps, FormikValues } from 'formik';
import { fieldType } from './fieldType.js';

const _RenderFormUIClass = (props: RenderProps) => {
  const { data, formik, isFocused, handleInputChange } = props;
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
    optOut,
  } = data;

  const handleSubmitInput = useCallback(() => handleInputChange(key), [
    handleInputChange,
    key,
  ]);

  // optOut Component doesn't interact with form
  if (optOut) {
    return <CustomElement key={key} data={data} {...data.params} />;
  }
  // Elements must call handleSubmitInput to switch focus to next element.
  // use isFocus prop to manually focus element in component
  // User handle formik
  if (CustomElement) {
    return (
      <CustomElement
        key={key}
        formik={formik}
        data={data}
        isFocused={isFocused}
        {...data.params}
      />
    );
  }

  switch (type) {
    case fieldType.TEXT:
    case fieldType.EMAIL:
      return (
        <BasicText
          key={key}
          inputType={type}
          editable={!isDisabled}
          onChangeText={formik.handleChange(key)}
          onBlur={formik.handleBlur(key)}
          value={formik.values[key]}
          returnKeyType={'next'}
          onSubmitEditing={handleSubmitInput}
          isFocused={isFocused}
        />
      );
    case fieldType.PASSWORD:
      return (
        <BasicText
          key={key}
          inputType={type}
          editable={!isDisabled}
          onChangeText={formik.handleChange(key)}
          onBlur={formik.handleBlur(key)}
          value={formik.values[key]}
          secureTextEntry={true}
          returnKeyType={'next'}
          onSubmitEditing={handleSubmitInput}
          isFocused={isFocused}
        />
      );

    default:
      return <Text key={key}>{`Not implemented ${type}`}</Text>;
  }
};

type RenderProps = {
  data: strictFieldData,
  formik: FormikProps<FormikValues>,
  isFocused: boolean,
  handleInputChange: (key: string) => any,
};

export const FormUI = React.memo(_RenderFormUIClass);
