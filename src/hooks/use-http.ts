import { useReducer } from "react";

export interface IOption {
  method?: "GET" | "POST" | "DELETE" | "PATCH";
  headers: HeadersInit;
  body?: { [key: string]: string };
  notJSONBody?: any; // when passing non-json data as body, data like form-data
}

export interface IResult {
  message: string;
  status: number;
  [key: string]: any;
}

interface IState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  result: IResult;
}

const initialState: IState = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  result: { message: "", status: 0 }, // 0 to indicate no status
};

interface IActions {
  type: "Loading" | "Error" | "Result" | "default";
  errorMessage?: string;
  result?: IResult;
}

function requestReducer(_: IState, action: IActions): IState {
  switch (action.type) {
    case "Loading":
      return { ...initialState, isLoading: true };
    case "Error":
      return {
        ...initialState,
        isLoading: false,
        isError: true,
        errorMessage: action.errorMessage || "Error completing request",
      };
    case "Result":
      return {
        ...initialState,
        result: action.result || {
          message: "Error completing request",
          status: 0,
        },
      };
    default:
      return initialState;
  }
}

function useRequest() {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  function reset() {
    dispatch({ type: "default" });
  }

  async function request(
    url: string,
    options: IOption,
    setJSONTypeHeader: boolean = true
  ) {
    dispatch({ type: "Loading" });

    try {
      const jsonTypeHeader = {
        "Content-Type": "Application/json",
        ...options.headers,
      };

      const resultJSON = await fetch(url, {
        method: options.method || "GET",
        headers: setJSONTypeHeader
          ? jsonTypeHeader
          : {
              ...options.headers,
            },
        body: options.notJSONBody || JSON.stringify(options.body),
      });

      const result = await resultJSON.json();

      dispatch({ type: "Result", result });
    } catch (err: any) {
      if (typeof err === "object" && "message" in err!) {
        dispatch({ type: "Error", errorMessage: err.message });
        return;
      }
      dispatch({ type: "Error" });
    }
  }

  const some: [
    (
      url: string,
      options: IOption,
      setJSONTypeHeader?: boolean
    ) => void | never,
    () => void,
    boolean,
    boolean,
    string | null,
    IResult
  ] = [
    request,
    reset,
    state.isLoading,
    state.isError,
    state.errorMessage,
    { ...state.result },
  ];

  return some;
}

export default useRequest;
