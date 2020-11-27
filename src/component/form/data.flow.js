export type looseFieldData = {
  display?: boolean, // should component be displayed on screen
  inputKey?: string, // key of input, keep same name for compatibility with older version
  inputType?: string, // type as in fieldType
  inputTitle?: string, // title of input
  isRequired?: boolean, // if required, value must not be empty
  initialValue?: string, // value of form when first rendered.
  pickerData?: Array<>, // data for picker type of input
  pickerKeyDisplay?: string, // key to extract display data from pickerData
  pickerKeySave?: string, // key to extract display data from pickerData
  disabled?: boolean, // should component be interacted with?
  isPickerEditable?: boolean, // same as disabled, keep for compatibility
  CustomElement?: any, // CustomElement to render
  params?: {}, // additional props passed to components
  iconName?: string, // self-explanatory
  needWarning?: boolean, //  self-explanatory
  shouldRenderBorder?: boolean, // self-explanatory
  // opt out component must have CustomElement, and doesn't have any form attribute
  optOut?: boolean, // if true, component will not be included in formik value.
  // Must be used with CustomElement.
};
export type strictFieldData = {
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
  optOut: boolean,
};
