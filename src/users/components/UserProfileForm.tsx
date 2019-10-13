import React, { useState } from 'react';
import Form, { FormInputItem, FormStatus } from '../../shared/forms/Form';
import { User } from '../models/User';

interface OwnProps {
  user: User;
  formStatus: FormStatus;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const UserProfileForm: React.FC<OwnProps> = ({ user, formStatus, onSubmit, onCancel }: OwnProps) => {
  const [formData, setFormData] = useState<User>(user);

  const formItems: FormInputItem[] = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'address', label: 'Address' },
    { name: 'county', label: 'County' },
    { name: 'country', label: 'Country' }
  ];

  const onFormSubmit = () => onSubmit({ ...user, ...formData });

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{user.username}</p>
        <button className="delete" aria-label="close" onClick={onCancel}></button>
      </header>
      <section className="modal-card-body">
        <Form initialFormData={user} formItems={formItems} formStatus={formStatus} onChange={setFormData} />
      </section>
      <footer className="modal-card-foot">
        <fieldset disabled={formStatus.isSubmitting}>
          <button className="button is-success" onClick={onFormSubmit}>
            Save changes
          </button>
          <button className="button" onClick={onCancel}>
            Cancel
          </button>
        </fieldset>
      </footer>
    </div>
  );
};

export default UserProfileForm;
