import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

function InputField({
  labelName,
  fieldType,
  fieldPlaceholder,
  fieldName,
  Icon,
  toggle,
  setToggle,
  half
}) {
  return (
    <div className={`mb-8 ${half && 'w-[46%]'}`}>
      <label
        htmlFor={fieldName}
        className="text-gray-600 text-sm font-['Roboto'] font-medium mb-1 block">
        {labelName}
      </label>
      <div
        className={`flex justify-between items-center shadow bg-slate-100 w-full p-2 rounded mb-1 `}>
        <Field
          type={fieldType}
          placeholder={fieldPlaceholder}
          name={fieldName}
          autoComplete="off"
          className={`flex-1 h-full outline-none border-none w-full bg-transparent text-sm`}
        />
        {Icon && (
          <Icon
            className={`cursor-pointer ${!toggle ? 'text-gray-400' : 'text-gray-800'} ml-2`}
            onClick={() => {
              setToggle(!toggle);
            }}
          />
        )}
      </div>
      <span className="h-1 block text-xs text-red-600">
        <ErrorMessage name={fieldName} component="span" />
      </span>
    </div>
  );
}

InputField.propTypes = {
  labelName: PropTypes.string,
  fieldType: PropTypes.string,
  fieldPlaceholder: PropTypes.string,
  fieldName: PropTypes.string,
  Icon: PropTypes.any,
  toggle: PropTypes.bool,
  half: PropTypes.bool,
  setToggle: PropTypes.any
};

export default InputField;
