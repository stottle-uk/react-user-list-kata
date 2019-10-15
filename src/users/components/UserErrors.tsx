import React from 'react';

interface OwnProps {
  retry?: () => void;
  retryText?: string;
  errors: any[];
}

const UserErrors: React.FC<OwnProps> = ({ errors, retry, retryText }) =>
  !!errors.length ? (
    <article className="message is-danger is-in-modal">
      <div className="message-body">
        {errors[errors.length - 1] ? errors[errors.length - 1].data : 'Unexpected Error (is the API running?)'}
        {!!retry && <b onClick={retry}>&nbsp;{retryText}</b>}
      </div>
      {/* todo: show something nice when max retries fails */}
    </article>
  ) : (
    <></>
  );

export default UserErrors;
