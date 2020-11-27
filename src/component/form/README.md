## Introduction to `GeneralizedForm`

### How to use:

`GeneralizedForm` makes automate manual form config, and allow your own customization to some extend.

`GeneralizedForm` accepts:
  
* shouldUseInitialData: whether form has initial values or not.
* formShape: The shape of the form, of type `Array<looseFieldData>` (check `data.flow.js`)
* validationObject: yup validation object, with key being the key of each field in `formShape`
* shouldDisplayButton: whether to display SubmitButton
* SubmitButton: custom component to submit Form. props passed to Button include:
    * onPress: what to do when submit form
    * valid: is current form valid
* onSubmit: what to do when submit form, take in values from form. Default is console.log values

* If you want to use Custom Component, without fixing it to `GeneralizedForm`,
pass a ReactComponent `CustomElement` in `looseFieldData`. CustomElement will have props as `params` in formShape,
and manually handle formik in `formik` props.

* If you want to have CustomComponent but not related to Form (ex: decorator, ads), pass in `optOut`, 
that component will not appear in form values when submit.

* To write `validateObject`, it is a yup object, with keys as key in formShape. 
`validationObject` will override existing validation if they have the same key.


### How it works

* `GeneralizedForm` normalize formShape, and extract initialValue in `dataNormalizeClass`.
* `GeneralizedForm` create validationObject in `FormValidationClass`.
* `GeneralizedForm` render UI in `formUI`.
* Use `formik` and `yup` to control all UI.


### How to extend:

* Change SubmitButton: pass a `ReactComponent` to `SubmitButton` props of `GeneralizedForm`
* Change how to handle form submit: pass a function in `onSubmit` props of `GeneralizedForm`
* More UI: add to `FormUI` Component. 
* Some useful formik:
    * formik.errors[key]: Get error from key
    * formik.values[key]: Get value from key
    * formik.touched[key]: Get touched from key
