import { toast } from 'react-toastify';

export const showToast = (type, title, message) => {
  const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  };

  const fullMessage = `${title ? `${title}: ` : ''}${message}`;

  switch (type) {
    case 'success':
      toast.success(fullMessage, options);
      break;
    case 'error':
      toast.error(fullMessage, options);
      break;
    case 'info':
      toast.info(fullMessage, options);
      break;
    case 'warning':
      toast.warn(fullMessage, options);
      break;
    default:
      toast(fullMessage, options);
      break;
  }
};
