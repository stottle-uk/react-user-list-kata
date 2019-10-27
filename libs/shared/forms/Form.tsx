import React from 'react';

export interface FormInputItem {
  name: string;
  label: string;
  type?: string;
}

export interface FormItemData extends Dictionary<string> {}

interface OwnProps<T> {
  initialFormData: T;
  formItems: FormInputItem[];
  onChange: (data: FormItemData) => void;
}

const Form = <T extends {}>({
  initialFormData,
  formItems,
  onChange
}: OwnProps<T>) => {
  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ [e.currentTarget.name]: e.currentTarget.value });

  const renderFormItem = (item: FormInputItem) => (
    <div key={item.name} className="field">
      <label className="label" htmlFor={item.name}>
        {item.label}
      </label>
      <div className="control">
        <input
          id={item.name}
          data-e2e={`form-input-${item.name}`}
          className="input"
          type={item.type || 'text'}
          defaultValue={(initialFormData as any)[item.name]}
          name={item.name}
          onChange={onFieldChange}
          required
        />
      </div>
    </div>
  );

  return (
    <form>
      <fieldset>{formItems.map(renderFormItem)}</fieldset>
    </form>
  );
};

export default Form;
