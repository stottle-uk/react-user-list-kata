import React from 'react';

export interface FormInputItem {
  name: string;
  label: string;
  type?: string;
}

export interface FormStatus {
  isSubmitting: boolean;
  isSubmitted: boolean;
  isDirty: boolean;
}

interface OwnProps<T> {
  initialFormData: T;
  formItems: FormInputItem[];
  formStatus: FormStatus;
  onChange: (data: T) => void;
}

const Form = <T extends {}>({ initialFormData, formItems, formStatus, onChange }: OwnProps<T>) => {
  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...initialFormData, [e.currentTarget.name]: e.currentTarget.value });

  const renderFormItem = (item: FormInputItem) => (
    <div key={item.name} className="field">
      <label className="label" htmlFor={item.name}>
        {item.label}
      </label>
      <div className="control">
        <input
          id={item.name}
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
      <fieldset disabled={formStatus.isSubmitting}>{formItems.map(renderFormItem)}</fieldset>
    </form>
  );
};

export default Form;
