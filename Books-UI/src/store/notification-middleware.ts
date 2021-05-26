import { toast } from 'react-toastify';

const notificationMiddlware = () => next => action => {
  if (action.error === true) {
    toast.error('404 not found');
  }
  next(action);
};

export default notificationMiddlware;
