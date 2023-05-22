import { useFormikContext, getIn } from "formik";
import DatePicker from "react-datepicker";
import Select from "react-select";
import OtpInput from "otp-input-react";
import { useDropzone } from "react-dropzone";

import { RenderIf } from "../../utils/index";
import {
  CALENDAR_ICON,
  DANGER_ICON_SVG,
  EYE_SLASH_SVG,
  EYE_SVG,
  UPLOAD_PNG,
} from "../../assets/images";
import { VALID_PASSWORD } from "constants/validationMessages";

import "./index.css";
import "react-datepicker/dist/react-datepicker.css";

export const CustomInput = ({
  icon,
  field,
  form: { touched, errors },
  className = "",
  inputClassName = "",
  errorClassName = "",
  label = "",
  name = "",
  inputId = "",
  withOutLabel = false,
  requiredField = false,
  showError = true,
  showEyeIcon = false,
  showPassword = false,
  setShowPassword,
  showDangerText = false,
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  return (
    <>
      <div
        id={showError && error && touch ? inputId : ""}
        className={`${className} each_input ${
          showError && error && touch ? "mb30" : ""
        } `}
        style={props.style}
      >
        {withOutLabel && (
          <label className="custom-label" htmlFor={name}>
            {label} {requiredField && <span className="mendatory_sign"></span>}
          </label>
        )}
        <div className="input_relative">
          <input
            className={
              "form-control " +
              ((showError || showDangerText) && error && touch
                ? "is-invalid"
                : "") +
              " " +
              inputClassName
            }
            {...field}
            {...props}
          />
          {showError && error && touch && (
            <div className={`invalid-feedback ${errorClassName}`}>{error}</div>
          )}
          <RenderIf isTrue={icon}>
            <img src={icon} className="input_icon" />
          </RenderIf>
          <RenderIf isTrue={showEyeIcon}>
            <img
              src={showPassword ? EYE_SVG : EYE_SLASH_SVG}
              className="pw_eye curser-pointer"
              alt="password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </RenderIf>
          <RenderIf isTrue={showDangerText}>
            <div className="d-flex pt-2">
              <img src={DANGER_ICON_SVG} className="pr-2" />

              <p className={`caution_text ${error && touch && "text-danger"}`}>
                {VALID_PASSWORD}
              </p>
            </div>
          </RenderIf>
        </div>
      </div>

      {/* <RenderIf isTrue={showEyeIcon}>
        <i
          className={`fa-solid ${
            showPassword ? "fa-eye" : "fa-eye-slash"
          } position-abs password-eye-icon`}
          onClick={() => setShowPassword(!showPassword)}
        />
      </RenderIf> */}
    </>
  );
};

export const CustomTextArea = ({
  field,
  form: { touched, errors },
  withOutLabel,
  className,
  textAreaClassName,
  textAreaId,
  requiredField,
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  return (
    <div className={className + " "} style={props.style}>
      {!withOutLabel && (
        <span className="custom-label">
          {props.label}{" "}
          {requiredField && <span className="mendatory_sign">*</span>}
        </span>
      )}
      <textarea
        id={textAreaId}
        className={
          "form-control " +
          textAreaClassName +
          " " +
          (error && touch && "is-invalid")
        }
        {...field}
        {...props}
      ></textarea>
      {error && touch && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export const CustomDropdown = ({
  field,
  form: { touched, errors },
  withOutLabel,
  className,
  selectClassName,
  requiredField,
  placeholder,
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  return (
    <>
      <div className={className + " "} style={props.style}>
        {!withOutLabel && (
          <span className="custom-label">
            {props.label}{" "}
            {requiredField && <span className="mendatory_sign">*</span>}
          </span>
        )}

        <select
          className={
            "form-select form-control custom-select " +
            selectClassName +
            (error && touch && " is-invalid")
          }
          {...field}
          {...props}
          onChange={(e) => {
            field.onChange(e);
            if (props.handleChange) {
              props.handleChange(e);
            }
          }}
        >
          {placeholder && (
            <option value="" disabled selected>
              {placeholder}
            </option>
          )}
          {props.data &&
            props.data.length &&
            props.data.map((i, idx) => (
              <option key={idx} value={i.value}>
                {i.label}
              </option>
            ))}
        </select>
        {error && touch && <div className="invalid-feedback">{error}</div>}
      </div>
    </>
  );
};

export const CustomReactSelect = ({
  field,
  options,
  isMulti = false,
  form: { touched, errors },
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  const { setFieldValue } = useFormikContext();
  const onChange = (option) => {
    setFieldValue(
      field.name,
      isMulti ? option.map((item) => item.value) : option.value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <>
      <div className={props.styleData + " "} style={props.style}>
        {!props.withOutLabel && (
          <span className="custom-label">
            {props.label}{" "}
            {props.requiredField && <span className="mendatory_sign">*</span>}
          </span>
        )}
        <Select
          className={" " + (error && touch && "is-invalid")}
          name={field.name}
          value={getValue()}
          onChange={onChange}
          placeholder={props.placeholder}
          options={options}
          isMulti={isMulti}
        />
        {error && touch && <div className="invalid-feedback">{error}</div>}
      </div>
    </>
  );
};

export const CustomRadioButton = ({
  field,
  // form: { touched, errors },
  withOutLabel,
  className = "",
  inputClassName = "",
  requiredField,
  labelClassName = "",
  updatedName = "",
  onChange,
  ...props
}) => {
  // const touch = getIn(touched, field.name);
  // const error = getIn(errors, field.name);
  const { setFieldValue } = useFormikContext();
  return (
    <>
      <div className={className + " form-check"}>
        <input
          type={"radio"}
          className={"form-check-input " + inputClassName}
          id={props.id || props.label}
          name={updatedName || field.name}
          defaultChecked={props.defaultChecked}
          value={props.val}
          onChange={() => {
            if (onChange) {
              onChange();
            } else {
              setFieldValue(field.name, props.val);
            }
          }}
        />
        {!withOutLabel && (
          <label
            className={`form-check-label general-p-text ${labelClassName}`}
            htmlFor={props.id || props.label}
          >
            {props.label}{" "}
            {requiredField && <span className="mendatory_sign"></span>}
          </label>
        )}
      </div>

      {/* {props.lastRadioButton && error && touch && <div className="invalid-feedback">{error}</div>} */}
    </>
  );
};

export const CustomCheckbox = ({
  field,
  form: { touched, errors },
  className = "",
  mainClassName = "",
  inputClassName = "",
  showError = true,
  handleChange,
  ...props
}) => {
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  const { setFieldValue } = useFormikContext();
  return (
    <div className={mainClassName}>
      <div className={className}>
        <input
          name={props.name}
          id={props.id}
          type="checkbox"
          className={`form-check-input me-2 ${inputClassName}`}
          checked={props?.val}
          onChange={() => {
            if (handleChange) {
              return handleChange(setFieldValue);
            }
            return setFieldValue(field.name, !props.val);
          }}
        />
        <label className="form-check-label general-p-text" htmlFor={props.id}>
          {props.label}
        </label>
      </div>
      {showError && error && touch && (
        <div className="invalid-feedback">{error}</div>
      )}
    </div>
  );
};

export const CustomDateInputLog = ({
  field,
  form: { touched, errors },
  withOutLabel,
  className = "",
  dateFormat = "dd/MM/yyyy",
  maxDate = new Date(),
  showCalenderIcon,
  calendarClassName = "",
  onchangeDateHandle,
  disabled,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  const showMonth = props.showMonth;
  const showYear = props.showYear;
  return (
    <div className={`form-group ${className}`}>
      {!withOutLabel && (
        <label htmlFor className="">
          {props.label}
        </label>
      )}
      <div
        className="input-group mb-0 position-relative"
        disabled={disabled}
        data-value="parent"
      >
        <DatePicker
          data-value="child"
          dateFormat={dateFormat}
          autoComplete="off"
          // className={
          //   // "form-control shadow-none curser-pointer " +
          //   error && touch && "is-invalid"
          // }
          {...field}
          {...props}
          placeholderText={props.placeholder}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setFieldValue(field.name, val);
            if (onchangeDateHandle) onchangeDateHandle();
          }}
          showMonthDropdown={showMonth}
          showYearDropdown={showYear}
          dropdownMode="select"
          maxDate={maxDate}
          closeCalendar={true}
        />
        <RenderIf isTrue={showCalenderIcon}>
          <img
            src={CALENDAR_ICON}
            className={`${calendarClassName} curser-pointer`}
            alt="calendar"
          />
        </RenderIf>
      </div>
      {error && touch && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export const CustomTimeInputLog = ({
  field,
  form: { touched, errors },
  withOutLabel,
  className = "",
  dateFormat = "h:mm aa",
  handleChange = false,
  timeIntervals = 15,
  value,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  const showMonth = props.showMonth;
  const showYear = props.showYear;
  return (
    <div className={`form-group ${className}`}>
      {!withOutLabel && (
        <label htmlFor className="small text-secondary fw-600 pb-3">
          {props.label}
        </label>
      )}
      <div className="input-group mb-0">
        <DatePicker
          dateFormat={dateFormat}
          autoComplete="off"
          className={
            "form-control shadow-none  " + (error && touch && "is-invalid")
          }
          {...field}
          {...props}
          time
          placeholderText={props.placeholder}
          selected={value || (field.value && new Date(field.value)) || null}
          onChange={(val) => {
            if (handleChange) {
              return handleChange(val);
            }
            return setFieldValue(field.name, val);
          }}
          showMonthDropdown={showMonth}
          showYearDropdown={showYear}
          dropdownMode="select"
          maxDate={new Date()}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={timeIntervals}
          timeCaption="Time"
        />
      </div>
      {error && touch && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export const CustomFileInput = ({
  field,
  label = "",
  name = "",
  text = "Upload File",
  form: { touched, errors },
  maxFileSize,
  minFileSize,
  placeholder = "",
  acceptFormat = {
    "image/jpeg": [],
    "image/png": [],
    "application/pdf": [],
  },
  fileRejectionError = "",
  withOutLabel = false,
  requiredField = false,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: acceptFormat,
      onDrop: (acceptedFiles) => {
        setFieldValue(field.name, acceptedFiles);
      },
      maxSize: maxFileSize,
      minSize: minFileSize,
      multiple: false,
    });

  const file = acceptedFiles.map((file) => {
    return file.name;
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <div key={file.path}>
      {errors.map((e) => (
        <div className="invalid-feedback" key={e.code}>
          {fileRejectionError ? fileRejectionError : e.message}
        </div>
      ))}
    </div>
  ));

  return (
    <div className="cursor-pointer">
      {!withOutLabel && (
        <label className="custom-label mb-1" htmlFor={name}>
          {label} {requiredField && <span className="mendatory_sign"></span>}
        </label>
      )}
      <div {...getRootProps({ className: "file-dummy" })}>
        <img src={UPLOAD_PNG} alt="" />
        <p className="success mt-2">{text}</p>
        <input
          {...field}
          {...props}
          {...getInputProps}
          style={{ display: "none" }}
          onChange={() => {
            setFieldValue(field.name, acceptedFiles);
          }}
        />
        {placeholder && <div className="red-Alert">{placeholder}</div>}
        <p className="text-green mt-2">{file}</p>
      </div>
      {fileRejectionItems}
      {error && touch && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export const CustomOtpComponent = ({ ...props }) => {
  return <OtpInput {...props} />;
};

export const handleDatePicker = () => {
  return "dd/MM/yyyy";
};
