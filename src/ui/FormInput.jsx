import { ErrorMessage } from "@hookform/error-message";

function FormInput({ label, type = "text", id, hookForm, errors }) {
  return (
    <div className="group relative">
      <input
        type={type}
        id={id}
        placeholder=" "
        className="w-full rounded-lg border-2 border-dark/80 bg-light px-4 py-3 font-roboto text-base outline-none invalid:border-red-500 focus:border-primary dark:border-light dark:bg-dark dark:focus:border-secondary"
        {...hookForm}
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-0 translate-x-3 translate-y-1/2 bg-light text-lg transition-all duration-200 ease-in-out  dark:bg-dark"
      >
        {label}
      </label>
      <ErrorMessage
        errors={errors}
        name={id}
        render={({ message }) => <p>{message}</p>}
      />
    </div>
  );
}

export default FormInput;
