import React, { useState } from 'react';

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
  onSubmit: (user: T) => void;
  onCancel: () => void;
}

const Form = <T extends {}>({ initialFormData, formItems, formStatus, onSubmit, onCancel }: OwnProps<T>) => {
  const [formData, setFormData] = useState<T>(initialFormData);

  const onChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [field]: e.currentTarget.value });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
          defaultValue={(formData as any)[item.name]}
          name={item.name}
          onChange={onChange(item.name)}
          disabled={formStatus.isSubmitting}
          required
        />
      </div>
    </div>
  );

  const renderButtons = () => (
    <div className="field is-grouped">
      <div className="control">
        <button className="button is-link" type="submit">
          Save
        </button>
      </div>
      <div className="control">
        <button className="button is-text" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={onFormSubmit}>
      {formItems.map(renderFormItem)}
      {renderButtons()}
    </form>
  );
};

export default Form;
