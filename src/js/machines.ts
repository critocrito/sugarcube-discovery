import {assign, Machine} from "xstate";

interface PreservationStateSchema {
  states: {
    idle: {};
    select: {};
    loading: {};
    success: {};
    failure: {};
  };
}

interface PreservationContext {
  error?: {message: string};
  success?: {message: string};
}

type PreservationEvent =
  | {type: "PRESERVE"}
  | {type: "SEND"}
  | {type: "CANCEL"}
  | {type: "RETRY"};

export const preservationMachine = Machine<
  PreservationContext,
  PreservationStateSchema,
  PreservationEvent
>({
  id: "preserve",
  initial: "idle",
  context: {
    error: undefined,
    success: undefined,
  },
  states: {
    idle: {
      on: {PRESERVE: "select"},
    },
    select: {
      on: {
        SEND: "loading",
        CANCEL: "idle",
      },
    },
    loading: {
      invoke: {
        src: "fetchData",
        onDone: {
          target: "success",
          actions: assign({
            success: (_, event) => event.data,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: (_, event) => event.data,
          }),
        },
      },
    },
    success: {
      type: "final",
    },
    failure: {
      on: {
        RETRY: "loading",
        CANCEL: "select",
      },
    },
  },
});
