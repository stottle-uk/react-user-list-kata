import React, { useState } from 'react';
import Form, { FormInputItem, FormStatus } from '../../shared/forms/Form';
import { User } from '../models/User';

interface OwnProps {
  user: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const UserProfileForm: React.FC<OwnProps> = ({ user, onSubmit, onCancel }: OwnProps) => {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    isSubmitting: false,
    isSubmitted: false,
    isDirty: false
  });
  const [formData, setFormData] = useState<User>(user);

  const formItems: FormInputItem[] = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'address', label: 'Address' },
    { name: 'county', label: 'County' },
    { name: 'country', label: 'Country' }
  ];

  const onFormSubmit = () => {
    setFormStatus({ ...formStatus, isSubmitting: true, isSubmitted: false, isDirty: true });
    onSubmit({ ...user, ...formData });
  };

  return user.firstName ? (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Modal title</p>
        <button className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        <Form initialFormData={user} formItems={formItems} formStatus={formStatus} onChange={setFormData} />
      </section>
      <footer className="modal-card-foot">
        <button className="button is-success" onClick={onFormSubmit}>
          Save changes
        </button>
        <button className="button" onClick={onCancel}>
          Cancel
        </button>
      </footer>
    </div>
  ) : (
    <span></span>
  );
};

export default UserProfileForm;
