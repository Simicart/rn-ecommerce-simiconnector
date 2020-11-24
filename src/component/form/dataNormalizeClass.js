import { makeRandomString } from '../../utils/makeRandomString.js';
import type { looseFieldData, strictFieldData } from './data.flow.js';
import { fieldType } from './fieldType.js';

class DataNormalizeClass {
  static normalizeFormFieldData = (
    data: looseFieldData,
    _initialValue = ''
  ): strictFieldData => {
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
      optOut = false,
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
      optOut: optOut,
    };
  };
  static serialNormalizeFields = (
    data: Array<looseFieldData>
  ): Array<strictFieldData> => {
    return data
      .map((fieldData) =>
        this.normalizeFormFieldData(
          fieldData,
          fieldData.inputKey ? fieldData.initialValue : ''
        )
      )
      .filter((fieldData) => fieldData.display === true);
  };

  static getInitialValues = (
    data: Array<strictFieldData>,
    shouldUseInitialData: boolean
  ): { [string]: string } => {
    const returnObject = {};
    data.forEach((field) => {
      if (field.optOut === true) {
        return;
      }
      if (shouldUseInitialData) {
        returnObject.key = field?.initialValue ?? '';
      } else {
        returnObject[field.key] = '';
      }
    });
    return returnObject;
  };
}

export { DataNormalizeClass };
