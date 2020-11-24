import { Formik, FormikProps, FormikValues } from 'formik';
import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import * as yup from 'yup';
import md5 from 'md5';

import { DefaultSubmitButton } from './DefaultSubmitButton.js';
import { defaultSubmitHandler } from './defaultSubmitHandler.js';
import { DataNormalizeClass } from './dataNormalizeClass.js';
import { FormValidationClass } from './formValidationClass.js';
import { FormUI } from './FormUI.js';
import { isDeeplyEqual } from '../../utils/isObjectDeeplyEqual.js';

import type { looseFieldData, strictFieldData } from './data.flow.js';

export const GeneralizedForm = (props: FormProps) => {
  const shouldUseInitialData = props?.shouldUseInitialData ?? true;
  const [formShape, setFormShape] = useState(props?.formShape ?? []);

  const [customizedValidationObject, setValidationObject] = useState(
    props?.validationObject ?? yup.object()
  );
  const [focusIndex, setFocusIndex] = useState(null);

  if (!isDeeplyEqual(formShape, props?.formShape ?? [])) {
    setFormShape(props?.formShape ?? []);
  }
  if (
    !isDeeplyEqual(
      customizedValidationObject,
      props?.validationObject ?? yup.object()
    )
  ) {
    setValidationObject(props?.validationObject ?? yup.object());
  }

  const normalizedFieldData = useMemo(
    () => DataNormalizeClass.serialNormalizeFields(formShape),
    [formShape]
  );

  const initialValues = useMemo(
    () =>
      DataNormalizeClass.getInitialValues(
        normalizedFieldData,
        shouldUseInitialData
      ),
    [normalizedFieldData, shouldUseInitialData]
  );

  const validationSchema = useMemo(
    () =>
      FormValidationClass.getValidationSchema(
        normalizedFieldData,
        customizedValidationObject
      ),
    [normalizedFieldData, customizedValidationObject]
  );

  const SubmitButton = props?.SubmitButton ?? DefaultSubmitButton;
  const submitHandler = props?.onSubmit ?? defaultSubmitHandler;

  const _fieldNames = normalizedFieldData
    .filter((field) => field.optOut === false)
    .map((field: strictFieldData) => field.key);

  const [fieldNames, setFieldNames] = useState(_fieldNames);
  if (!isDeeplyEqual(fieldNames, _fieldNames)) {
    setFieldNames(_fieldNames);
  }

  const handleInputChange = useCallback(
    (key: string) => {
      const keyIndex = fieldNames.indexOf(key);
      if (keyIndex !== -1 && keyIndex + 1 < fieldNames.length) {
        setFocusIndex(fieldNames[keyIndex + 1]);
      } else {
        setFocusIndex(null);
      }
    },
    [fieldNames]
  );

  return (
    <ScrollView>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(formik: FormikProps<FormikValues>) => {
          return (
            <View>
              {normalizedFieldData.map((data: strictFieldData) => {
                return (
                  <FormUI
                    data={data}
                    formik={formik}
                    isFocused={focusIndex === data.key}
                    handleInputChange={handleInputChange}
                    key={md5(JSON.stringify(data))}
                  />
                );
              })}
              <SubmitButton title={'Submit'} onPress={formik.handleSubmit} />
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

type FormProps = {
  shouldUseInitialData?: boolean,
  formShape: Array<looseFieldData>,
  validationObject?: any,
  shouldDisplayButton?: boolean,
  SubmitButton?: ReactElement<{
    title: string,
    onPress: (submitValues: {}) => any,
  }>,
  onSubmit?: (submitValues: {}) => any,
};
