import { createContext, useState } from 'react';
import { CrudType, Utils } from 'shared/enum';
import { AlertModel, LayoutProps } from '../models';

const initialState: AlertModel = {
  title: Utils.TITLE_SUCCESS,
  message: '',
  mode: CrudType.CLOSE
};

export const AlertContext = createContext({
  alert: initialState,
  showAlert: (params: AlertModel) => {},
  hideAlert: () => {},
  cancelAction: false,
  saveAction: false
});

export function AlertProvider ({ children } : LayoutProps) {
  const [alert, setAlert] = useState<AlertModel>({
    title: Utils.TITLE_SUCCESS,
    message: '',
    mode: CrudType.CLOSE
  });

  const [cancelAction, setCancelAction] = useState(false);
  const [saveAction, setSaveAction] = useState(false);

  const showAlert = (alert : AlertModel) => {
    setCancelAction(false);
    setSaveAction(false);
    setAlert((prevState) => ({
      ...prevState,
      ...alert
    }));
  };

  const hideAlert = () => {
    switch (alert.mode) {
      case CrudType.CLOSE:
        setCancelAction(true);
        break;
      case CrudType.SAVE:
        setSaveAction(true);
        break;
      default:
        break;
    }
    setAlert({
      title: Utils.TITLE_SUCCESS,
      message: '',
      mode: CrudType.CLOSE
    })
  }

  return (
    <AlertContext.Provider
      value={{
        alert,
        showAlert,
        hideAlert,
        cancelAction,
        saveAction
      }}
    >
      {children}
    </AlertContext.Provider>
  )
};