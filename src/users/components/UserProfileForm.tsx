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

  const formItems: FormInputItem[] = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'address', label: 'Address' },
    { name: 'county', label: 'County' },
    { name: 'country', label: 'Country' }
  ];

  const onFormSubmit = (user: User) => {
    setFormStatus({ ...formStatus, isSubmitting: true, isSubmitted: false, isDirty: true });
    onSubmit(user);
    // .pipe(tap(() => setFormStatus({ ...formStatus, isSubmitting: false, isSubmitted: true })))
    // .subscribe();
  };

  console.log(user);

  return user.firstName ? (
    <Form
      initialFormData={user}
      formItems={formItems}
      formStatus={formStatus}
      onCancel={onCancel}
      onSubmit={onFormSubmit}
    />
  ) : (
    <span></span>
  );
};

export default UserProfileForm;
