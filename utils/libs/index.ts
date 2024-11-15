import isEmail from "validator/lib/isEmail";
import Toast from "react-native-toast-message";

export const validateEmail = (value: string) => {
  return isEmail(value) === true
    ? null
    : "Email format is invalid";
}


export const handleError = (error: any, formInfo?: any) => {
  if (Number(error?.response?.status) !== 401) {

    if (error?.response?.data?.errors) {
      Toast.show({
        type: "error",
        // text1: "Error",
        text2:
          error?.response?.data?.errors[0]?.message !== undefined
            ? error?.response?.data?.errors[0]?.message
            : error?.response?.data?.errors[0],
      });
    } else if (error?.response?.data?.message) {
      Toast.show({
        type: "error",
        // text1: "Error",
        text2: error?.response?.data?.message,
      });
    } else {
      Toast.hide();
      if (formInfo !== undefined) {
        Toast.show({
          type: "error",
          // text1: "Error",
          text2: `Please provide ${formInfo?.connect_form[0]?.label?.toLowerCase()}`,
        });
      } else {
        Toast.show({
          type: "error",
          // text1: "Error",
          text2: `${error?.message ? error?.message : "An error occured"}`,
        });
      }
    }

  } else {
    Toast.show({
      type: 'error',
      // text1: 'Error',
      text2: `Your session expired, kindly login`
    });
  }
};
